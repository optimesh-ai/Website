/**
 * RackScene — 3D server rack with stacked networking equipment,
 * fiber patch cables, and status LEDs. Used on the Hammerhead product page.
 */
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, OrbitControls, RoundedBox, Line } from "@react-three/drei";
import * as THREE from "three";

/* ── Rack-mounted device (1U / 2U) ── */
function RackUnit({
  position,
  w = 3.8,
  h = 0.35,
  d = 2.2,
  ports = 16,
  ledColors = ["#22c55e", "#3b82f6"],
}: {
  position: [number, number, number];
  w?: number;
  h?: number;
  d?: number;
  ports?: number;
  ledColors?: string[];
}) {
  const portPositions = useMemo(() => {
    const pw = 0.09;
    const gap = 0.025;
    const cols = Math.min(ports, Math.floor((w * 0.7) / (pw + gap)));
    const result: [number, number, number][] = [];
    for (let i = 0; i < cols; i++) {
      const sx = -(cols * (pw + gap) - gap) / 2 + pw / 2;
      result.push([sx + i * (pw + gap), 0, d / 2 + 0.005]);
    }
    return result;
  }, [ports, w, d]);

  return (
    <group position={position}>
      {/* Body */}
      <RoundedBox args={[w, h, d]} radius={0.03} smoothness={4} castShadow>
        <meshPhysicalMaterial
          color="#e6e6ee"
          roughness={0.28}
          metalness={0.02}
          clearcoat={0.5}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>

      {/* Top highlight */}
      <mesh position={[0, h / 2 + 0.002, 0]}>
        <boxGeometry args={[w - 0.06, 0.004, d - 0.06]} />
        <meshPhysicalMaterial color="#f2f2f8" roughness={0.18} clearcoat={0.7} />
      </mesh>

      {/* Port cutouts */}
      {portPositions.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.09, 0.06, 0.01]} />
          <meshStandardMaterial color="#12121f" roughness={0.95} />
        </mesh>
      ))}

      {/* Status LEDs */}
      {ledColors.map((c, i) => (
        <mesh key={`l${i}`} position={[w / 2 - 0.1 - i * 0.1, 0.02, d / 2 + 0.005]}>
          <circleGeometry args={[0.018, 8]} />
          <meshStandardMaterial color={c} emissive={c} emissiveIntensity={3} />
        </mesh>
      ))}

      {/* Brand accent */}
      <mesh position={[-w / 2 + 0.2, 0, d / 2 + 0.005]}>
        <planeGeometry args={[0.22, 0.03]} />
        <meshStandardMaterial color="#3b5fb8" />
      </mesh>

      {/* Vents */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`v${i}`} position={[w * 0.1 + i * w * 0.14, h / 2 + 0.003, 0]}>
          <boxGeometry args={[w * 0.06, 0.002, d * 0.45]} />
          <meshStandardMaterial color="#d2d2da" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ── 2U Server unit ── */
function ServerUnit({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RoundedBox args={[3.8, 0.65, 2.2]} radius={0.04} smoothness={4} castShadow>
        <meshPhysicalMaterial
          color="#dcdce6"
          roughness={0.3}
          metalness={0.03}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
        />
      </RoundedBox>

      {/* Top highlight */}
      <mesh position={[0, 0.33, 0]}>
        <boxGeometry args={[3.74, 0.004, 2.14]} />
        <meshPhysicalMaterial color="#eeeff5" roughness={0.2} clearcoat={0.6} />
      </mesh>

      {/* Drive bays */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[-1.2 + i * 0.65, 0, 1.105]}>
          <boxGeometry args={[0.5, 0.45, 0.012]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
        </mesh>
      ))}

      {/* Drive bay handles */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`h${i}`} position={[-1.2 + i * 0.65, -0.12, 1.112]}>
          <boxGeometry args={[0.35, 0.04, 0.008]} />
          <meshStandardMaterial color="#8888a0" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}

      {/* Power/Activity LEDs */}
      <mesh position={[1.8, 0.15, 1.106]}>
        <circleGeometry args={[0.02, 8]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={3} />
      </mesh>
      <mesh position={[1.8, 0.05, 1.106]}>
        <circleGeometry args={[0.02, 8]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

/* ── Cable management panel ── */
function CablePanel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RoundedBox args={[3.8, 0.25, 2.2]} radius={0.02} smoothness={3} castShadow>
        <meshStandardMaterial color="#2a2a3e" roughness={0.5} metalness={0.4} />
      </RoundedBox>

      {/* Cable pass-through rings */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh
          key={i}
          position={[-1.4 + i * 0.7, 0, 1.105]}
          rotation={[0, 0, 0]}
        >
          <ringGeometry args={[0.06, 0.09, 12]} />
          <meshStandardMaterial color="#3a3a52" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Fiber optic cable ── */
function FiberCable({
  start,
  mid,
  end,
  color,
}: {
  start: [number, number, number];
  mid: [number, number, number];
  end: [number, number, number];
  color: string;
}) {
  const curvePoints = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end),
    ]);
    return curve.getPoints(24);
  }, [start, mid, end]);

  return (
    <Line
      points={curvePoints}
      color={color}
      lineWidth={2.5}
      transparent
      opacity={0.85}
    />
  );
}

