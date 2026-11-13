"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { getAdaptiveDpr } from "./useSceneVisibility";

function Planet() {
  const group = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const surface = useMemo(() => {
    const width = 512;
    const height = 256;
    const pixels = new Uint8Array(width * height * 4);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const continent = Math.sin(u * 18 + Math.sin(v * 15) * 1.3) + Math.cos(v * 22 + Math.sin(u * 12) * 1.1) + Math.sin((u + v) * 31) * 0.28;
      const band = Math.sin(v * 92 + Math.sin(u * 25) * 2.3) * 0.12;
      const land = Math.max(0, Math.min(1, (continent + band + 0.05) / 2.6));
      const i = (y * width + x) * 4;
      pixels[i] = 14 + land * 28;
      pixels[i + 1] = 78 + land * 105;
      pixels[i + 2] = 38 + land * 54;
      pixels[i + 3] = 255;
    }
    const texture = new THREE.DataTexture(pixels, width, height, THREE.RGBAFormat);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += delta * 0.055;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * 0.08, 2, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -state.pointer.x * 0.06, 2, delta);
  });

  return <group ref={group}>
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[1.55, 96, 96]} />
      <meshStandardMaterial map={surface} color="#8bc5a1" roughness={0.88} metalness={0.08} />
    </mesh>
    <mesh scale={1.035}>
      <sphereGeometry args={[1.55, 64, 64]} />
      <meshBasicMaterial color="#35d98a" transparent opacity={0.095} side={THREE.BackSide} depthWrite={false} />
    </mesh>
    <mesh rotation={[1.12, 0.1, -0.2]}>
      <torusGeometry args={[2.02, 0.012, 8, 240]} />
      <meshBasicMaterial color="#70e4a7" transparent opacity={0.46} />
    </mesh>
    <mesh rotation={[1.12, 0.1, -0.2]}>
      <torusGeometry args={[2.13, 0.004, 6, 240]} />
      <meshBasicMaterial color="#d8f7e4" transparent opacity={0.23} />
    </mesh>
  </group>;
}

function Scene() {
  const reducedMotion = useReducedMotion();
  return <>
    <ambientLight intensity={0.34} />
    <directionalLight position={[-4, 3, 5]} intensity={2.6} color="#e3fff0" />
    <pointLight position={[3, -1, -3]} intensity={16} distance={9} color="#16a05a" />
    <Planet />
    <Stars radius={42} depth={36} count={1100} factor={2.2} saturation={0.15} fade speed={reducedMotion ? 0 : 0.18} />
    {!reducedMotion && <Sparkles count={48} scale={6.5} size={1.6} speed={0.16} color="#35d98a" opacity={0.55} />}
  </>;
}

export default function CosmicScene({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion();
  return <Canvas
    frameloop={!active ? "never" : reducedMotion ? "demand" : "always"}
    dpr={getAdaptiveDpr()}
    camera={{ position: [0, 0, 6.6], fov: 36 }}
    gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    fallback={<div aria-label="A glowing emerald planet in deep space" className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_38%_38%,#75d79b_0%,#176642_32%,#07140e_70%)]" />}
  >
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  </Canvas>;
}
