"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { getAdaptiveDpr } from "./useSceneVisibility";

type SceneProps = { progress: MutableRefObject<number>; reducedMotion: boolean };
type Props = SceneProps & { active: boolean };
type Pose = readonly [number, number, number, number];

const corePoses: Pose[] = [
  [0, 0, 0, 0.76], [0, 0, 0, 0.82], [0, 0, 0, 0.72], [0, 0, 0, 0.75], [0, 0, 0, 0.82],
];
const framePoses: Pose[] = [
  [0, 0, -0.25, 0.52], [0, 0, -0.18, 0.72], [0, 0, -0.12, 0.9], [0, 0, -0.05, 1], [0, 0, 0, 1.12],
];
const centerPoses: Pose[] = [
  [0, 0, 0, 0.25], [0, 0, 0, 0.48], [0, 0, 0, 0.62], [0, 0, 0, 0.68], [0, 0, 0, 0.88],
];

function applyPose(group: THREE.Group | null, poses: Pose[], progress: number) {
  if (!group) return;
  const frame = Math.min(4, progress * 5);
  const index = Math.min(3, Math.floor(frame));
  const mix = frame >= 4 ? 1 : frame - index;
  const from = poses[index];
  const to = poses[index + 1];
  group.position.set(
    THREE.MathUtils.lerp(from[0], to[0], mix),
    THREE.MathUtils.lerp(from[1], to[1], mix),
    THREE.MathUtils.lerp(from[2], to[2], mix),
  );
  group.scale.setScalar(THREE.MathUtils.lerp(from[3], to[3], mix));
}

function ProjectSeed({ progress, reducedMotion }: SceneProps) {
  const root = useRef<THREE.Group>(null);
  const crystal = useRef<THREE.Group>(null);
  const scanRing = useRef<THREE.Mesh>(null);
  const scanSheet = useRef<THREE.Mesh>(null);
  const nodes = useMemo(() => Array.from({ length: 17 }, (_, index) => {
    const phi = Math.acos(-1 + (2 * index) / 17);
    const theta = Math.sqrt(17 * Math.PI) * phi;
    return new THREE.Vector3(Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi));
  }), []);
  const links = useMemo(() => {
    const points: number[] = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => {
      if (j > i && a.distanceTo(b) < 0.82) points.push(a.x * 0.95, a.y * 0.95, a.z * 0.95, b.x * 0.95, b.y * 0.95, b.z * 0.95);
    }));
    return new Float32Array(points);
  }, [nodes]);
  useFrame((state, delta) => {
    const p = progress.current;
    applyPose(root.current, corePoses, p);
    const scan = 1 - THREE.MathUtils.smoothstep(p, 0.12, 0.39);
    if (scanRing.current) {
      scanRing.current.rotation.x = 0.55 + p * 0.8;
      scanRing.current.rotation.z = state.clock.elapsedTime * (reducedMotion ? 0 : 0.15);
      scanRing.current.scale.setScalar(1 + (1 - scan) * 0.45);
    }
    if (scanSheet.current) {
      scanSheet.current.position.y = Math.sin(p * Math.PI * 5) * 0.75;
      const material = scanSheet.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.28 * scan;
    }
    if (!reducedMotion && crystal.current) {
      crystal.current.rotation.y += delta * 0.1;
      crystal.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.06;
    }
  });
  return <group ref={root}>
    <group ref={crystal}>
      <mesh>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshPhysicalMaterial color="#101813" emissive="#073b38" emissiveIntensity={0.48} metalness={0.62} roughness={0.26} clearcoat={0.75} />
      </mesh>
      <mesh scale={1.03} rotation={[0.2, 0.42, 0.1]}>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshBasicMaterial color="#14beb3" wireframe transparent opacity={0.38} />
      </mesh>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[links, 3]} /></bufferGeometry>
        <lineBasicMaterial color="#35d98a" transparent opacity={0.56} />
      </lineSegments>
      {nodes.map((point, i) => <mesh key={i} position={point.clone().multiplyScalar(0.95).toArray()}>
        <sphereGeometry args={[i % 3 === 0 ? 0.045 : 0.026, 10, 10]} />
        <meshBasicMaterial color={i % 3 === 0 ? "#7ef4dc" : "#35d98a"} />
      </mesh>)}
    </group>
    <mesh ref={scanRing} rotation={[0.55, 0.2, 0]}>
      <torusGeometry args={[1.42, 0.018, 8, 144]} />
      <meshPhysicalMaterial color="#35d98a" emissive="#16a05a" emissiveIntensity={0.75} metalness={0.78} roughness={0.22} />
    </mesh>
    <mesh ref={scanSheet} rotation={[0, 0, 0]}>
      <planeGeometry args={[2.25, 0.016]} />
      <meshBasicMaterial color="#75fff0" transparent opacity={0.28} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
    <pointLight color="#23d4bd" intensity={8} distance={4} />
  </group>;
}

