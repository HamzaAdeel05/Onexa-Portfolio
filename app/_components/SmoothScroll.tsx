"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  return <ReactLenis root options={{
    autoRaf: true,
    anchors: { offset: -76 },
    smoothWheel: !reducedMotion,
    lerp: reducedMotion ? 1 : 0.085,
  }}>{children}</ReactLenis>;
}
