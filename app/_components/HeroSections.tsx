"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

const CosmicScene = dynamic(() => import("./CosmicScene"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_38%_38%,#75d79b_0%,#176642_32%,#07140e_70%)] shadow-[0_0_100px_rgba(22,160,90,0.2)]" />,
});

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return <section id="home" className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[#090d0b] text-[#f1f5f2]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_48%,rgba(22,160,90,0.13),transparent_38%),radial-gradient(ellipse_at_8%_90%,rgba(165,31,50,0.07),transparent_35%)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.075] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:90px_90px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

    <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-2 px-5 pb-20 pt-28 sm:px-8 md:pt-32 lg:grid-cols-[0.92fr_1.08fr] lg:gap-0 lg:px-14 lg:pb-12">
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center lg:text-left">
        <div className="mb-7 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#9aa79e] sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#35d98a] shadow-[0_0_12px_#35d98a]" />
          AI · AUTOMATION · SOFTWARE
        </div>
        <h1 className="mx-auto max-w-[720px] text-[clamp(3.4rem,8vw,7.7rem)] font-medium leading-[0.91] tracking-[-0.075em] lg:mx-0">
          BEYOND<br /><span className="text-[#35d98a]">WHAT</span><br />EXISTS<span className="text-[#a51f32]">.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-[490px] text-sm leading-7 text-[#9aa79e] sm:text-base sm:leading-8 lg:mx-0">
          We build intelligent systems, powerful software and next-generation digital experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <a href="#services" className="group inline-flex min-h-12 items-center gap-6 rounded-full bg-[#35d98a] px-6 text-xs font-semibold text-[#07140e] transition duration-300 hover:-translate-y-0.5 hover:bg-[#70e4a7]">
            Explore Our Universe <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
          <a href="#contact" className="inline-flex min-h-12 items-center gap-4 rounded-full border border-white/20 px-6 text-xs font-medium text-[#f1f5f2] transition-colors hover:border-[#35d98a]/70 hover:text-[#70e4a7]">
            Let&apos;s Build Together <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="mx-auto mt-12 flex max-w-[480px] justify-between border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.2em] text-white/35 lg:mx-0">
          <span>01 / Introduction</span><span>One Vision. Next Generation.</span>
        </div>
      </motion.div>

      <div className="relative mx-auto mt-2 aspect-square w-full max-w-[680px] lg:mt-0">
        <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-[#16a05a]/10 blur-[75px]" />
        <CosmicScene />
        <div className="pointer-events-none absolute bottom-[11%] left-[5%] flex items-center gap-3 border border-white/10 bg-[#101813]/75 px-4 py-3 backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-[#35d98a] shadow-[0_0_10px_#35d98a]" />
          <span className="text-[9px] uppercase tracking-[0.17em] text-white/70">ONEXA / Intelligence in motion</span>
        </div>
        <span className="pointer-events-none absolute bottom-[4%] right-[4%] text-[8px] uppercase tracking-[0.2em] text-white/35">FIG. 001 · COSMIC INTELLIGENCE</span>
      </div>
    </div>

    <a href="#services" aria-label="Scroll to services" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/40 transition hover:text-[#35d98a]">
      Scroll to explore <span aria-hidden="true" className="text-sm">↓</span>
    </a>
  </section>;
}