function FragmentCloud({ progress, reducedMotion }: SceneProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const directions = useMemo(() => Array.from({ length: 36 }, (_, index) => {
    const phi = Math.acos(-1 + (2 * index) / 36);
    const theta = Math.sqrt(36 * Math.PI) * phi;
    return new THREE.Vector3(Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi));
  }), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame((state) => {
    if (!mesh.current) return;
    const p = progress.current;
    const scatter = THREE.MathUtils.smoothstep(p, 0.12, 0.42);
    const align = THREE.MathUtils.smoothstep(p, 0.48, 0.7);
    directions.forEach((direction, index) => {
      const angle = index * 2.399 + (reducedMotion ? 0 : state.clock.elapsedTime * 0.025);
      const initialRadius = 0.52 + (index % 5) * 0.045;
      const expandedRadius = 1.55 + (index % 4) * 0.16;
      const orbitRadius = THREE.MathUtils.lerp(initialRadius, expandedRadius, scatter);
      const clusteredX = Math.cos(angle) * (0.62 + (index % 4) * 0.2);
      const clusteredY = ((index % 9) - 4) * 0.23;
      const x = THREE.MathUtils.lerp(direction.x * orbitRadius, clusteredX, align);
      const y = THREE.MathUtils.lerp(direction.y * orbitRadius, clusteredY, align);
      const z = THREE.MathUtils.lerp(direction.z * orbitRadius * 0.72, direction.z * 0.62, align);
      const size = (0.035 + (index % 4) * 0.018) * (0.7 + scatter * 0.35);
      dummy.position.set(x, y, z);
      dummy.rotation.set(angle * 0.4, angle, angle * 0.7);
      dummy.scale.set(size * (1 + (index % 3) * 0.8), size, size * (1 + (index % 2)));
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={mesh} args={[undefined, undefined, directions.length]}>
    <icosahedronGeometry args={[1, 0]} />
    <meshStandardMaterial color="#12201d" emissive="#0c4a46" emissiveIntensity={0.52} metalness={0.66} roughness={0.27} />
  </instancedMesh>;
}

function ArchitecturalFrame({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (root.current) {
      root.current.rotation.y = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.16) * 0.09;
      root.current.rotation.z = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.12) * 0.035;
    }
    void delta;
  });
  return <group ref={root}>
    <mesh rotation={[0.28, 0.35, 0]}><torusGeometry args={[2.2, 0.022, 8, 120]} /><meshStandardMaterial color="#41665a" metalness={0.82} roughness={0.28} /></mesh>
    <mesh rotation={[1.1, -0.2, 0.55]}><torusGeometry args={[1.75, 0.016, 8, 120]} /><meshBasicMaterial color="#35d98a" transparent opacity={0.55} /></mesh>
    <mesh rotation={[0.35, 0.75, 0.2]}><torusGeometry args={[1.32, 0.012, 8, 96]} /><meshBasicMaterial color="#17a8a0" transparent opacity={0.62} /></mesh>
    {[0, 1, 2, 3].map((i) => <group key={i} rotation={[0, 0, (i / 4) * Math.PI * 2]}>
      <mesh position={[1.65, 0, 0]} rotation={[0.2, 0.3, 0]}><boxGeometry args={[0.58, 0.7, 0.28]} /><meshStandardMaterial color="#101813" emissive="#0d342e" emissiveIntensity={0.28} metalness={0.74} roughness={0.3} /></mesh>
      <mesh position={[1.35, 0, 0.12]}><cylinderGeometry args={[0.045, 0.045, 0.56, 12]} /><meshBasicMaterial color="#35d98a" /></mesh>
    </group>)}
    {[0, 1, 2].map((i) => <mesh key={`glass-${i}`} position={[(i - 1) * 0.48, 0.3 - i * 0.12, -0.45 + i * 0.22]} rotation={[0.1, 0.24 * (i - 1), -0.12]}>
      <boxGeometry args={[0.94, 1.2, 0.025]} />
      <meshPhysicalMaterial color="#12302a" transparent opacity={0.2} metalness={0.22} roughness={0.16} transmission={0.16} thickness={0.3} side={THREE.DoubleSide} />
    </mesh>)}
  </group>;
}

function DevelopmentEngine({ reducedMotion }: { reducedMotion: boolean }) {
  const rotor = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (!reducedMotion && rotor.current) rotor.current.rotation.z += delta * 0.18; });
  return <group>
    <group ref={rotor}>
      {[0, 1, 2].map((layer) => <group key={layer} rotation={[0.25 * layer, 0.2 * layer, 0]}>
        <mesh><torusGeometry args={[0.86 + layer * 0.26, 0.035, 10, 64]} /><meshStandardMaterial color={layer === 1 ? "#35d98a" : "#37584c"} metalness={0.82} roughness={0.24} emissive={layer === 1 ? "#0b5538" : "#06140e"} emissiveIntensity={0.5} /></mesh>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((tooth) => <mesh key={tooth} position={[Math.cos((tooth / 8) * Math.PI * 2) * (0.86 + layer * 0.26), Math.sin((tooth / 8) * Math.PI * 2) * (0.86 + layer * 0.26), 0]} rotation={[0, 0, (tooth / 8) * Math.PI * 2]}>
          <boxGeometry args={[0.16, 0.1, 0.12]} /><meshStandardMaterial color="#253c34" metalness={0.8} roughness={0.26} />
        </mesh>)}
      </group>)}
    </group>
    {[0, 1, 2, 3, 4].map((i) => <group key={`module-${i}`} position={[Math.cos((i / 5) * Math.PI * 2) * 2.05, Math.sin((i / 5) * Math.PI * 2) * 1.35, (i % 2) * 0.42 - 0.2]} rotation={[0.15 * i, 0.22 * i, 0]}>
      <mesh><boxGeometry args={[0.5, 0.68, 0.5]} /><meshStandardMaterial color="#101813" emissive="#123c2a" emissiveIntensity={0.45} metalness={0.68} roughness={0.3} /></mesh>
      <mesh position={[0, 0, 0.27]}><boxGeometry args={[0.24, 0.08, 0.025]} /><meshBasicMaterial color="#35d98a" /></mesh>
    </group>)}
    <mesh rotation={[0.5, 0.2, 0]}><torusGeometry args={[2.52, 0.012, 6, 128]} /><meshBasicMaterial color="#35d98a" transparent opacity={0.38} /></mesh>
  </group>;
}

