/**
 * PacketFlowScene — 3D network topology with animated data packets
 * flowing between nodes. Nodes show verification status (green/red/blue).
 * Used on ConfigStudio and Features pages.
 */
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, OrbitControls, RoundedBox, Line } from "@react-three/drei";
import * as THREE from "three";

type NodeStatus = "verified" | "fault" | "scanning" | "normal";

const statusColors: Record<NodeStatus, string> = {
  verified: "#22c55e",
  fault: "#ef4444",
  scanning: "#f59e0b",
  normal: "#3b82f6",
};

/* ── Network node (small switch/router) ── */
function NetNode({
  position,
  status = "normal",
  size = 1,
  speed = 1.5,
}: {
  position: [number, number, number];
  status?: NodeStatus;
  size?: number;
  speed?: number;
}) {
  const ledRef = useRef<THREE.Mesh>(null);
  const pulseSpeed = useMemo(
    () => (status === "fault" ? 6 : status === "scanning" ? 4 : 2),
    [status],
  );
  const color = statusColors[status];

  useFrame((state) => {
    if (!ledRef.current) return;
    const mat = ledRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity =
      2 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 1.5;
  });

  const w = 0.9 * size;
  const h = 0.2 * size;
  const d = 0.6 * size;

  return (
    <Float speed={speed} rotationIntensity={0.06} floatIntensity={0.2}>
      <group position={position}>
        {/* Device body */}
        <RoundedBox args={[w, h, d]} radius={0.03} smoothness={4} castShadow>
          <meshPhysicalMaterial
            color="#e6e6ee"
            roughness={0.28}
            metalness={0.02}
            clearcoat={0.5}
            clearcoatRoughness={0.25}
          />
        </RoundedBox>

        {/* Top face */}
        <mesh position={[0, h / 2 + 0.002, 0]}>
          <boxGeometry args={[w - 0.04, 0.003, d - 0.04]} />
          <meshPhysicalMaterial color="#f0f0f7" roughness={0.2} clearcoat={0.6} />
        </mesh>

        {/* Port strip */}
        <mesh position={[0, 0, d / 2 + 0.004]}>
          <planeGeometry args={[w * 0.65, h * 0.4]} />
          <meshStandardMaterial color="#12121f" roughness={0.95} />
        </mesh>

        {/* Status LED — pulsing based on status */}
        <mesh
          ref={ledRef}
          position={[w / 2 - 0.06, 0.02, d / 2 + 0.005]}
        >
          <circleGeometry args={[0.025, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={3}
          />
        </mesh>

        {/* Status glow ring underneath */}
        <mesh position={[0, -h / 2 - 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[w * 0.3, w * 0.45, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Edge / connection line ── */
function Edge({
  start,
  end,
  color = "#3b82f6",
  opacity = 0.35,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: string;
  opacity?: number;
}) {
  const points = useMemo(() => [start, end], [start, end]);
  return (
    <Line
      points={points}
      color={color}
      lineWidth={1.5}
      transparent
      opacity={opacity}
    />
  );
}

/* ── Animated data packet ── */
function Packet({
  path,
  speed = 0.4,
  color = "#ffffff",
}: {
  path: THREE.Vector3[];
  speed?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime * speed + offset) % 1);
    const index = Math.floor(t * (path.length - 1));
    const next = Math.min(index + 1, path.length - 1);
    const localT = (t * (path.length - 1)) % 1;
    ref.current.position.lerpVectors(path[index], path[next], localT);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
      />
    </mesh>
  );
}

/* ── Topology ── */
function Topology() {
  /* Node positions (x, y, z) */
  const nodes = useMemo(
    () => [
      { pos: [0, 0, 0] as [number, number, number], status: "verified" as NodeStatus, size: 1.2 },
      { pos: [3, 1.5, -1] as [number, number, number], status: "verified" as NodeStatus, size: 1 },
      { pos: [-3, 1, -1.5] as [number, number, number], status: "verified" as NodeStatus, size: 1 },
      { pos: [2, -1.5, 1.5] as [number, number, number], status: "fault" as NodeStatus, size: 0.9 },
      { pos: [-2.5, -1, 2] as [number, number, number], status: "verified" as NodeStatus, size: 0.95 },
      { pos: [4.5, 0, 1] as [number, number, number], status: "scanning" as NodeStatus, size: 0.85 },
      { pos: [-4, -0.5, 0] as [number, number, number], status: "verified" as NodeStatus, size: 0.9 },
      { pos: [1, 2.5, -2.5] as [number, number, number], status: "normal" as NodeStatus, size: 0.8 },
      { pos: [-1.5, 2, -2] as [number, number, number], status: "verified" as NodeStatus, size: 0.85 },
    ],
    [],
  );

  const nodeVecs = useMemo(
    () => nodes.map((n) => new THREE.Vector3(...n.pos)),
    [nodes],
  );

  /* Edges (index pairs) */
  const edges = useMemo(
    () => [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 5], [1, 7],
      [2, 6], [2, 8],
      [3, 5], [4, 6],
      [7, 8], [1, 8],
    ],
    [],
  );

  /* Packet paths */
  const packetPaths = useMemo(
    () => [
      [nodeVecs[0], nodeVecs[1], nodeVecs[5]],
      [nodeVecs[2], nodeVecs[0], nodeVecs[3]],
      [nodeVecs[6], nodeVecs[2], nodeVecs[0], nodeVecs[1]],
      [nodeVecs[0], nodeVecs[4], nodeVecs[6]],
      [nodeVecs[7], nodeVecs[1], nodeVecs[0]],
      [nodeVecs[8], nodeVecs[2], nodeVecs[0], nodeVecs[3]],
    ],
    [nodeVecs],
  );

  return (
    <group>
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <Edge
          key={`e${i}`}
          start={nodeVecs[a]}
          end={nodeVecs[b]}
          color={
            nodes[a].status === "fault" || nodes[b].status === "fault"
              ? "#ef4444"
              : "#3b82f6"
          }
          opacity={
            nodes[a].status === "fault" || nodes[b].status === "fault"
              ? 0.5
              : 0.25
          }
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <NetNode
          key={`n${i}`}
          position={n.pos}
          status={n.status}
          size={n.size}
          speed={1 + i * 0.15}
        />
      ))}

      {/* Packets */}
      {packetPaths.map((path, i) => (
        <Packet
          key={`p${i}`}
          path={path}
          speed={0.25 + i * 0.06}
          color={i === 1 || i === 5 ? "#ef4444" : "#ffffff"}
        />
      ))}
    </group>
  );
}

/* ── Exported scene ── */
export function PacketFlowScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        orthographic
        camera={{ position: [10, 7, 10], zoom: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        shadows
        className="w-full h-full"
      >
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[8, 12, 8]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
          shadow-bias={-0.001}
        />
        <directionalLight position={[-5, 6, -4]} intensity={0.3} color="#c4c8ff" />

        <Topology />

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.15}
          scale={22}
          blur={2.5}
          far={10}
        />

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
