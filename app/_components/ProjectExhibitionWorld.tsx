"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { getAdaptiveDpr } from "./useSceneVisibility";
import type { ExhibitionProject } from "./SelectedWork";

type WorldProps = {
  progress: { current: number };
  reducedMotion: boolean;
  projects: ExhibitionProject[];
  active: boolean;
};

const stationSpacing = 22;

function focusAt(progress: number, index: number, range: number) {
  const proximity = THREE.MathUtils.clamp(1 - Math.abs(progress - index) / range, 0, 1);
  return THREE.MathUtils.smoothstep(0, 1, proximity);
}

const projectTextures = new Map<string, THREE.Texture>();
const projectTextureLoads = new Map<string, Promise<THREE.Texture>>();

function loadProjectTexture(source: string) {
  const cached = projectTextures.get(source);
  if (cached) return Promise.resolve(cached);
  const pending = projectTextureLoads.get(source);
  if (pending) return pending;

  const request = new Promise<THREE.Texture>((resolve, reject) => {
    new THREE.TextureLoader().load(source, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      projectTextures.set(source, texture);
      projectTextureLoads.delete(source);
      resolve(texture);
    }, undefined, (error) => {
      projectTextureLoads.delete(source);
      reject(error);
    });
  });
  projectTextureLoads.set(source, request);
  return request;
}