function DataFilaments() {
  const points = useMemo(() => {
    const vector: number[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const x = Math.cos(a) * 1.3;
      const y = Math.sin(a) * 1.3;
      vector.push(x, y, 0, x * 1.38, y * 1.38, 0.2, x * 1.72, y * 1.72, 0.05);
    }
    return new Float32Array(vector);
  }, []);
  return <lineSegments>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry>
    <lineBasicMaterial color="#35d98a" transparent opacity={0.58} />
  </lineSegments>;
}

function CreationSystem({ progress, reducedMotion }: SceneProps) {
  const center = useRef<THREE.Group>(null);
  const frame = useRef<THREE.Group>(null);
  const modules = useRef<THREE.Group>(null);
  const stageLight = useRef<THREE.PointLight>(null);
  useFrame((state, delta) => {
    const p = progress.current;
    applyPose(center.current, centerPoses, p);
    applyPose(frame.current, framePoses, p);
    if (!reducedMotion) {
      if (center.current) center.current.rotation.y += delta * 0.045;
      if (frame.current) frame.current.rotation.y += delta * 0.02;
      if (modules.current) modules.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.11) * 0.035;
    }
    if (stageLight.current) {
      const activate = THREE.MathUtils.smoothstep(p, 0.68, 0.92);
      stageLight.current.intensity = 7 + activate * 8;
      stageLight.current.color.set(activate > 0.55 ? "#35d98a" : "#20bfb0");
    }
  });
  return <>
    <group ref={center}><ProjectSeed progress={progress} reducedMotion={reducedMotion} /></group>
    <group ref={frame}><ArchitecturalFrame reducedMotion={reducedMotion} /></group>
    <group ref={modules}>
      <DevelopmentEngine reducedMotion={reducedMotion} />
      <DataFilaments />
    </group>
    <mesh position={[0, -2.7, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.15, 2.17, 100]} />
      <meshBasicMaterial color="#35d98a" transparent opacity={0.24} side={THREE.DoubleSide} />
    </mesh>
    <pointLight ref={stageLight} position={[0.2, 1, 2.7]} color="#20bfb0" intensity={7} distance={7} />
  </>;
}

function CameraRig({ progress, reducedMotion }: SceneProps) {
  const { camera, pointer } = useThree();
  useFrame((_, delta) => {
    const pullback = THREE.MathUtils.smoothstep(progress.current, 0.76, 1);
    const parallax = reducedMotion ? 0 : 0.22;
    const targetX = pointer.x * parallax + THREE.MathUtils.smoothstep(progress.current, 0.18, 0.48) * 0.25;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * parallax, 2.2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 9.1 + pullback * 1.8, 2, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ progress, reducedMotion }: SceneProps) {
  return <>
    <color attach="background" args={["#090d0b"]} />
    <fog attach="fog" args={["#090d0b", 12, 27]} />
    <ambientLight intensity={0.55} />
    <directionalLight position={[-4, 5, 6]} color="#e0f4ea" intensity={1.4} />
    <directionalLight position={[4, -2, -4]} color="#16a05a" intensity={0.75} />
    <CreationSystem progress={progress} reducedMotion={reducedMotion} />
    <CameraRig progress={progress} reducedMotion={reducedMotion} />
  </>;
}

export default function WorkflowWorld({ progress, reducedMotion, active }: Props) {
  return <Canvas
    className="!absolute inset-0"
    dpr={getAdaptiveDpr()}
    frameloop={active ? "always" : "never"}
    camera={{ position: [0, 0, 9.1], fov: 40, near: 0.1, far: 50 }}
    gl={{ alpha: false, antialias: false, powerPreference: "low-power" }}
    fallback={<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_58%_48%,rgba(22,160,90,.2),transparent_64%)]" aria-label="ONEXA digital creation environment" />}
  >
    <Scene progress={progress} reducedMotion={reducedMotion} />
  </Canvas>;
}
