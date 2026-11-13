"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  return <ReactLenis root options={{
    autoRaf: true,
    // The global scroll-padding-top already accounts for the fixed navigation.
    anchors: { offset: 0 },
    smoothWheel: !reducedMotion,
    lerp: reducedMotion ? 1 : 0.085,
  }}>
    <ScrollTriggerSync />
    {children}
  </ReactLenis>;
}
