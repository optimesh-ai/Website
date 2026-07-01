/**
 * GlobeScene — a real dotted-continent globe (Stripe/GitHub style):
 * ~3.7k soft round dots on actual landmasses, a dark sphere body with an
 * atmosphere rim, and thin great-circle arcs between backbone metros with
 * travelling light pulses. Designed for DARK backgrounds (the CTA card).
 * Slow axial-tilted rotation; honours prefers-reduced-motion.
 */
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { LAND_DOTS } from "@/data/globe-land-dots";

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

const R = 2.5;
const DOT = "#6f9dff"; // land dots
const BODY = "#101d33"; // sphere body (slightly lighter than the card bg)
const RIM = "#3b82f6"; // atmosphere
const ARC = "#38bdf8";
const PULSES = ["#34d399", "#7dd3fc", "#34d399"];

/* Standard lat/lng -> three.js sphere position */
function ll(lat: number, lng: number, r = R): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/* Backbone metros the arcs connect */
const METROS: [number, number][] = [
  [37.77, -122.42], // SF
  [40.71, -74.0], // NYC
  [51.5, -0.13], // London
  [50.11, 8.68], // Frankfurt
  [19.08, 72.88], // Mumbai
  [1.35, 103.82], // Singapore
  [35.68, 139.69], // Tokyo
  [-33.87, 151.21], // Sydney
  [-23.55, -46.63], // São Paulo
];
const ROUTES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [1, 8], [5, 7],
];

/* Great-circle arc lifted above the surface */
function arcPoints(a: THREE.Vector3, b: THREE.Vector3, segments = 56) {
  const pts: THREE.Vector3[] = [];
  const angle = a.angleTo(b);
  const lift = 0.06 + angle * 0.18;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().copy(a).lerp(b, t).normalize();
    pts.push(p.multiplyScalar(R * (1 + Math.sin(Math.PI * t) * lift)));
  }
  return pts;
}

/* Soft round sprite so points render as smooth dots, not squares */
function useDotTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.55, "rgba(255,255,255,0.9)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
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
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.2 + fade * 0.8;
    ref.current.scale.setScalar(0.55 + fade * 0.65);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 10, 10]} />
      <meshBasicMaterial color={color} transparent toneMapped={false} />
    </mesh>
  );
}

function MetroRing({
  pos,
  animate,
  offset,
}: {
  pos: THREE.Vector3;
  animate: boolean;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize());
    return q;
  }, [pos]);
  useFrame((state) => {
    if (!ref.current) return;
    const t = animate ? (state.clock.elapsedTime * 0.5 + offset) % 1 : 0.4;
    ref.current.scale.setScalar(0.6 + t * 1.1);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - t);
  });
  return (
    <group position={pos.clone().multiplyScalar(1.004)} quaternion={quat}>
      {/* fixed city dot */}
      <mesh>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial color="#a5d8ff" toneMapped={false} />
      </mesh>
      {/* expanding ping */}
      <mesh ref={ref}>
        <ringGeometry args={[0.05, 0.065, 24]} />
        <meshBasicMaterial color={ARC} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

function Globe({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const dotTex = useDotTexture();

  const landPositions = useMemo(() => {
    const arr = new Float32Array(LAND_DOTS.length * 3);
    LAND_DOTS.forEach(([lat, lng], i) => {
      const v = ll(lat, lng, R * 1.001);
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = v.y;
      arr[i * 3 + 2] = v.z;
    });
    return arr;
  }, []);

  const metros = useMemo(() => METROS.map(([la, ln]) => ll(la, ln)), []);
  const arcs = useMemo(
    () => ROUTES.map(([a, b]) => arcPoints(metros[a], metros[b])),
    [metros],
  );

  useFrame((state) => {
    if (!group.current || !animate) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.05 - 1.45;
  });

  return (
    /* axial tilt like the real thing */
    <group rotation={[0.1, 0, -0.15]}>
      <group ref={group} rotation={[0, -1.45, 0]}>
        {/* sphere body — occludes the far hemisphere */}
        <mesh renderOrder={0}>
          <sphereGeometry args={[R * 0.996, 48, 48]} />
          <meshStandardMaterial color={BODY} roughness={0.9} metalness={0.1} />
        </mesh>

        {/* land dots */}
        <points renderOrder={2}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[landPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color={DOT}
            size={0.042}
            map={dotTex}
            alphaMap={dotTex}
            transparent
            opacity={0.95}
            sizeAttenuation
            depthWrite={false}
            toneMapped={false}
          />
        </points>

        {/* metros + pings */}
        {metros.map((m, i) => (
          <MetroRing key={i} pos={m} animate={animate} offset={i * 0.13} />
        ))}

        {/* arcs + pulses */}
        {arcs.map((path, i) => (
          <group key={i}>
            <Line
              points={path}
              color={ARC}
              lineWidth={1.1}
              transparent
              opacity={0.4}
            />
            <ArcPulse
              path={path}
              color={PULSES[i % PULSES.length]}
              speed={0.14 + (i % 3) * 0.04}
              offset={i * 0.29}
              animate={animate}
            />
          </group>
        ))}
      </group>

      {/* atmosphere rim — a touch larger, back-facing, additive feel */}
      <mesh renderOrder={3}>
        <sphereGeometry args={[R * 1.045, 48, 48]} />
        <meshBasicMaterial
          color={RIM}
          transparent
          opacity={0.10}
          side={THREE.BackSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function GlobeScene({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const animate = !reduced;
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.4, 7.4], fov: 44 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        frameloop={animate ? "always" : "demand"}
        className="h-full w-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 3, 6]} intensity={0.5} color="#c9d8ff" />
        <Globe animate={animate} />
      </Canvas>
    </div>
  );
}