function ScreenArtwork({ image, activation, width, height }: { image: string; activation: { current: number }; width: number; height: number }) {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (texture) console.log("screen material state", image, Boolean(material.current?.map), material.current?.opacity);
  }, [image, texture]);
  useEffect(() => {
    let cancelled = false;
    loadProjectTexture(image).then((loadedTexture) => {
      console.log("project panel texture ready", image, loadedTexture.image.width, loadedTexture.image.height);
      if (!cancelled) setTexture(loadedTexture);
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, [image]);
  useFrame(() => {
    const focus = activation.current;
    if (material.current) material.current.opacity = texture ? 0.76 + focus * 0.24 : 0;
  });
  return <mesh position={[0, 0, 0.112]}>
    <planeGeometry args={[width - 0.32, height - 0.3]} />
    <meshBasicMaterial ref={material} map={texture} color="#ffffff" transparent opacity={0} toneMapped={false} />
  </mesh>;
}

function SupportingScreen({ index, projectIndex, progress, project, reducedMotion }: {
  index: number;
  projectIndex: number;
  progress: { current: number };
  project: ExhibitionProject;
  reducedMotion: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const trim = useRef<THREE.MeshStandardMaterial>(null);
  const activation = useRef(0);
  const placement = screenLayout[index % screenLayout.length];
  const [x, y, z, width, height, rotation] = placement;

  useFrame((state) => {
    if (!root.current) return;
    const stagger = (index % 4) * 0.035;
    const focus = focusAt(progress.current - stagger, projectIndex, project.revealRange);
    activation.current = focus;
    root.current.scale.setScalar(0.86 + focus * 0.14);
    root.current.position.y = y + (reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.42 + index) * 0.025);
    if (trim.current) trim.current.emissiveIntensity = 0.06 + focus * 0.62;
  });

  return <group ref={root} position={[x, y, z]} rotation={[0, rotation, 0]}>
    <mesh castShadow><boxGeometry args={[width, height, 0.18]} /><meshPhysicalMaterial color="#0a121b" metalness={0.82} roughness={0.22} clearcoat={0.9} /></mesh>
    <mesh position={[0, 0, 0.097]}><planeGeometry args={[width - 0.12, height - 0.12]} /><meshBasicMaterial color="#0b1824" /></mesh>
    <ScreenArtwork image={project.image} activation={activation} width={width} height={height} />
    {[
      [0, height / 2, width, 0.035], [0, -height / 2, width, 0.035],
      [-width / 2, 0, 0.035, height], [width / 2, 0, 0.035, height],
    ].map(([px, py, sx, sy], edge) => <mesh key={edge} position={[px, py, 0.12]}>
      <planeGeometry args={[sx, sy]} />
      <meshStandardMaterial ref={edge === 0 ? trim : undefined} color={project.accent} emissive={project.accent} emissiveIntensity={0.1} transparent opacity={0.55} toneMapped={false} />
    </mesh>)}
  </group>;
}

const screenLayout: [number, number, number, number, number, number][] = [
  [-8.8, 7.25, -7.2, 3.15, 1.75, -0.12], [8.5, 7.45, -8.2, 3.0, 1.72, 0.13],
  [-9.7, 4.05, -3.5, 2.55, 1.48, 0.16], [9.2, 4.15, -4.5, 2.65, 1.52, -0.17],
  [-6.3, 8.1, 1.6, 2.35, 1.42, -0.1], [6.4, 8.0, -10.2, 2.4, 1.44, 0.11],
  [-6.4, 2.75, 5.2, 2.25, 1.34, 0.12], [6.8, 3.0, 4.2, 2.35, 1.4, -0.12],
];

function MainDisplay({ project, index, progress }: { project: ExhibitionProject; index: number; progress: { current: number } }) {
  const root = useRef<THREE.Group>(null);
  const glass = useRef<THREE.MeshPhysicalMaterial>(null);
  const edge = useRef<THREE.MeshStandardMaterial>(null);
  const artwork = useRef<THREE.MeshBasicMaterial>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const activation = useRef(0);
  const [width, height] = [12.3, 6.3];
  useEffect(() => {
    let cancelled = false;
    loadProjectTexture(project.image).then((loadedTexture) => {
      console.log("main project texture ready", project.image, loadedTexture.image.width, loadedTexture.image.height);
      if (!cancelled) setTexture(loadedTexture);
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, [project.image]);

  useFrame((state) => {
    const focus = focusAt(progress.current, index, project.revealRange);
    activation.current = focus;
    if (glass.current) glass.current.opacity = 0.28 + focus * 0.24;
    if (edge.current) edge.current.emissiveIntensity = 0.12 + focus * (0.92 + Math.sin(state.clock.elapsedTime * 1.1) * 0.08);
    if (artwork.current) artwork.current.opacity = texture ? 0.3 + focus * 0.7 : 0;
    if (root.current) root.current.scale.setScalar(0.98 + focus * 0.02);
  });

  return <group ref={root} position={[0, 5.65, -6.15]}>
    <mesh castShadow><boxGeometry args={[width, height, 0.22]} /><meshPhysicalMaterial ref={glass} color="#152b3a" emissive="#16445a" emissiveIntensity={0.55} transparent opacity={0.52} metalness={0.42} roughness={0.18} clearcoat={1} side={THREE.DoubleSide} /></mesh>
    {[
      [0, height / 2, width, 0.04], [0, -height / 2, width, 0.04],
      [-width / 2, 0, 0.04, height], [width / 2, 0, 0.04, height],
    ].map(([x, y, w, h], i) => <mesh key={i} position={[x, y, 0.13]}>
      <planeGeometry args={[w, h]} /><meshStandardMaterial ref={i === 0 ? edge : undefined} color={project.accent} emissive={project.accent} emissiveIntensity={0.8} toneMapped={false} />
    </mesh>)}
    <mesh position={[-width / 2 + 0.22, height / 2 - 0.2, 0.15]}><boxGeometry args={[0.12, 0.12, 0.025]} /><meshBasicMaterial color={project.accent} toneMapped={false} /></mesh>
    <mesh position={[width / 2 - 0.22, height / 2 - 0.2, 0.15]}><boxGeometry args={[0.12, 0.12, 0.025]} /><meshBasicMaterial color={project.secondary} toneMapped={false} /></mesh>
    <mesh position={[0, 0, 0.145]}>
      <planeGeometry args={[(height - 0.16) * (2752 / 1536), height - 0.16]} />
      <meshBasicMaterial ref={artwork} map={texture} transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  </group>;
}

function ProjectVisualization({ project, index, progress, reducedMotion }: {
  project: ExhibitionProject; index: number; progress: { current: number }; reducedMotion: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const phase = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!root.current) return;
    const focus = focusAt(progress.current, index, project.revealRange);
    root.current.visible = focus > 0.012;
    root.current.scale.setScalar(0.72 + focus * 0.28);
    if (phase.current && !reducedMotion) phase.current.rotation.y = state.clock.elapsedTime * 0.11;
  });

  const nodePositions = project.visualization === "business-network"
    ? [[0, 1.9, 0], [-1.35, 0.8, 0.45], [1.45, 0.85, -0.15], [-0.75, 2.9, -0.3], [0.85, 3.05, 0.35], [-2.1, 2, -0.5], [2.15, 2.1, 0.4], [0, 1.1, 1.1]]
    : project.visualization === "medical-intelligence"
      ? [[0, 1.95, 0], [-1.3, 0.95, 0], [1.3, 0.95, 0], [-0.75, 2.95, 0], [0.75, 2.95, 0], [0, 3.7, 0], [-2.05, 2.1, 0], [2.05, 2.1, 0]]
      : project.visualization === "financial-globe"
        ? [[0, 1.85, 0], [-1.4, 1.5, 0], [1.4, 2.2, 0], [-0.7, 2.9, 0], [0.85, 0.9, 0], [0, 3.05, 0], [-2, 2.3, 0], [2, 1.1, 0]]
        : [[0, 1.9, 0], [-1.65, 0.8, 0], [1.55, 0.8, 0], [-1.2, 2.85, 0], [1.2, 2.85, 0], [0, 3.7, 0], [-2.35, 1.9, 0], [2.35, 1.95, 0]];

  return <group ref={root} position={[0, -0.55, 0.15]}>
    <group ref={phase}>
      {project.visualization === "financial-globe" ? <>
        <mesh position={[0, 2.15, 0]}>
          <sphereGeometry args={[1.35, 32, 24]} /><meshPhysicalMaterial color="#15395a" emissive={project.accent} emissiveIntensity={0.55} metalness={0.74} roughness={0.28} transparent opacity={0.78} />
        </mesh>
        <mesh position={[0, 2.15, 0]}><sphereGeometry args={[1.39, 24, 16]} /><meshBasicMaterial color={project.accent} wireframe transparent opacity={0.25} /></mesh>
        <mesh position={[0, 2.15, 0]} rotation={[0.6, 0.3, 0]}><torusGeometry args={[1.8, 0.022, 8, 96]} /><meshBasicMaterial color={project.accent} transparent opacity={0.9} toneMapped={false} /></mesh>
        <mesh position={[0, 2.15, 0]} rotation={[1.15, -0.6, 0]}><torusGeometry args={[2.05, 0.012, 8, 96]} /><meshBasicMaterial color={project.secondary} transparent opacity={0.65} toneMapped={false} /></mesh>
        {Array.from({ length: 11 }, (_, i) => <mesh key={i} position={[-1.6 + i * 0.31, 0.55 + ((i * 7) % 5) * 0.16, 1.15]}><boxGeometry args={[0.1, 0.45 + ((i * 11) % 8) * 0.11, 0.1]} /><meshStandardMaterial color={i % 3 === 0 ? project.secondary : project.accent} emissive={project.accent} emissiveIntensity={0.7} metalness={0.5} /></mesh>)}
      </> : project.visualization === "knowledge-graph" ? <>
        {nodePositions.map(([x, y, z], i) => <group key={i} position={[x, y, z]} rotation={[0, (i % 2 ? 0.16 : -0.16), i % 2 ? -0.08 : 0.08]}>
          <mesh castShadow><boxGeometry args={[0.55, 0.72, 0.12]} /><meshPhysicalMaterial color="#122235" emissive={i === 0 ? project.accent : "#1d5571"} emissiveIntensity={i === 0 ? 0.64 : 0.3} metalness={0.5} roughness={0.25} transparent opacity={0.94} /></mesh>
          <mesh position={[0, 0.18, 0.071]}><planeGeometry args={[0.35, 0.035]} /><meshBasicMaterial color={project.accent} /></mesh>
          {[0, 1, 2].map((row) => <mesh key={row} position={[-0.02, 0.07 - row * 0.1, 0.072]}><planeGeometry args={[0.31 - row * 0.035, 0.012]} /><meshBasicMaterial color={project.secondary} transparent opacity={0.65} /></mesh>)}
        </group>)}
        {nodePositions.slice(1).map(([x, y, z], i) => <Line key={i} points={[[0, 1.95, 0], [x, y, z]]} color={project.accent} transparent opacity={0.48} lineWidth={1} />)}
      </> : project.visualization === "medical-intelligence" ? <>
        <mesh position={[0, 2, 0]}><icosahedronGeometry args={[0.88, 2]} /><meshPhysicalMaterial color="#1a4355" emissive={project.accent} emissiveIntensity={0.65} metalness={0.45} roughness={0.23} transparent opacity={0.8} /></mesh>
        <mesh position={[0, 2, 0]}><icosahedronGeometry args={[1.02, 1]} /><meshBasicMaterial color={project.secondary} wireframe transparent opacity={0.35} /></mesh>
        <mesh position={[0, 2, 0]} rotation={[0.4, 0.6, 0]}><torusGeometry args={[1.45, 0.022, 8, 80]} /><meshBasicMaterial color={project.accent} transparent opacity={0.9} toneMapped={false} /></mesh>
        {nodePositions.slice(1).map(([x, y, z], i) => <group key={i} position={[x, y, z]}>
          <mesh><sphereGeometry args={[0.13 + (i % 3) * 0.025, 16, 12]} /><meshStandardMaterial color={project.secondary} emissive={project.accent} emissiveIntensity={0.9} /></mesh>
          <Line points={[[0, 2, 0], [x, y, z]]} color={project.accent} transparent opacity={0.55} lineWidth={1} />
        </group>)}
      </> : <>
        <mesh position={[0, 2, 0]}><icosahedronGeometry args={[0.48, 1]} /><meshPhysicalMaterial color="#183d43" emissive={project.accent} emissiveIntensity={1.2} metalness={0.65} roughness={0.2} /></mesh>
        {nodePositions.map(([x, y, z], i) => <group key={i} position={[x, y, z]}>
          <mesh><sphereGeometry args={[i === 0 ? 0.23 : 0.105 + (i % 3) * 0.025, 16, 12]} /><meshStandardMaterial color={i % 3 ? project.accent : project.secondary} emissive={i % 3 ? project.accent : project.secondary} emissiveIntensity={1.2} metalness={0.4} roughness={0.2} /></mesh>
        </group>)}
        {nodePositions.slice(1).map(([x, y, z], i) => <Line key={i} points={[[0, 2, 0], [x, y, z]]} color={i % 3 ? project.accent : project.secondary} transparent opacity={0.75} lineWidth={1} />)}
        <mesh position={[0, 2, 0]} rotation={[0.7, 0.2, 0]}><torusGeometry args={[1.1, 0.018, 8, 72]} /><meshBasicMaterial color={project.accent} transparent opacity={0.9} toneMapped={false} /></mesh>
      </>}
    </group>
  </group>;
}

function ProjectionPlatform({ project, index, progress, reducedMotion }: { project: ExhibitionProject; index: number; progress: { current: number }; reducedMotion: boolean }) {
  const rings = useRef<THREE.Group>(null);
  const beam = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    const focus = focusAt(progress.current, index, project.revealRange);
    if (rings.current) rings.current.scale.setScalar(0.65 + focus * 0.35);
    if (beam.current) beam.current.opacity = focus * 0.12;
    if (rings.current && focus > 0.01) rings.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.025;
  });
  return <group>
    <mesh position={[0, -0.98, 0.1]} rotation={[-Math.PI / 2, 0, 0]}><cylinderGeometry args={[2.15, 2.4, 0.22, 48]} /><meshStandardMaterial color="#0b131a" metalness={0.9} roughness={0.2} /></mesh>
    <group ref={rings} position={[0, -0.84, 0.1]}>
      {[2.4, 1.85, 1.22].map((radius, i) => <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]}><torusGeometry args={[radius, i === 0 ? 0.024 : 0.012, 8, 96]} /><meshBasicMaterial color={i === 1 ? project.secondary : project.accent} transparent opacity={0.68} toneMapped={false} /></mesh>)}
    </group>
    <mesh position={[0, 1.25, 0.08]}>
      <cylinderGeometry args={[0.15, 1.85, 4.2, 40, 1, true]} />
      <meshBasicMaterial ref={beam} color={project.accent} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
    <ProjectVisualization project={project} index={index} progress={progress} reducedMotion={reducedMotion} />
  </group>;
}

