/**
 * MeshFieldScene — an abstract, premium network mesh: a cloud of glowing nodes
 * linked by proximity edges, with light pulses flowing along a subset of them.
 * Slow, ambient motion. Brand palette (deep-blue nodes, emerald/cyan pulses).
 *
 * Reads as "Optimesh" — a living mesh of connected networks — without being a
 * literal topology diagram. Used as a hero backdrop on About / Why / Features /
 * Index. Transparent canvas, pointer-events off, and honours
 * prefers-reduced-motion (freezes to a static frame).
 */
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ── prefers-reduced-motion ── */
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

/* ── deterministic PRNG so the layout is stable across mounts ── */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NODE_COLOR = "#4f7cff"; // deep brand blue
const HUB_COLOR = "#7aa2ff"; // brighter hub blue
const PULSE_COLORS = ["#34d399", "#38bdf8", "#34d399"]; // emerald / cyan

type Node = {
  pos: THREE.Vector3;
  size: number;
  hub: boolean;
  speed: number;
  offset: number;
};

/* ── Build the mesh geometry once (nodes + proximity edges + pulse paths) ── */
function useMesh(count: number, seed: number) {
  return useMemo(() => {
    const rand = mulberry32(seed);
    const nodes: Node[] = [];

    // Distribute in a portrait-ish slab with a soft spherical falloff so the
    // cloud has a dense core and sparse edges (reads premium, not uniform).
    for (let i = 0; i < count; i++) {
      const r = Math.pow(rand(), 0.7);
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta) * 3.2;
      const y = r * Math.cos(phi) * 3.6;
      const z = r * Math.sin(phi) * Math.sin(theta) * 3.2;
      const hub = rand() > 0.82;
      nodes.push({
        pos: new THREE.Vector3(x, y, z),
        size: hub ? 0.11 + rand() * 0.05 : 0.04 + rand() * 0.035,
        hub,
        speed: 1.5 + rand() * 3,
        offset: rand() * Math.PI * 2,
      });
    }

    // Edges: connect pairs within a distance threshold (capped per node so the
    // graph stays legible rather than a hairball).
    const edges: [number, number][] = [];
    const degree = new Array(count).fill(0);
    const threshold = 2.35;
    const pairs: { a: number; b: number; d: number }[] = [];
    for (let a = 0; a < count; a++) {
      for (let b = a + 1; b < count; b++) {
        const d = nodes[a].pos.distanceTo(nodes[b].pos);
        if (d < threshold) pairs.push({ a, b, d });
      }
    }
    pairs.sort((p, q) => p.d - q.d);
    for (const { a, b } of pairs) {
      if (degree[a] >= 4 || degree[b] >= 4) continue;
      edges.push([a, b]);
      degree[a]++;
      degree[b]++;
    }

    // Pulses travel along the longer edges (more visible flow).
    const pulseEdges = [...edges]
      .sort(
        (e, f) =>
          nodes[f[0]].pos.distanceTo(nodes[f[1]].pos) -
          nodes[e[0]].pos.distanceTo(nodes[e[1]].pos),
      )
      .slice(0, Math.min(9, edges.length));

    return { nodes, edges, pulseEdges };
  }, [count, seed]);
}

/* ── A single glowing node ── */
function MeshNode({ node, animate }: { node: Node; animate: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const color = node.hub ? HUB_COLOR : NODE_COLOR;

  useFrame((state) => {
    if (!ref.current || !animate) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity =
      1.4 + Math.sin(state.clock.elapsedTime * node.speed + node.offset) * 0.9;
  });

  return (
    <mesh ref={ref} position={node.pos}>
      <icosahedronGeometry args={[node.size, node.hub ? 1 : 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.6}
        roughness={0.35}
        metalness={0.1}
      />
    </mesh>
  );
}

/* ── A light pulse travelling from one node to another and looping ── */
function Pulse({
  from,
  to,
  color,
  speed,
  animate,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color: string;
  speed: number;
  animate: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => (from.x * 13.7 + to.y * 7.1) % 1, [from, to]);

  useFrame((state) => {
    if (!ref.current) return;
    const raw = animate
      ? (state.clock.elapsedTime * speed + offset) % 1
      : 0.5;
    ref.current.position.lerpVectors(from, to, raw);
    // Fade in/out at the ends so pulses don't pop.
    const fade = Math.sin(raw * Math.PI);
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 1 + fade * 3.5;
    ref.current.scale.setScalar(0.6 + fade * 0.8);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 10, 10]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
    </mesh>
  );
}

/* ── The mesh, slowly drifting as a whole ── */
function Mesh({ count, seed, animate }: { count: number; seed: number; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { nodes, edges, pulseEdges } = useMesh(count, seed);

  useFrame((state) => {
    if (!group.current || !animate) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.05;
    group.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    group.current.position.y = Math.sin(t * 0.4) * 0.12;
  });

  return (
    <group ref={group}>
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <Line
          key={`e${i}`}
          points={[nodes[a].pos, nodes[b].pos]}
          color={nodes[a].hub || nodes[b].hub ? HUB_COLOR : NODE_COLOR}
          lineWidth={1}
          transparent
          opacity={nodes[a].hub || nodes[b].hub ? 0.28 : 0.16}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <MeshNode key={`n${i}`} node={n} animate={animate} />
      ))}

      {/* Pulses */}
      {pulseEdges.map(([a, b], i) => (
        <Pulse
          key={`p${i}`}
          from={nodes[a].pos}
          to={nodes[b].pos}
          color={PULSE_COLORS[i % PULSE_COLORS.length]}
          speed={0.18 + (i % 4) * 0.05}
          animate={animate}
        />
      ))}
    </group>
  );
}

/* ── Exported scene ── */
export function MeshFieldScene({
  className,
  count = 34,
  seed = 7,
}: {
  className?: string;
  count?: number;
  seed?: number;
}) {
  const reduced = useReducedMotion();
  const animate = !reduced;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        frameloop={animate ? "always" : "demand"}
        className="h-full w-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 8, 6]} intensity={0.8} color="#c4d2ff" />
        <directionalLight position={[-6, -4, -2]} intensity={0.3} color="#8ef0c9" />
        <Mesh count={count} seed={seed} animate={animate} />
      </Canvas>
    </div>
  );
}
