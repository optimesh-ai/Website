/**
 * NetworkScene — 3D server rack with stacked networking equipment.
 * Orthographic camera, scroll-linked rotation, blinking activity LEDs.
 */
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ── Scroll state ── */
const scrollState = { progress: 0 };

function useScrollProgress() {
  useEffect(() => {
    const onScroll = () => {
      scrollState.progress = window.scrollY / (window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ── Blinking LED ── */
function BlinkLed({
  position,
  color = "#22c55e",
  speed,
}: {
  position: [number, number, number];
  color?: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const s = useMemo(() => speed ?? 2 + Math.random() * 5, [speed]);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    const v = Math.sin(state.clock.elapsedTime * s + offset);
    mat.emissiveIntensity = v > 0.3 ? 4 : 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[0.018, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
    </mesh>
  );
}

/* ── Rack-mounted 1U switch ── */
function RackSwitch({
  y,
  ports = 24,
  ledColors = ["#22c55e", "#3b82f6"],
}: {
  y: number;
  ports?: number;
  ledColors?: string[];
}) {
  const W = 4.8;
  const H = 0.38;
  const D = 2.8;
  const portCols = Math.min(ports, Math.floor((W * 0.68) / 0.135));

  return (
    <group position={[0, y, 0]}>
      <RoundedBox args={[W, H, D]} radius={0.03} smoothness={4} castShadow>
        <meshPhysicalMaterial color="#e6e6ee" roughness={0.25} metalness={0.01} clearcoat={0.5} clearcoatRoughness={0.2} />
      </RoundedBox>

      <mesh position={[0, H / 2 + 0.002, 0]}>
        <boxGeometry args={[W - 0.05, 0.004, D - 0.05]} />
        <meshPhysicalMaterial color="#f2f2f9" roughness={0.15} clearcoat={0.8} />
      </mesh>

      {Array.from({ length: portCols }, (_, i) => {
        const gap = 0.035;
        const pw = 0.1;
        const sx = -(portCols * (pw + gap) - gap) / 2 + pw / 2;
        return (
          <mesh key={i} position={[sx + i * (pw + gap), 0, D / 2 + 0.005]}>
            <boxGeometry args={[0.1, 0.065, 0.01]} />
            <meshStandardMaterial color="#0e0e1a" roughness={0.95} />
          </mesh>
        );
      })}

      {/* Static status LEDs */}
      {ledColors.map((c, i) => (
        <mesh key={`led${i}`} position={[W / 2 - 0.12 - i * 0.1, 0.02, D / 2 + 0.005]}>
          <circleGeometry args={[0.022, 8]} />
          <meshStandardMaterial color={c} emissive={c} emissiveIntensity={3} />
        </mesh>
      ))}

      {/* Blinking activity LEDs along the port strip */}
      {Array.from({ length: 4 }, (_, i) => (
        <BlinkLed
          key={`blink${i}`}
          position={[-1.2 + i * 0.7, -0.06, D / 2 + 0.006]}
          color="#22c55e"
        />
      ))}

      <mesh position={[-W / 2 + 0.22, 0, D / 2 + 0.005]}>
        <planeGeometry args={[0.26, 0.032]} />
        <meshStandardMaterial color="#3354a5" />
      </mesh>

      {[-1, 1].map((side) => (
        <mesh key={`ear${side}`} position={[side * (W / 2 + 0.08), 0, D * 0.35]}>
          <boxGeometry args={[0.16, H * 0.85, 0.06]} />
          <meshStandardMaterial color="#c8c8d4" roughness={0.3} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/* ── 2U Server / Router ── */
function RackServer({ y }: { y: number }) {
  const W = 4.8;
  const H = 0.72;
  const D = 2.8;

  return (
    <group position={[0, y, 0]}>
      <RoundedBox args={[W, H, D]} radius={0.04} smoothness={4} castShadow>
        <meshPhysicalMaterial color="#dddde8" roughness={0.28} metalness={0.02} clearcoat={0.4} clearcoatRoughness={0.28} />
      </RoundedBox>

      <mesh position={[0, H / 2 + 0.002, 0]}>
        <boxGeometry args={[W - 0.05, 0.004, D - 0.05]} />
        <meshPhysicalMaterial color="#eeeff5" roughness={0.18} clearcoat={0.6} />
      </mesh>

      {Array.from({ length: 4 }, (_, i) => (
        <group key={i}>
          <mesh position={[-1.1 + i * 0.62, 0, D / 2 + 0.005]}>
            <boxGeometry args={[0.48, 0.48, 0.012]} />
            <meshStandardMaterial color="#131320" roughness={0.9} />
          </mesh>
          <mesh position={[-1.1 + i * 0.62, -0.14, D / 2 + 0.012]}>
            <boxGeometry args={[0.32, 0.04, 0.008]} />
            <meshStandardMaterial color="#8585a0" roughness={0.35} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Blinking drive activity LEDs */}
      {Array.from({ length: 4 }, (_, i) => (
        <BlinkLed
          key={`drive${i}`}
          position={[-1.1 + i * 0.62, 0.16, D / 2 + 0.006]}
          color={i === 2 ? "#f59e0b" : "#22c55e"}
        />
      ))}

      <mesh position={[W / 2 - 0.12, 0.18, D / 2 + 0.005]}>
        <circleGeometry args={[0.022, 8]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={3} />
      </mesh>
      <BlinkLed position={[W / 2 - 0.22, 0.18, D / 2 + 0.006]} color="#3b82f6" />

      {[-1, 1].map((side) => (
        <mesh key={`ear${side}`} position={[side * (W / 2 + 0.08), 0, D * 0.35]}>
          <boxGeometry args={[0.16, H * 0.88, 0.06]} />
          <meshStandardMaterial color="#c8c8d4" roughness={0.3} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Cable management panel ── */
function CablePanel({ y }: { y: number }) {
  const W = 4.8;
  const H = 0.28;
  const D = 2.8;

  return (
    <group position={[0, y, 0]}>
      <RoundedBox args={[W, H, D]} radius={0.02} smoothness={3} castShadow>
        <meshStandardMaterial color="#28283e" roughness={0.45} metalness={0.35} />
      </RoundedBox>

      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[-1.5 + i * 0.6, 0, D / 2 + 0.005]}>
          <ringGeometry args={[0.05, 0.08, 12]} />
          <meshStandardMaterial color="#38384f" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}

      {[-1, 1].map((side) => (
        <mesh key={`ear${side}`} position={[side * (W / 2 + 0.08), 0, D * 0.35]}>
          <boxGeometry args={[0.16, H * 0.85, 0.06]} />
          <meshStandardMaterial color="#38384f" roughness={0.3} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Rack frame ── */
function RackFrame() {
  const POST_H = 6.2;
  const HALF_W = 2.68;

  return (
    <group>
      {[-1, 1].map((side) => (
        <mesh key={`post${side}`} position={[side * HALF_W, 0, 0.98]} castShadow>
          <boxGeometry args={[0.1, POST_H, 0.1]} />
          <meshStandardMaterial color="#1c1c30" roughness={0.3} metalness={0.65} />
        </mesh>
      ))}

      {[-1, 1].map((tb) => (
        <mesh key={`bar${tb}`} position={[0, tb * (POST_H / 2 - 0.04), 0.98]}>
          <boxGeometry args={[HALF_W * 2 + 0.1, 0.06, 0.1]} />
          <meshStandardMaterial color="#1c1c30" roughness={0.3} metalness={0.65} />
        </mesh>
      ))}

      {[-1, 1].map((side) =>
        Array.from({ length: 14 }, (_, i) => (
          <mesh key={`hole${side}-${i}`} position={[side * HALF_W, -2.6 + i * 0.4, 1.04]}>
            <circleGeometry args={[0.015, 6]} />
            <meshStandardMaterial color="#2a2a42" roughness={0.5} metalness={0.5} />
          </mesh>
        )),
      )}
    </group>
  );
}

/* ── Rack assembly ── */
function RackAssembly() {
  const ref = useRef<THREE.Group>(null);
  const baseRotY = -0.35;

  useFrame(() => {
    if (!ref.current) return;
    const s = scrollState.progress;
    ref.current.rotation.y = baseRotY + s * 0.15;
    ref.current.position.y = -s * 0.3;
  });

  return (
    <group ref={ref} rotation={[0, baseRotY, 0]}>
      <RackFrame />
      <RackSwitch y={2.3} ports={24} ledColors={["#22c55e", "#3b82f6"]} />
      <RackSwitch y={1.7} ports={24} ledColors={["#22c55e", "#f59e0b"]} />
      <CablePanel y={1.18} />
      <RackServer y={0.5} />
      <CablePanel y={-0.05} />
      <RackSwitch y={-0.55} ports={16} ledColors={["#22c55e", "#3b82f6"]} />
      <RackSwitch y={-1.15} ports={16} ledColors={["#22c55e", "#22c55e"]} />
      <CablePanel y={-1.65} />
      <RackSwitch y={-2.15} ports={12} ledColors={["#f59e0b", "#3b82f6"]} />
    </group>
  );
}

/* ── Scene ── */
function Scene() {
  useScrollProgress();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[8, 14, 10]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-5, 8, -4]} intensity={0.35} color="#c8ccff" />
      <directionalLight position={[3, 2, -6]} intensity={0.2} />

      {/* Shifted right so it doesn't overlap text */}
      <group position={[3.5, 0, -2]}>
        <RackAssembly />
      </group>

      <ContactShadows position={[0, -3.8, 0]} opacity={0.22} scale={20} blur={2.5} far={12} />
    </>
  );
}

/* ── Export ── */
export function NetworkScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        orthographic
        camera={{ position: [10, 5, 12], zoom: 58 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        shadows
        className="w-full h-full"
      >
        <Scene />
      </Canvas>
    </div>
  );
}