function ProjectZone({ project, index, progress, reducedMotion }: {
  project: ExhibitionProject; index: number; progress: { current: number }; reducedMotion: boolean;
}) {
  const x = index * stationSpacing;
  const glow = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    const focus = focusAt(progress.current, index, project.revealRange);
    if (glow.current) glow.current.intensity = 4 + focus * 22;
    if (glow.current && !reducedMotion) glow.current.intensity += Math.sin(state.clock.elapsedTime * 0.8 + index) * focus * 0.45;
  });

  return <group position={[x, 0, 0]}>
    <pointLight ref={glow} position={[0, 4.7, -3.7]} color={project.accent} intensity={5} distance={19} decay={1.8} />
    <MainDisplay project={project} index={index} progress={progress} />
    {project.supportingDisplays.map((display, i) => <SupportingScreen key={`${project.number}-${display.label}`} index={i} projectIndex={index} progress={progress} project={project} reducedMotion={reducedMotion} />)}
    <ProjectionPlatform project={project} index={index} progress={progress} reducedMotion={reducedMotion} />
    <mesh position={[0, 0.03, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[3.1, 64]} /><meshBasicMaterial color={project.accent} transparent opacity={0.045} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
    <mesh position={[0, -0.994, -3.4]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[15, 5]} /><meshBasicMaterial color={project.secondary} transparent opacity={0.055} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
    <mesh position={[0, 8.9, -2.2]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5.6, 0.035]} /><meshBasicMaterial color={project.accent} transparent opacity={0.28} toneMapped={false} />
    </mesh>
  </group>;
}

