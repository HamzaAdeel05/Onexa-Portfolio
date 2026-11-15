"use client";

import { useEffect, useRef } from "react";
import OnexaOrb from "./EnergyOrb";

export default function OnexaIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      const progress = reduceMotion
        ? (window.scrollY > 0 ? 1 : 0)
        : Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight * 0.7, 1)));
      sectionRef.current?.style.setProperty("--intro-progress", String(progress));
    };
    const scheduleUpdate = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <section
    ref={sectionRef}
    aria-label="ONEXA Personalized Intelligence introduction"
    style={{ "--intro-progress": 0 } as React.CSSProperties}
    className="pointer-events-none fixed inset-0 z-[80] h-[100svh] w-screen overflow-hidden"
  >
    <div aria-hidden="true" className="absolute inset-0 bg-black" style={{ opacity: "calc(1 - var(--intro-progress))" }} />
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_43%,rgba(27,40,70,0.17),transparent_44%),radial-gradient(ellipse_at_53%_44%,rgba(10,165,220,0.055),transparent_33%)]" style={{ opacity: "calc(1 - var(--intro-progress))" }} />
    <OnexaOrb
      label="ONEXA"
      className="!mx-0 !h-[100svh] !w-screen !max-w-none !aspect-auto !rounded-none !bg-transparent"
    />
  </section>;
}
