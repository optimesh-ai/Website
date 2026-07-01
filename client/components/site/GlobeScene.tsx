/**
 * GlobeScene — a dotted network globe with glowing PoP nodes and great-circle
 * traffic arcs. Slow rotation, light pulses travelling the arcs. Brand palette.
 * Used on the About hero ("the networks that run the world").
 * Honours prefers-reduced-motion (freezes to a static frame).
 */
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

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

const R = 2.6; // globe radius
const DOT_COLOR = "#4f7cff";
const POP_COLOR = "#7aa2ff";
const ARC_COLOR = "#38bdf8";
const PULSE_COLORS = ["#34d399", "#38bdf8"];

/* Fibonacci-sphere dot cloud — reads as a globe without any texture. */
function useGlobeDots(count: number) {
  return useMemo(() => {
    const pts = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = phi * i;
      pts[i * 3] = Math.cos(t) * r * R;
      pts[i * 3 + 1] = y * R;
      pts[i * 3 + 2] = Math.sin(t) * r * R;
    }
    return pts;
  }, [count]);
}

/* PoP locations (unit sphere, then scaled) — spread like real backbone metros. */
const POPS: [number, number, number][] = [
  [0.32, 0.62, 0.72], // north america east
  [-0.45, 0.55, 0.7], // north america west
  [0.72, 0.42, -0.55], // europe
  [0.95, -0.05, 0.3], // middle east
  [0.55, -0.35, -0.76], // asia
  [-0.15, -0.72, 0.68], // south america
  [0.05, -0.6, -0.79], // oceania
].map(([x, y, z]) => {
  const n = Math.hypot(x, y, z);
  return [(x / n) * R, (y / n) * R, (z / n) * R] as [number, number, number];
});

const ARCS: [number, number][] = [
  [0, 2],
  [0, 1],
  [2, 4],
  [2, 3],
  [4, 6],
  [0, 5],
  [1, 4],
  [3, 4],
];

/* Great-circle-ish arc: sphere points with an elevated midpoint. */
function arcPoints(a: THREE.Vector3, b: THREE.Vector3, segments = 48) {
  const pts: THREE.Vector3[] = [];
  const angle = a.angleTo(b);
  const lift = 1 + 0.12 + angle * 0.16; // longer arcs fly higher
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().copy(a).lerp(b, t).normalize();
    const elev = 1 + Math.sin(Math.PI * t) * (lift - 1);
    pts.push(p.multiplyScalar(R * elev));
  }
  return pts;
}

function ArcPulse({
  path,
  color,
  speed,
  offset,
  animate,
}: {
  path: THREE.Vector3[];
  color: string;
  speed: number;
  offset: number;
  animate: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = animate ? (state.clock.elapsedTime * speed + offset) % 1 : 0.5;
    const idx = t * (path.length - 1);
    const i = Math.floor(idx);
    const j = Math.min(i + 1, path.length - 1);
    ref.current.position.lerpVectors(path[i], path[j], idx - i);
    const fade = Math.sin(t * Math.PI);
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      1 + fade * 3;
    ref.current.scale.setScalar(0.5 + fade * 0.7);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 10, 10]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
    </mesh>
  );
}

function PopNode({
  position,
  animate,
  offset,
}: {
  position: [number, number, number];
  animate: boolean;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || !animate) return;
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      2 + Math.sin(state.clock.elapsedTime * 2.2 + offset) * 1.2;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.075, 12, 12]} />
      <meshStandardMaterial
        color={POP_COLOR}
        emissive={POP_COLOR}
        emissiveIntensity={2.5}
      />
    </mesh>
  );
}

function Globe({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const dots = useGlobeDots(650);
  const popVecs = useMemo(() => POPS.map((p) => new THREE.Vector3(...p)), []);
  const arcs = useMemo(
    () => ARCS.map(([a, b]) => arcPoints(popVecs[a], popVecs[b])),
    [popVecs],
  );

  useFrame((state) => {
    if (!group.current || !animate) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  return (
    <group ref={group} rotation={[0.35, -0.6, 0.12]}>
      {/* Occluder first: writes depth so back-hemisphere dots are hidden */}
      <mesh renderOrder={0}>
        <sphereGeometry args={[R * 0.985, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.92} toneMapped={false} />
      </mesh>

      {/* Dot shell — rendered after the occluder; front dots pass the depth test */}
      <points renderOrder={2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dots, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={DOT_COLOR}
          size={0.055}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {/* PoPs */}
      {POPS.map((p, i) => (
        <PopNode key={i} position={p} animate={animate} offset={i * 1.3} />
      ))}

      {/* Arcs + pulses */}
      {arcs.map((path, i) => (
        <group key={i}>
          <Line
            points={path}
            color={ARC_COLOR}
            lineWidth={1.4}
            transparent
            opacity={0.55}
          />
          <ArcPulse
            path={path}
            color={PULSE_COLORS[i % PULSE_COLORS.length]}
            speed={0.16 + (i % 3) * 0.05}
            offset={i * 0.37}
            animate={animate}
          />
        </group>
      ))}
    </group>
  );
}

export function GlobeScene({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const animate = !reduced;
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        frameloop={animate ? "always" : "demand"}
        className="h-full w-full"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 8]} intensity={0.7} color="#dbe4ff" />
        <Globe animate={animate} />
      </Canvas>
    </div>
  );
}
