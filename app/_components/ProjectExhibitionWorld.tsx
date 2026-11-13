"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { DisplayKind, ExhibitionProject, SupportingDisplay } from "./SelectedWork";

type WorldProps = {
  progress: { current: number };
  reducedMotion: boolean;
  projects: ExhibitionProject[];
  activeIndex: number;
};

const stationSpacing = 22;

function focusAt(progress: number, index: number, range: number) {
  const proximity = THREE.MathUtils.clamp(1 - Math.abs(progress - index) / range, 0, 1);
  return THREE.MathUtils.smoothstep(0, 1, proximity);
}

function makeDisplayTexture(label: string, kind: DisplayKind, accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#08121d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const wash = ctx.createLinearGradient(0, 0, 320, 200);
  wash.addColorStop(0, `${accent}20`);
  wash.addColorStop(1, "#09121a00");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, 320, 200);
  ctx.fillStyle = "#dceef4";
  ctx.font = "600 14px Arial, sans-serif";
  ctx.fillText(label.toUpperCase(), 15, 23, 230);
  ctx.fillStyle = accent;
  ctx.fillRect(15, 34, 42, 2);
  ctx.strokeStyle = "#b8d5e322";
  ctx.lineWidth = 1;
  for (let y = 57; y < 185; y += 28) {
    ctx.beginPath(); ctx.moveTo(15, y); ctx.lineTo(305, y); ctx.stroke();
  }

  if (kind === "chart" || kind === "analytics" || kind === "network") {
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.86;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      const x = 22 + i * 24;
      const seed = label.length * 17 + i * 37;
      const y = 159 - (Math.sin(seed) * 0.5 + 0.5) * 76;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = `${accent}44`;
    for (let i = 0; i < 6; i++) {
      const height = 18 + ((i * 19 + label.length * 7) % 53);
      ctx.fillRect(26 + i * 43, 178 - height, 15, height);
    }
  } else {
    ctx.fillStyle = `${accent}24`;
    for (let i = 0; i < 4; i++) {
      const x = 16 + (i % 2) * 143;
      const y = 53 + Math.floor(i / 2) * 56;
      ctx.fillRect(x, y, 130, 44);
      ctx.fillStyle = "#c4d8df";
      ctx.globalAlpha = 0.75;
      ctx.fillRect(x + 9, y + 11, 78 + (i % 2) * 18, 3);
      ctx.globalAlpha = 0.38;
      ctx.fillRect(x + 9, y + 21, 100, 2);
      ctx.fillRect(x + 9, y + 29, 62, 2);
      ctx.globalAlpha = 1;
      ctx.fillStyle = `${accent}24`;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  return texture;
}

function ScreenArtwork({ display, accent, activation, width, height }: { display: SupportingDisplay; accent: string; activation: { current: number }; width: number; height: number }) {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useMemo(() => makeDisplayTexture(display.label, display.kind, accent), [display.label, display.kind, accent]);
  useEffect(() => () => texture?.dispose(), [texture]);
  useFrame(() => {
    if (material.current) material.current.opacity = 0.2 + activation.current * 0.8;
  });
  if (!texture) return null;
  return <mesh position={[0, 0, 0.112]}>
    <planeGeometry args={[width - 0.32, height - 0.3]} />
    <meshBasicMaterial ref={material} map={texture} transparent opacity={0.2} toneMapped={false} />
  </mesh>;
}

function SupportingScreen({ display, index, projectIndex, progress, project, reducedMotion }: {
  display: SupportingDisplay;
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
    <mesh position={[0, 0, 0.097]}><planeGeometry args={[width - 0.12, height - 0.12]} /><meshBasicMaterial color="#07101a" /></mesh>
    <ScreenArtwork display={display} accent={project.accent} activation={activation} width={width} height={height} />
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

function makeMainDisplayTexture(project: ExhibitionProject) {
  const canvas = document.createElement("canvas");
  canvas.width = 1100;
  canvas.height = 560;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const accent = project.accent;
  const bg = ctx.createLinearGradient(0, 0, 1100, 560);
  bg.addColorStop(0, "#142a38"); bg.addColorStop(0.62, "#0d1d2a"); bg.addColorStop(1, "#18283a");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 1100, 560);
  ctx.strokeStyle = `${accent}99`; ctx.lineWidth = 2; ctx.strokeRect(2, 2, 1096, 556);
  ctx.fillStyle = accent; ctx.font = "600 17px Arial, sans-serif";
  ctx.fillText("ONEXA   /   PROJECT EXHIBITION", 38, 45);
  ctx.textAlign = "right"; ctx.fillText(`LIVE SYSTEM   /   ${project.number}`, 1060, 45); ctx.textAlign = "left";
  ctx.strokeStyle = "#b9d2de44"; ctx.beginPath(); ctx.moveTo(38, 65); ctx.lineTo(1062, 65); ctx.stroke();
  ctx.fillStyle = accent; ctx.font = "600 15px Arial, sans-serif"; ctx.fillText(`${project.number}   /   ${project.category.toUpperCase()}`.slice(0, 66), 40, 105);
  ctx.fillStyle = "#f1f7fa"; ctx.font = "600 44px Arial, sans-serif"; ctx.fillText(project.title, 38, 160);
  ctx.fillStyle = "#b4c4cc"; ctx.font = "20px Arial, sans-serif";
  const words = project.description.split(" "); let line = ""; let y = 202;
  for (const word of words) { const test = line ? `${line} ${word}` : word; if (ctx.measureText(test).width > 500) { ctx.fillText(line, 40, y); line = word; y += 28; if (y > 282) break; } else line = test; }
  if (line && y <= 282) ctx.fillText(line, 40, y);
  ctx.font = "14px Arial, sans-serif"; let chipX = 40;
  for (const chip of project.technologies.slice(0, 5)) { const w = Math.min(ctx.measureText(chip).width + 22, 190); ctx.globalAlpha = 0.18; ctx.fillStyle = accent; ctx.fillRect(chipX, 306, w, 30); ctx.globalAlpha = 0.75; ctx.strokeStyle = accent; ctx.strokeRect(chipX, 306, w, 30); ctx.globalAlpha = 1; ctx.fillStyle = "#d2e2e9"; ctx.fillText(chip, chipX + 11, 326, w - 18); chipX += w + 9; if (chipX > 525) break; }
  const panel = ctx.createLinearGradient(590, 90, 1060, 470); panel.addColorStop(0, "#15303d"); panel.addColorStop(1, "#17283a");
  ctx.fillStyle = panel; ctx.fillRect(590, 90, 470, 380); ctx.strokeStyle = `${accent}99`; ctx.strokeRect(590, 90, 470, 380);
  ctx.fillStyle = "#d8e7ed"; ctx.font = "600 14px Arial, sans-serif"; ctx.fillText(project.preview.toUpperCase().slice(0, 42), 610, 120);
  ctx.fillStyle = accent; ctx.textAlign = "right"; ctx.fillText("●  ●  ●", 1040, 120); ctx.textAlign = "left";
  const labels = ["SYSTEM OVERVIEW", "ACTIVE SIGNALS", "PROJECT DATA"]; const values = ["92.4%", "08.6k", "ACTIVE"];
  for (let i = 0; i < 3; i++) { const x = 610 + i * 142; ctx.fillStyle = "#10212b"; ctx.fillRect(x, 140, 130, 64); ctx.strokeStyle = "#b9d2de33"; ctx.strokeRect(x, 140, 130, 64); ctx.fillStyle = "#8faab5"; ctx.font = "10px Arial, sans-serif"; ctx.fillText(labels[i], x + 9, 158); ctx.fillStyle = i === 1 ? project.secondary : "#e7f5f8"; ctx.font = "20px Arial, sans-serif"; ctx.fillText(values[i], x + 9, 190); }
  ctx.fillStyle = "#102230"; ctx.fillRect(610, 220, 430, 220); ctx.strokeStyle = "#c2e0ea44";
  for (let gy = 254; gy < 430; gy += 42) { ctx.beginPath(); ctx.moveTo(610, gy); ctx.lineTo(1040, gy); ctx.stroke(); }
  [48,79,62,112,91,132,105,152,124,171,139,184].forEach((height, i) => { const gradient = ctx.createLinearGradient(0, 430-height, 0, 430); gradient.addColorStop(0, i % 4 === 0 ? project.secondary : accent); gradient.addColorStop(1, `${accent}22`); ctx.fillStyle = gradient; ctx.fillRect(630 + i * 33, 430 - height, 22, height); });
  ctx.fillStyle = "#c4d8df"; ctx.font = "600 13px Arial, sans-serif"; ctx.fillText("CAPABILITIES", 40, 390); ctx.font = "15px Arial, sans-serif";
  project.features.slice(0, 5).forEach((feature, i) => { const fy = 422 + i * 25; ctx.fillStyle = accent; ctx.fillText("+", 42, fy); ctx.fillStyle = "#d2e1e7"; ctx.fillText(feature, 62, fy, 485); });
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 2; return texture;
}
function MainDisplay({ project, active }: { project: ExhibitionProject; active: boolean }) {
  const root = useRef<THREE.Group>(null);
  const glass = useRef<THREE.MeshPhysicalMaterial>(null);
  const edge = useRef<THREE.MeshStandardMaterial>(null);
  const [width, height] = [12.3, 6.3];
  const texture = useMemo(() => makeMainDisplayTexture(project), [project]);
  useEffect(() => () => texture?.dispose(), [texture]);

  useFrame((state) => {
    if (glass.current) glass.current.opacity = active ? 0.66 : 0.34;
    if (edge.current) edge.current.emissiveIntensity = active ? 0.95 + Math.sin(state.clock.elapsedTime * 1.1) * 0.08 : 0.22;
  });

  return <group ref={root} position={[0, 5.65, -6.15]}>
    <mesh castShadow><boxGeometry args={[width, height, 0.22]} /><meshPhysicalMaterial ref={glass} color="#11202b" emissive="#122d3d" emissiveIntensity={0.34} transparent opacity={0.66} metalness={0.55} roughness={0.2} clearcoat={0.9} side={THREE.DoubleSide} /></mesh>
    {[
      [0, height / 2, width, 0.04], [0, -height / 2, width, 0.04],
      [-width / 2, 0, 0.04, height], [width / 2, 0, 0.04, height],
    ].map(([x, y, w, h], i) => <mesh key={i} position={[x, y, 0.13]}>
      <planeGeometry args={[w, h]} /><meshStandardMaterial ref={i === 0 ? edge : undefined} color={project.accent} emissive={project.accent} emissiveIntensity={0.8} toneMapped={false} />
    </mesh>)}
    <mesh position={[-width / 2 + 0.22, height / 2 - 0.2, 0.15]}><boxGeometry args={[0.12, 0.12, 0.025]} /><meshBasicMaterial color={project.accent} toneMapped={false} /></mesh>
    <mesh position={[width / 2 - 0.22, height / 2 - 0.2, 0.15]}><boxGeometry args={[0.12, 0.12, 0.025]} /><meshBasicMaterial color={project.secondary} toneMapped={false} /></mesh>
    {texture && <mesh position={[0, 0, 0.145]}>
      <planeGeometry args={[width - 0.16, height - 0.16]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>}
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
    if (beam.current) beam.current.opacity = focus * 0.075;
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

function ProjectZone({ project, index, progress, activeIndex, reducedMotion }: {
  project: ExhibitionProject; index: number; progress: { current: number }; activeIndex: number; reducedMotion: boolean;
}) {
  const x = index * stationSpacing;
  const glow = useRef<THREE.PointLight>(null);
  const current = useRef(0);
  useFrame((state) => {
    const focus = focusAt(progress.current, index, project.revealRange);
    current.current = focus;
    if (glow.current) glow.current.intensity = 2 + focus * 18;
    if (glow.current && !reducedMotion) glow.current.intensity += Math.sin(state.clock.elapsedTime * 0.8 + index) * focus * 0.45;
  });

  return <group position={[x, 0, 0]}>
    <pointLight ref={glow} position={[0, 4.7, -3.7]} color={project.accent} intensity={5} distance={19} decay={1.8} />
    <MainDisplay project={project} active={activeIndex === index} />
    {project.supportingDisplays.map((display, i) => <SupportingScreen key={`${project.number}-${display.label}`} display={display} index={i} projectIndex={index} progress={progress} project={project} reducedMotion={reducedMotion} />)}
    <ProjectionPlatform project={project} index={index} progress={progress} reducedMotion={reducedMotion} />
    <mesh position={[0, 0.03, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[3.1, 64]} /><meshBasicMaterial color={project.accent} transparent opacity={0.045} side={THREE.DoubleSide} toneMapped={false} />
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
      <boxGeometry args={[112, 0.38, 24]} /><meshPhysicalMaterial color="#111923" metalness={0.84} roughness={0.19} clearcoat={0.86} clearcoatRoughness={0.18} />
    </mesh>
    <mesh position={[32, -1.015, 0]}>
      <planeGeometry args={[110, 22]} /><meshBasicMaterial color="#17212a" transparent opacity={0.25} side={THREE.DoubleSide} />
    </mesh>

    {[-10.7, -8.7, 8.7, 10.7].map((z, i) => <group key={z}>
      <mesh position={[32, 3.8, z]}><boxGeometry args={[110, 9.8, 0.14]} /><meshPhysicalMaterial color={i % 2 ? "#0b1219" : "#101922"} transparent opacity={0.46} metalness={0.74} roughness={0.28} /></mesh>
      <mesh position={[32, 1.1, z + (z < 0 ? 0.09 : -0.09)]}><boxGeometry args={[110, 0.08, 0.08]} /><meshBasicMaterial color={i % 2 ? "#6baed0" : "#56d5ba"} transparent opacity={0.26} toneMapped={false} /></mesh>
    </group>)}

    {[-8.6, 8.6].map((z) => <mesh key={z} position={[32, 9.05, z]}><boxGeometry args={[110, 0.35, 0.32]} /><meshStandardMaterial color="#1b2731" metalness={0.9} roughness={0.22} /></mesh>)}
    {Array.from({ length: 17 }, (_, i) => {
      const x = -12 + i * 5.6;
      return <group key={i} position={[x, 4.2, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[7.5, 0.095, 8, 80]} /><meshStandardMaterial color="#25343e" metalness={0.92} roughness={0.28} /></mesh>
        <mesh position={[0, 0, -10.15]}><boxGeometry args={[0.22, 8.4, 0.22]} /><meshStandardMaterial color="#16232c" metalness={0.9} roughness={0.3} /></mesh>
        <mesh position={[0, 0, 10.15]}><boxGeometry args={[0.22, 8.4, 0.22]} /><meshStandardMaterial color="#16232c" metalness={0.9} roughness={0.3} /></mesh>
      </group>;
    })}

    {Array.from({ length: 26 }, (_, i) => {
      const x = -17 + i * 4.25;
      return <group key={i} position={[x, 0, 0]}>
        <mesh position={[0, 9.34, -8.4]}><boxGeometry args={[0.18, 0.62, 0.18]} /><meshStandardMaterial color="#30424d" metalness={0.86} roughness={0.24} /></mesh>
        <mesh position={[0, 9.34, 8.4]}><boxGeometry args={[0.18, 0.62, 0.18]} /><meshStandardMaterial color="#30424d" metalness={0.86} roughness={0.24} /></mesh>
        <mesh position={[0, 9.0, 0]}><boxGeometry args={[0.12, 0.12, 16.8]} /><meshBasicMaterial color="#9db4c1" transparent opacity={0.2} /></mesh>
      </group>;
    })}

    {[-1, 1].map((side) => <group key={side}>
      <mesh position={[32, -0.98, side * 5.6]}><boxGeometry args={[110, 0.025, 0.045]} /><meshBasicMaterial color={side < 0 ? "#6fcce0" : "#69e6bf"} transparent opacity={0.34} toneMapped={false} /></mesh>
      <mesh position={[32, -0.98, side * 9.4]}><boxGeometry args={[110, 0.025, 0.045]} /><meshBasicMaterial color="#9ab0c0" transparent opacity={0.24} toneMapped={false} /></mesh>
    </group>)}

    <points ref={particles}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#d0edff" size={0.026} transparent opacity={0.46} sizeAttenuation depthWrite={false} />
    </points>
    <fog attach="fog" args={["#080d14", 18, 88]} />
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

export default function ProjectExhibitionWorld({ progress, reducedMotion, projects, activeIndex }: WorldProps) {
  return <Canvas camera={{ position: [-8, 4.15, 12.8], fov: 40, near: 0.1, far: 130 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}>
    <color attach="background" args={["#101925"]} />
    <ambientLight intensity={0.86} />
    <hemisphereLight args={["#e0f2ff", "#111a27", 0.86]} />
    <directionalLight position={[0, 12, 7]} intensity={2.7} color="#e0f1ff" />
    <directionalLight position={[0, 8, -6]} intensity={1.45} color="#9baeff" />
    <pointLight position={[-5, 8, 0]} intensity={40} distance={30} color="#c1dcff" />
    <Corridor reducedMotion={reducedMotion} />
    {projects.map((project, index) => <ProjectZone key={project.number} project={project} index={index} progress={progress} activeIndex={activeIndex} reducedMotion={reducedMotion} />)}
    <CameraRig progress={progress} reducedMotion={reducedMotion} />
  </Canvas>;
}