function Corridor({ reducedMotion }: { reducedMotion: boolean }) {
  const particles = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(3 * 620);
    for (let i = 0; i < 620; i++) {
      values[i * 3] = -18 + ((i * 47) % 104);
      values[i * 3 + 1] = 0.1 + ((i * 31) % 840) / 100;
      values[i * 3 + 2] = -10 + ((i * 23) % 200) / 10;
    }
    return values;
  }, []);
  useFrame((state) => {
    if (!particles.current || reducedMotion) return;
    particles.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.025) * 0.012;
  });

  return <group>
    <mesh position={[32, -1.22, 0]} receiveShadow>
      <boxGeometry args={[112, 0.38, 24]} /><meshPhysicalMaterial color="#202b38" metalness={0.42} roughness={0.28} clearcoat={1} clearcoatRoughness={0.16} />
    </mesh>
    <mesh position={[32, -1.015, 0]}>
      <planeGeometry args={[110, 22]} /><meshBasicMaterial color="#344050" transparent opacity={0.14} side={THREE.DoubleSide} />
    </mesh>

    {[-10.55, 10.55].map((z, i) => <group key={z}>
      <mesh position={[32, 4.35, z]}><boxGeometry args={[110, 8.8, 0.12]} /><meshPhysicalMaterial color={i ? "#152432" : "#182432"} transparent opacity={0.16} metalness={0.36} roughness={0.24} clearcoat={0.8} /></mesh>
      <mesh position={[32, 1.1, z + (z < 0 ? 0.09 : -0.09)]}><boxGeometry args={[110, 0.045, 0.08]} /><meshBasicMaterial color={i ? "#70B7FF" : "#00A8FF"} transparent opacity={0.62} toneMapped={false} /></mesh>
      {Array.from({ length: 21 }, (_, panel) => <mesh key={panel} position={[-20 + panel * 5.2, 4.35, z + (z < 0 ? -0.1 : 0.1)]}><boxGeometry args={[0.055, 8.8, 0.06]} /><meshBasicMaterial color="#9ec8de" transparent opacity={0.3} /></mesh>)}
    </group>)}

    {[-8.6, 8.6].map((z) => <mesh key={z} position={[32, 9.05, z]}><boxGeometry args={[110, 0.35, 0.32]} /><meshStandardMaterial color="#263747" metalness={0.74} roughness={0.24} emissive="#274258" emissiveIntensity={0.18} /></mesh>)}
    {Array.from({ length: 17 }, (_, i) => {
      const x = -12 + i * 5.6;
      return <group key={i} position={[x, 4.2, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[7.5, 0.095, 8, 80]} /><meshStandardMaterial color="#394b62" metalness={0.78} roughness={0.24} emissive="#293e5c" emissiveIntensity={0.14} /></mesh>
        <mesh position={[0, 0, -10.15]}><boxGeometry args={[0.22, 8.4, 0.22]} /><meshStandardMaterial color="#283948" metalness={0.72} roughness={0.3} /></mesh>
        <mesh position={[0, 0, 10.15]}><boxGeometry args={[0.22, 8.4, 0.22]} /><meshStandardMaterial color="#283948" metalness={0.72} roughness={0.3} /></mesh>
      </group>;
    })}

    {Array.from({ length: 26 }, (_, i) => {
      const x = -17 + i * 4.25;
      return <group key={i} position={[x, 0, 0]}>
        <mesh position={[0, 9.34, -8.4]}><boxGeometry args={[0.18, 0.62, 0.18]} /><meshStandardMaterial color="#3b5060" metalness={0.72} roughness={0.22} /></mesh>
        <mesh position={[0, 9.34, 8.4]}><boxGeometry args={[0.18, 0.62, 0.18]} /><meshStandardMaterial color="#3b5060" metalness={0.72} roughness={0.22} /></mesh>
        <mesh position={[0, 9.0, 0]}><boxGeometry args={[0.12, 0.12, 16.8]} /><meshBasicMaterial color="#c3d8e8" transparent opacity={0.34} /></mesh>
      </group>;
    })}

    {[-1, 1].map((side) => <group key={side}>
      <mesh position={[32, -0.98, side * 5.6]}><boxGeometry args={[110, 0.025, 0.045]} /><meshBasicMaterial color={side < 0 ? "#00A8FF" : "#70B7FF"} transparent opacity={0.68} toneMapped={false} /></mesh>
      <mesh position={[32, -0.98, side * 9.4]}><boxGeometry args={[110, 0.025, 0.045]} /><meshBasicMaterial color="#c6d9e6" transparent opacity={0.42} toneMapped={false} /></mesh>
    </group>)}

    <points ref={particles}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#d0edff" size={0.026} transparent opacity={0.46} sizeAttenuation depthWrite={false} />
    </points>
    <fog attach="fog" args={["#111a29", 20, 76]} />
  </group>;
}

