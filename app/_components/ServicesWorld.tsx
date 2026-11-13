"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { getAdaptiveDpr } from "./useSceneVisibility";

type SceneProps = { progress: MutableRefObject<number>; reducedMotion: boolean };
type Props = SceneProps & { active: boolean };
type GroupRef = React.RefObject<THREE.Group | null>;
type Pose = readonly [number, number, number, number];

const neuralPoses: Pose[] = [
  [0, 0, 0, 1], [-0.48, 0.05, -0.25, 0.78], [-1.12, 0.08, -0.45, 0.58], [-1.28, 0.08, -0.75, 0.48],
];
const machinePoses: Pose[] = [
  [0.25, -0.05, -0.8, 0.2], [0, 0, 0, 0.94], [-0.32, 0.02, -0.15, 0.77], [-0.82, -0.06, -0.45, 0.62],
];
const browserPoses: Pose[] = [
  [0.55, 0, -1.2, 0.12], [0.88, 0.04, -0.65, 0.28], [0, 0.04, 0, 0.96], [0.92, 0.04, -0.28, 0.72],
];
const ecosystemPoses: Pose[] = [
  [0.2, 0, -1.5, 0.12], [0.5, 0, -1.15, 0.28], [0.62, 0, -0.88, 0.4], [0, 0, -0.3, 0.9],
];

function placeAtProgress(group: THREE.Group | null, poses: Pose[], progress: number) {
  if (!group) return;
  const frame = Math.min(3, progress * 4);
  const index = Math.min(2, Math.floor(frame));
  const mix = frame >= 3 ? 1 : frame - index;
  const from = poses[index];
  const to = poses[index + 1];
  group.position.set(
    THREE.MathUtils.lerp(from[0], to[0], mix),
    THREE.MathUtils.lerp(from[1], to[1], mix),
    THREE.MathUtils.lerp(from[2], to[2], mix),
  );
  group.scale.setScalar(THREE.MathUtils.lerp(from[3], to[3], mix));
}

function NetworkField({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      const phi = Math.acos(-1 + (2 * i) / 180);
      const theta = Math.sqrt(180 * Math.PI) * phi;
      const radius = 3.2 + Math.random() * 2;
      values[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      values[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      values[i * 3 + 2] = radius * Math.cos(phi) - 2;
    }
    return values;
  }, []);
  useFrame((_, delta) => {
    if (!reducedMotion && points.current) points.current.rotation.y += delta * 0.008;
  });
  return <points ref={points}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#35d98a" size={0.025} transparent opacity={0.32} sizeAttenuation depthWrite={false} />
  </points>;
}

// The neural core remains the working Chapter 01 object; its parent travels through the shared scene.
function NeuralCore({ reducedMotion }: { reducedMotion: boolean }) {
  const core = useRef<THREE.Group>(null);
  const nodes = useMemo(() => Array.from({ length: 13 }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / 13);
    const theta = Math.sqrt(13 * Math.PI) * phi;
    return new THREE.Vector3(1.35 * Math.cos(theta) * Math.sin(phi), 1.35 * Math.sin(theta) * Math.sin(phi), 1.35 * Math.cos(phi));
  }), []);
  const links = useMemo(() => {
    const points: number[] = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && a.distanceTo(b) < 1.35) points.push(a.x, a.y, a.z, b.x, b.y, b.z); }));
    return new Float32Array(points);
  }, [nodes]);
  useFrame((_, delta) => {
    if (!reducedMotion && core.current) core.current.rotation.y += delta * 0.12;
  });
  return <group ref={core}>
    <mesh>
      <icosahedronGeometry args={[0.62, 2]} />
      <meshStandardMaterial color="#153b29" emissive="#16a05a" emissiveIntensity={1.35} metalness={0.45} roughness={0.3} />
    </mesh>
    <mesh scale={1.55}><icosahedronGeometry args={[0.62, 1]} /><meshBasicMaterial color="#35d98a" wireframe transparent opacity={0.2} /></mesh>
    <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[links, 3]} /></bufferGeometry><lineBasicMaterial color="#35d98a" transparent opacity={0.55} /></lineSegments>
    {nodes.map((point, i) => <mesh key={i} position={point.toArray()}><sphereGeometry args={[i % 4 === 0 ? 0.09 : 0.055, 10, 10]} /><meshBasicMaterial color={i % 4 === 0 ? "#f1f5f2" : "#35d98a"} /></mesh>)}
    <mesh rotation={[0.7, 0.2, -0.3]}><torusGeometry args={[1.72, 0.009, 6, 100]} /><meshBasicMaterial color="#35d98a" transparent opacity={0.48} /></mesh>
    <pointLight color="#35d98a" intensity={14} distance={5} />
  </group>;
}

