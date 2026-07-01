/**
 * WithdrawalScene — a BGP prefix-withdrawal rippling across a healthy fabric.
 * One origin router withdraws a prefix; a red wavefront spreads node-to-node
 * (routes vanishing from RIBs) until the verification gate flashes and the
 * fabric snaps back green — "caught before merge". The Cloudflare replay
 * (2026-02-20) told as an animation. Used on the Config Studio trust section.
 * Honours prefers-reduced-motion.
 */
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
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

const GREEN = "#22c55e";
const RED = "#ef4444";
const BLUE = "#4f7cff";

/* Fabric layout: origin in the middle, two rough rings around it. */
const NODES: { pos: [number, number, number]; origin?: boolean }[] = [
  { pos: [0, 0, 0], origin: true },
  { pos: [1.7, 0.5, -0.6] },
  { pos: [-1.6, 0.7, -0.9] },
  { pos: [1.2, -0.8, 1.1] },
  { pos: [-1.4, -0.6, 0.9] },
  { pos: [0.2, 1.3, 0.8] },
  { pos: [3.1, -0.2, 0.4] },
  { pos: [-3.0, 0.1, -0.2] },
  { pos: [2.4, 1.4, -1.4] },
  { pos: [-2.3, -1.5, -1.0] },
  { pos: [0.8, -1.9, -0.9] },
  { pos: [-0.9, 1.9, -1.3] },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 6], [1, 8], [2, 7], [2, 11], [3, 6],
  [3, 10], [4, 9], [4, 7], [5, 11], [5, 8],
  [9, 10],
];

/* Timeline (seconds): healthy → withdrawal ripple → gate flash → recovery */
const T_HEALTHY = 1.6;
const T_RIPPLE = 2.6; // wavefront expands
const T_GATE = 0.9; // gate flash / blocked
const T_RECOVER = 1.4; // fabric snaps back
const CYCLE = T_HEALTHY + T_RIPPLE + T_GATE + T_RECOVER;
const MAX_DIST = 3.6;

function FabricNode({
  pos,
  origin,
  registerMat,
}: {
  pos: [number, number, number];
  origin?: boolean;
  registerMat: (m: THREE.MeshStandardMaterial | null) => void;
}) {
  const size = origin ? 0.34 : 0.22;
  return (
    <Float speed={1.4} rotationIntensity={0.05} floatIntensity={0.18}>
      <group position={pos}>
        <mesh>
          <icosahedronGeometry args={[size, 1]} />
          <meshStandardMaterial
            ref={registerMat as any}
            color={GREEN}
            emissive={GREEN}
            emissiveIntensity={1.4}
            roughness={0.35}
          />
        </mesh>
        {origin && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.42, 0]}>
            <ringGeometry args={[0.4, 0.52, 28]} />
            <meshStandardMaterial
              color={BLUE}
              emissive={BLUE}
              emissiveIntensity={0.8}
              transparent
              opacity={0.4}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function Scene({ animate }: { animate: boolean }) {
  const nodeMats = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const shell = useRef<THREE.Mesh>(null);
  const gate = useRef<THREE.Mesh>(null);
  const dists = useMemo(
    () => NODES.map((n) => Math.hypot(...n.pos)),
    [],
  );
  const nodeVecs = useMemo(() => NODES.map((n) => new THREE.Vector3(...n.pos)), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const time = animate ? state.clock.elapsedTime : T_HEALTHY + T_RIPPLE * 0.7;
    const t = time % CYCLE;

    // Wavefront radius over the cycle
    let wave = 0; // 0 = healthy
    let recovering = 0; // 0..1 back to green
    if (t < T_HEALTHY) {
      wave = 0;
    } else if (t < T_HEALTHY + T_RIPPLE) {
      wave = ((t - T_HEALTHY) / T_RIPPLE) * MAX_DIST;
    } else if (t < T_HEALTHY + T_RIPPLE + T_GATE) {
      wave = MAX_DIST;
    } else {
      wave = MAX_DIST;
      recovering = (t - T_HEALTHY - T_RIPPLE - T_GATE) / T_RECOVER;
    }

    // Node colors: red inside the wavefront, healing back to green
    nodeMats.current.forEach((m, i) => {
      if (!m) return;
      const hit = wave > 0 && dists[i] <= wave;
      const red = hit ? Math.max(0, 1 - recovering * 1.6) : 0;
      tmp.set(GREEN).lerp(new THREE.Color(RED), red);
      m.color.copy(tmp);
      m.emissive.copy(tmp);
      m.emissiveIntensity = 1.4 + red * 1.4 + Math.sin(time * 3 + i) * 0.25;
    });

    // Expanding translucent wavefront shell from the origin
    if (shell.current) {
      const sm = shell.current.material as THREE.MeshBasicMaterial;
      if (wave > 0 && recovering === 0) {
        shell.current.visible = true;
        shell.current.scale.setScalar(Math.max(wave, 0.001));
        sm.opacity = 0.14 * (1 - wave / (MAX_DIST * 1.15));
      } else if (recovering > 0) {
        // shell collapses back on recovery
        const r = MAX_DIST * (1 - recovering);
        shell.current.visible = r > 0.05;
        shell.current.scale.setScalar(Math.max(r, 0.001));
        sm.opacity = 0.1 * recovering;
        (sm.color as THREE.Color).set(GREEN);
      } else {
        shell.current.visible = false;
        (shell.current.material as THREE.MeshBasicMaterial).color.set(RED);
      }
    }

    // Gate ring: idle blue; flashes green hard at the block moment
    if (gate.current) {
      const gm = gate.current.material as THREE.MeshStandardMaterial;
      const flashing =
        t >= T_HEALTHY + T_RIPPLE && t < T_HEALTHY + T_RIPPLE + T_GATE;
      const c = flashing ? GREEN : BLUE;
      gm.color.set(c);
      gm.emissive.set(c);
      const target = flashing ? 3.4 : 0.9;
      gm.emissiveIntensity += (target - gm.emissiveIntensity) * 0.2;
      gate.current.rotation.z = time * 0.3;
      gate.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.4) * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 8, 6]} intensity={0.9} color="#dbe4ff" />
      <directionalLight position={[-5, -3, -4]} intensity={0.25} color="#8ef0c9" />

      {/* Edges */}
      {EDGES.map(([a, b], i) => (
        <Line
          key={i}
          points={[nodeVecs[a], nodeVecs[b]]}
          color={BLUE}
          lineWidth={1}
          transparent
          opacity={0.22}
        />
      ))}

      {/* Nodes */}
      {NODES.map((n, i) => (
        <FabricNode
          key={i}
          pos={n.pos}
          origin={n.origin}
          registerMat={(m) => (nodeMats.current[i] = m)}
        />
      ))}

      {/* Withdrawal wavefront shell */}
      <mesh ref={shell} visible={false}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color={RED}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* The verification gate encircling the fabric */}
      <mesh ref={gate} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.1, 0.035, 10, 72]} />
        <meshStandardMaterial
          color={BLUE}
          emissive={BLUE}
          emissiveIntensity={0.9}
          roughness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>
    </>
  );
}

export function WithdrawalScene({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const animate = !reduced;
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 3.4, 8.2], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        frameloop={animate ? "always" : "demand"}
        className="h-full w-full"
      >
        <Scene animate={animate} />
      </Canvas>
    </div>
  );
}