function CameraRig({ progress, reducedMotion }: { progress: { current: number }; reducedMotion: boolean }) {
  const { camera, size } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const destination = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, delta) => {
    const compact = size.width < 700;
    const x = progress.current * stationSpacing - 8;
    const depth = compact ? 10.5 : 12.8;
    destination.set(x, compact ? 3.65 : 4.15, depth + (reducedMotion ? 0 : Math.sin(progress.current * Math.PI) * 0.36));
    const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 5.5);
    camera.position.lerp(destination, ease);
    target.set(x + 8, compact ? 4.45 : 4.55, -5.8);
    camera.lookAt(target);
  });
  return null;
}

export default function ProjectExhibitionWorld({ progress, reducedMotion, projects, active }: WorldProps) {
  useEffect(() => {
    console.log("project exhibition mounted", projects.length);
    return () => {
      projectTextures.forEach((texture) => texture.dispose());
      projectTextures.clear();
      projectTextureLoads.clear();
    };
  }, [projects.length]);

  return <Canvas camera={{ position: [-8, 4.15, 12.8], fov: 40, near: 0.1, far: 130 }} dpr={getAdaptiveDpr()} frameloop={active ? "always" : "never"} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}>
    <color attach="background" args={["#101925"]} />
    <ambientLight intensity={0.86} />
    <hemisphereLight args={["#eff7ff", "#1b2638", 1.05]} />
    <directionalLight position={[0, 12, 7]} intensity={3.1} color="#e8f4ff" />
    <directionalLight position={[0, 8, -6]} intensity={2} color="#C4D7F3" />
    <pointLight position={[-5, 8, 0]} intensity={52} distance={34} color="#c1dcff" />
    <Corridor reducedMotion={reducedMotion} />
    {projects.map((project, index) => <ProjectZone key={project.number} project={project} index={index} progress={progress} reducedMotion={reducedMotion} />)}
    <CameraRig progress={progress} reducedMotion={reducedMotion} />
  </Canvas>;
}