function MechanicalStructure({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (!reducedMotion && group.current) group.current.rotation.y += delta * 0.09; });
  return <group ref={group}>
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = i % 2 === 0 ? 0.82 : 1.12;
      return <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, (i % 3 - 1) * 0.28]} rotation={[0.24 * i, 0.18 * i, angle]}>
        <boxGeometry args={[0.36, 0.36, 0.36]} />
        <meshStandardMaterial color="#101813" emissive="#16a05a" emissiveIntensity={0.4 + (i % 3) * 0.12} metalness={0.65} roughness={0.28} />
      </mesh>;
    })}
    <mesh rotation={[Math.PI / 2.6, 0.3, 0]}><torusGeometry args={[1.45, 0.018, 8, 96]} /><meshBasicMaterial color="#35d98a" transparent opacity={0.62} /></mesh>
    <mesh rotation={[0.3, 0.8, 0.2]}><torusGeometry args={[0.92, 0.012, 8, 80]} /><meshBasicMaterial color="#35d98a" transparent opacity={0.4} /></mesh>
    <mesh position={[0, -1, -0.18]} rotation={[-0.4, 0, 0]}><cylinderGeometry args={[0.72, 1.12, 0.14, 8, 1, true]} /><meshBasicMaterial color="#35d98a" wireframe transparent opacity={0.34} /></mesh>
    {[0, 1, 2].map((i) => <mesh key={`pin-${i}`} position={[-0.46 + i * 0.46, 1.35, 0]}><boxGeometry args={[0.2, 0.34, 0.2]} /><meshBasicMaterial color="#35d98a" transparent opacity={0.55} /></mesh>)}
  </group>;
}

function BrowserStructure({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!reducedMotion && group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
  });
  return <group ref={group} rotation={[0.04, -0.18, 0]}>
    {[0, 1, 2].map((i) => <group key={i} position={[(i - 1) * 0.18, (1 - i) * 0.14, (i - 1) * 0.28]} rotation={[0, (i - 1) * -0.08, 0]}>
      <mesh><boxGeometry args={[2.2 - Math.abs(i - 1) * 0.18, 1.55 - Math.abs(i - 1) * 0.12, 0.07]} /><meshPhysicalMaterial color="#101813" emissive="#153b29" emissiveIntensity={0.32} metalness={0.36} roughness={0.26} /></mesh>
      <mesh position={[0, 0.55, 0.05]}><boxGeometry args={[2.05 - Math.abs(i - 1) * 0.16, 0.035, 0.018]} /><meshBasicMaterial color="#35d98a" /></mesh>
      {[-0.76, -0.54, -0.32].map((x, j) => <mesh key={j} position={[x, 0.65, 0.055]}><sphereGeometry args={[0.035, 8, 8]} /><meshBasicMaterial color={j === 0 ? "#35d98a" : "#9aa79e"} /></mesh>)}
      <mesh position={[-0.52, -0.12, 0.055]}><boxGeometry args={[0.72, 0.6, 0.025]} /><meshBasicMaterial color="#16a05a" transparent opacity={0.2} /></mesh>
      <mesh position={[0.42, 0.1, 0.055]}><boxGeometry args={[0.88, 0.075, 0.025]} /><meshBasicMaterial color="#35d98a" transparent opacity={0.68} /></mesh>
      <mesh position={[0.42, -0.08, 0.055]}><boxGeometry args={[0.75, 0.04, 0.025]} /><meshBasicMaterial color="#9aa79e" transparent opacity={0.38} /></mesh>
      <mesh position={[0.42, -0.22, 0.055]}><boxGeometry args={[0.86, 0.04, 0.025]} /><meshBasicMaterial color="#9aa79e" transparent opacity={0.3} /></mesh>
    </group>)}
  </group>;
}