/* ── Blinking activity LED ── */
function BlinkingLed({
  position,
  color = "#22c55e",
}: {
  position: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 2 + Math.random() * 4, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * speed + offset) * 1.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[0.015, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
    </mesh>
  );
}

/* ── Rack assembly ── */
function RackAssembly() {
  return (
    <group>
      {/* Rack frame posts */}
      <mesh position={[-2.05, 0, 0]} castShadow>
        <boxGeometry args={[0.12, 5.5, 0.12]} />
        <meshStandardMaterial color="#1e1e32" roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh position={[2.05, 0, 0]} castShadow>
        <boxGeometry args={[0.12, 5.5, 0.12]} />
        <meshStandardMaterial color="#1e1e32" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Mounting hole indicators on posts */}
      {Array.from({ length: 12 }, (_, i) => (
        <group key={`holes-${i}`}>
          <mesh position={[-2.05, -2.2 + i * 0.4, 0.065]}>
            <circleGeometry args={[0.02, 6]} />
            <meshStandardMaterial color="#2e2e45" roughness={0.5} metalness={0.6} />
          </mesh>
          <mesh position={[2.05, -2.2 + i * 0.4, 0.065]}>
            <circleGeometry args={[0.02, 6]} />
            <meshStandardMaterial color="#2e2e45" roughness={0.5} metalness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Top and bottom cross-bars */}
      <mesh position={[0, 2.65, 0]}>
        <boxGeometry args={[4.2, 0.08, 0.12]} />
        <meshStandardMaterial color="#1e1e32" roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh position={[0, -2.65, 0]}>
        <boxGeometry args={[4.2, 0.08, 0.12]} />
        <meshStandardMaterial color="#1e1e32" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* ── Mounted equipment (top to bottom) ── */}
      <RackUnit position={[0, 2.0, 0]} ports={24} ledColors={["#22c55e", "#3b82f6"]} />
      <RackUnit position={[0, 1.35, 0]} ports={16} ledColors={["#22c55e", "#f59e0b"]} />
      <CablePanel position={[0, 0.8, 0]} />
      <ServerUnit position={[0, 0.15, 0]} />
      <CablePanel position={[0, -0.5, 0]} />
      <RackUnit position={[0, -1.0, 0]} ports={24} ledColors={["#22c55e", "#3b82f6"]} />
      <RackUnit position={[0, -1.65, 0]} ports={12} ledColors={["#22c55e", "#22c55e"]} />
      <RackUnit position={[0, -2.2, 0]} ports={8} h={0.28} ledColors={["#f59e0b", "#3b82f6"]} />

      {/* ── Fiber cables ── */}
      {/* Top switch → server */}
      <FiberCable
        start={[-0.8, 2.0, 1.12]}
        mid={[-1.2, 1.1, 2.2]}
        end={[-0.8, 0.15, 1.12]}
        color="#3b82f6"
      />
      <FiberCable
        start={[-0.3, 2.0, 1.12]}
        mid={[-0.5, 1.1, 2.0]}
        end={[-0.3, 0.15, 1.12]}
        color="#06b6d4"
      />
      {/* Server → bottom switch */}
      <FiberCable
        start={[0.3, 0.15, 1.12]}
        mid={[0.6, -0.4, 2.1]}
        end={[0.3, -1.0, 1.12]}
        color="#f97316"
      />
      <FiberCable
        start={[0.8, 0.15, 1.12]}
        mid={[1.1, -0.4, 2.0]}
        end={[0.8, -1.0, 1.12]}
        color="#22c55e"
      />
      {/* Cross-connect: 2nd switch → bottom area */}
      <FiberCable
        start={[1.2, 1.35, 1.12]}
        mid={[1.8, 0.2, 2.3]}
        end={[1.2, -1.65, 1.12]}
        color="#8b5cf6"
      />
      {/* Uplink cable */}
      <FiberCable
        start={[-1.4, 2.0, 1.12]}
        mid={[-2.5, 1.5, 1.8]}
        end={[-1.4, -2.2, 1.12]}
        color="#ec4899"
      />

      {/* ── Blinking activity LEDs (scattered on front face) ── */}
      <BlinkingLed position={[0.5, 2.0, 1.12]} color="#22c55e" />
      <BlinkingLed position={[0.8, 2.0, 1.12]} color="#22c55e" />
      <BlinkingLed position={[-0.2, 1.35, 1.12]} color="#f59e0b" />
      <BlinkingLed position={[0.6, -1.0, 1.12]} color="#22c55e" />
      <BlinkingLed position={[-0.5, -1.0, 1.12]} color="#3b82f6" />
      <BlinkingLed position={[0.3, -1.65, 1.12]} color="#22c55e" />
    </group>
  );
}

/* ── Exported scene ── */
export function RackScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [5, 2, 7], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        shadows
        className="w-full h-full"
      >
        {/* Lighting */}
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[8, 12, 10]}
          intensity={1.6}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-bias={-0.001}
        />
        <directionalLight position={[-5, 6, -3]} intensity={0.35} color="#c4c8ff" />
        <directionalLight position={[3, 1, -8]} intensity={0.2} />

        {/* Rack */}
        <Float speed={0.8} rotationIntensity={0.04} floatIntensity={0.12}>
          <RackAssembly />
        </Float>

        {/* Ground shadow */}
        <ContactShadows
          position={[0, -3.5, 0]}
          opacity={0.2}
          scale={16}
          blur={2.5}
          far={10}
        />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
