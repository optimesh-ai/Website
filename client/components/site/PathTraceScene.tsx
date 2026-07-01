/**
 * PathTraceScene — a packet hops router-to-router along a path and reaches a
 * verification GATE. Verified (green) packets pass through; unsafe (red)
 * packets are stopped at the ring — the diagnose→patch→VERIFY story in one
 * loop. Used on the Features hero. Honours prefers-reduced-motion.
 */
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, RoundedBox, Line } from "@react-three/drei";
import * as THREE from "three";

/* Fit the orthographic zoom to the container so the full path (≈11.5 world
 * units wide, ≈6.5 tall incl. shadows) is never cropped at any viewport. */
function FitZoom() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    cam.zoom = Math.min(size.width / 10.2, size.height / 6.2);
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

const BLUE = "#4f7cff";
const GREEN = "#34d399";
const RED = "#ef4444";

/* Router hop positions — a gentle zig-zag left→right, gate after the last hop. */
const HOPS: [number, number, number][] = [
  [-3.9, -0.5, 0.6],
  [-2.3, 0.5, -0.5],
  [-0.7, -0.4, 0.4],
  [0.9, 0.55, -0.4],
  [2.4, -0.3, 0.3],
];
const GATE: [number, number, number] = [3.8, 0.1, 0];
const EXIT: [number, number, number] = [4.9, 0.1, 0];

const HOP_SECONDS = 0.55; // travel time per hop
const PAUSE = 0.22; // dwell on each router
const CYCLE = (HOPS.length + 1) * (HOP_SECONDS + PAUSE) + 1.0;

function Router({
  position,
  index,
  glowRef,
}: {
  position: [number, number, number];
  index: number;
  glowRef: (el: THREE.Mesh | null) => void;
}) {
  return (
    <group position={position}>
      <RoundedBox args={[1.1, 0.26, 0.7]} radius={0.04} smoothness={4} castShadow>
        <meshPhysicalMaterial
          color="#e6e6ee"
          roughness={0.28}
          metalness={0.02}
          clearcoat={0.5}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>
      <mesh position={[0, 0.133, 0]}>
        <boxGeometry args={[1.05, 0.004, 0.65]} />
        <meshPhysicalMaterial color="#f0f0f7" roughness={0.2} clearcoat={0.6} />
      </mesh>
      {/* port strip */}
      <mesh position={[0, 0, 0.355]}>
        <planeGeometry args={[0.72, 0.1]} />
        <meshStandardMaterial color="#12121f" roughness={0.95} />
      </mesh>
      {/* hop glow ring under the router — pulsed when the packet arrives */}
      <mesh
        ref={glowRef}
        position={[0, -0.16, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.36, 0.52, 28]} />
        <meshStandardMaterial
          color={BLUE}
          emissive={BLUE}
          emissiveIntensity={0.4}
          transparent
          opacity={0.35}
        />
      </mesh>
      {/* hop number */}
      <mesh position={[-0.42, 0.02, 0.356]}>
        <circleGeometry args={[0.035, 8]} />
        <meshStandardMaterial
          color={index === 0 ? GREEN : BLUE}
          emissive={index === 0 ? GREEN : BLUE}
          emissiveIntensity={2.5}
        />
      </mesh>
    </group>
  );
}