function UnifiedEcosystem({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (!reducedMotion && group.current) group.current.rotation.y += delta * 0.045; });
  return <group ref={group}>
    <mesh><icosahedronGeometry args={[0.62, 2]} /><meshPhysicalMaterial color="#153b29" emissive="#16a05a" emissiveIntensity={0.65} roughness={0.24} metalness={0.32} clearcoat={0.75} /></mesh>
    <mesh scale={1.17} rotation={[0.3, 0.8, 0]}><icosahedronGeometry args={[0.62, 1]} /><meshBasicMaterial color="#35d98a" wireframe transparent opacity={0.3} /></mesh>
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * 1.9;
      const y = Math.sin(angle) * 1.15;
      const z = Math.sin(i * 1.4) * 0.55;
      return <group key={i} position={[x, y, z]}>
        <mesh><sphereGeometry args={[0.12 + (i % 2) * 0.035, 14, 14]} /><meshStandardMaterial color="#35d98a" emissive="#16a05a" emissiveIntensity={1.1} metalness={0.35} roughness={0.22} /></mesh>
        <mesh position={[-x / 2, -y / 2, -z / 2]}><boxGeometry args={[Math.hypot(x, y) * 0.88, 0.012, 0.012]} /><meshBasicMaterial color="#35d98a" transparent opacity={0.58} /></mesh>
      </group>;
    })}
    {[1.45, 2.08].map((radius, i) => <mesh key={i} rotation={[0.7 + i * 0.55, 0.2, 0.6]}><torusGeometry args={[radius, 0.012, 6, 120]} /><meshBasicMaterial color="#35d98a" transparent opacity={0.45 - i * 0.1} /></mesh>)}
    <pointLight color="#35d98a" intensity={11} distance={6} />
  </group>;
}

function CameraRig({ progress, reducedMotion }: SceneProps) {
  const { camera, pointer } = useThree();
  useFrame((_, delta) => {
    const pullback = THREE.MathUtils.smoothstep(progress.current, 0.78, 1);
    const parallax = reducedMotion ? 0 : 0.18;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * parallax, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * parallax, 2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 8.5 + pullback * 2.2, 2, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ progress, reducedMotion }: SceneProps) {
  const neural = useRef<THREE.Group>(null);
  const machine = useRef<THREE.Group>(null);
  const browser = useRef<THREE.Group>(null);
  const ecosystem = useRef<THREE.Group>(null);

  useFrame(() => {
    const value = THREE.MathUtils.clamp(progress.current, 0, 1);
    placeAtProgress(neural.current, neuralPoses, value);
    placeAtProgress(machine.current, machinePoses, value);
    placeAtProgress(browser.current, browserPoses, value);
    placeAtProgress(ecosystem.current, ecosystemPoses, value);
  });

  return <>
    <color attach="background" args={["#090d0b"]} />
    <fog attach="fog" args={["#090d0b", 11, 25]} />
    <ambientLight intensity={0.52} />
    <directionalLight position={[-3, 5, 5]} color="#e2f6e9" intensity={1.35} />
    <pointLight position={[0, 1.4, 3]} color="#16a05a" intensity={12} distance={9} />
    <NetworkField reducedMotion={reducedMotion} />
    <group ref={neural}><NeuralCore reducedMotion={reducedMotion} /></group>
    <group ref={machine}><MechanicalStructure reducedMotion={reducedMotion} /></group>
    <group ref={browser}><BrowserStructure reducedMotion={reducedMotion} /></group>
    <group ref={ecosystem}><UnifiedEcosystem reducedMotion={reducedMotion} /></group>
    <mesh position={[0, -2.08, -0.35]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[1.5, 1.515, 96]} /><meshBasicMaterial color="#35d98a" transparent opacity={0.18} side={THREE.DoubleSide} /></mesh>
    <CameraRig progress={progress} reducedMotion={reducedMotion} />
  </>;
}

export default function ServicesWorld({ progress, reducedMotion, active }: Props) {
  return <Canvas
    className="!absolute inset-0"
    dpr={getAdaptiveDpr()}
    camera={{ position: [0, 0, 8.5], fov: 42, near: 0.1, far: 40 }}
    frameloop={active ? "always" : "never"}
    gl={{ alpha: false, antialias: false, powerPreference: "low-power" }}
    fallback={<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,160,90,.2),transparent_64%)]" aria-label="Emerald digital environment" />}
  >
    <Scene progress={progress} reducedMotion={reducedMotion} />
  </Canvas>;
}