function Scene({ animate }: { animate: boolean }) {
  const packet = useRef<THREE.Mesh>(null);
  const gateRing = useRef<THREE.Mesh>(null);
  const gateCore = useRef<THREE.Mesh>(null);
  const glows = useRef<(THREE.Mesh | null)[]>([]);

  const hopVecs = useMemo(
    () => [...HOPS.map((h) => new THREE.Vector3(...h))],
    [],
  );
  const gateVec = useMemo(() => new THREE.Vector3(...GATE), []);
  const exitVec = useMemo(() => new THREE.Vector3(...EXIT), []);
  const path = useMemo(() => [...hopVecs, gateVec, exitVec], [hopVecs, gateVec, exitVec]);

  useFrame((state) => {
    if (!packet.current) return;
    const mat = packet.current.material as THREE.MeshStandardMaterial;
    const time = animate ? state.clock.elapsedTime : CYCLE * 0.31;
    const cycleT = time % CYCLE;
    const round = Math.floor(time / CYCLE);
    const unsafe = round % 3 === 2; // every 3rd packet is an unsafe change

    const legDur = HOP_SECONDS + PAUSE;
    const leg = Math.min(Math.floor(cycleT / legDur), path.length - 2);
    const legT = Math.min((cycleT - leg * legDur) / HOP_SECONDS, 1);
    // ease in-out
    const e = legT < 0.5 ? 2 * legT * legT : 1 - Math.pow(-2 * legT + 2, 2) / 2;

    const from = path[leg];
    const to = path[leg + 1];
    const gateLeg = path.length - 2; // the gate→exit leg only exists for safe packets

    let visible = true;
    if (unsafe && leg >= gateLeg) {
      // unsafe packet never passes the gate — hold + fade at the ring
      packet.current.position.copy(gateVec);
      const fade = Math.max(0, 1 - (cycleT - gateLeg * legDur) * 2.2);
      mat.opacity = fade;
      visible = fade > 0.02;
    } else {
      packet.current.position.lerpVectors(from, to, e);
      // small arc between hops
      packet.current.position.y += Math.sin(e * Math.PI) * 0.35;
      mat.opacity = 1;
    }
    packet.current.visible = visible;
    const color = unsafe ? RED : GREEN;
    mat.color.set(color);
    mat.emissive.set(color);
    mat.emissiveIntensity = 2.6;

    // hop glow: pulse the router the packet just reached
    glows.current.forEach((g, i) => {
      if (!g) return;
      const gm = g.material as THREE.MeshStandardMaterial;
      const arrived = leg === i && legT > 0.85;
      const active = leg === i + 1 && legT < 0.4;
      const target = arrived || active ? 2.2 : 0.4;
      gm.emissiveIntensity += (target - gm.emissiveIntensity) * 0.15;
    });

    // gate reaction: green flash on pass, red flash on block
    if (gateRing.current && gateCore.current) {
      const rm = gateRing.current.material as THREE.MeshStandardMaterial;
      const cm = gateCore.current.material as THREE.MeshBasicMaterial;
      const atGate = leg >= gateLeg - 1 && legT > 0.7;
      const c = unsafe ? RED : GREEN;
      if (atGate) {
        rm.color.set(c);
        rm.emissive.set(c);
        rm.emissiveIntensity = 3.2;
        cm.color.set(c);
        cm.opacity = unsafe ? 0.22 : 0.1;
      } else {
        rm.emissiveIntensity += (1.2 - rm.emissiveIntensity) * 0.08;
        cm.opacity += (0.05 - cm.opacity) * 0.08;
      }
      gateRing.current.rotation.z = time * 0.4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[6, 10, 8]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0006}
      />
      <directionalLight position={[-5, 5, -4]} intensity={0.3} color="#c4c8ff" />

      {/* Path lines */}
      {path.slice(0, -1).map((p, i) => (
        <Line
          key={i}
          points={[p, path[i + 1]]}
          color={BLUE}
          lineWidth={1.2}
          transparent
          opacity={0.22}
          dashed
          dashSize={0.12}
          gapSize={0.08}
        />
      ))}

      {/* Routers */}
      {HOPS.map((p, i) => (
        <Router
          key={i}
          position={p}
          index={i}
          glowRef={(el) => (glows.current[i] = el)}
        />
      ))}

      {/* The verification gate — a standing ring the packet must clear */}
      <group position={GATE}>
        <mesh ref={gateRing} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.78, 0.055, 12, 48]} />
          <meshStandardMaterial
            color={GREEN}
            emissive={GREEN}
            emissiveIntensity={1.2}
            roughness={0.3}
          />
        </mesh>
        <mesh ref={gateCore} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.73, 40]} />
          <meshBasicMaterial
            color={GREEN}
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* The packet */}
      <mesh ref={packet}>
        <sphereGeometry args={[0.115, 12, 12]} />
        <meshStandardMaterial
          color={GREEN}
          emissive={GREEN}
          emissiveIntensity={2.6}
          transparent
        />
      </mesh>

      <ContactShadows position={[0, -1.15, 0]} opacity={0.18} scale={16} blur={2.4} far={6} />
    </>
  );
}

export function PathTraceScene({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const animate = !reduced;
  return (
    <div className={className}>
      <Canvas
        orthographic
        camera={{ position: [0.5, -0.1, 9], zoom: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        frameloop={animate ? "always" : "demand"}
        shadows
        className="h-full w-full"
      >
        <FitZoom />
        <Scene animate={animate} />
      </Canvas>
    </div>
  );
}
