"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return <section id="home" className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[var(--midnight-black)] text-[var(--metallic-silver)]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_48%,rgba(65,115,180,0.09),transparent_38%),radial-gradient(ellipse_at_8%_90%,rgba(22,119,255,0.07),transparent_35%)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.075] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:90px_90px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

    <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-2 px-5 pb-20 pt-28 sm:px-8 md:pt-32 lg:grid-cols-[0.92fr_1.08fr] lg:gap-0 lg:px-14 lg:pb-12">
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center lg:text-left">
        <div className="mb-7 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--cool-steel)] sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric-blue)] shadow-[0_0_12px_#1677FF]" />
          AI · AUTOMATION · SOFTWARE
        </div>
        <h1 className="mx-auto max-w-[720px] text-[clamp(3.4rem,8vw,7.7rem)] font-medium leading-[0.91] tracking-[-0.075em] lg:mx-0">
          BEYOND<br /><span className="text-[var(--electric-blue)]">WHAT</span><br />EXISTS<span className="text-[var(--electric-blue)]">.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-[490px] text-sm leading-7 text-[var(--cool-steel)] sm:text-base sm:leading-8 lg:mx-0">
          We build intelligent systems, powerful software and next-generation digital experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <a href="#services" className="group inline-flex min-h-12 items-center gap-6 rounded-full bg-[var(--electric-blue)] px-6 text-xs font-semibold text-[var(--midnight-black)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--cyan-blue)]">
            Explore Our Universe <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
          <a href="#contact" className="inline-flex min-h-12 items-center gap-4 rounded-full border border-white/20 px-6 text-xs font-medium text-[var(--metallic-silver)] transition-colors hover:border-[var(--electric-blue)]/70 hover:text-[var(--cyan-blue)]">
            Let&apos;s Build Together <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="mx-auto mt-12 flex max-w-[480px] justify-between border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.2em] text-white/35 lg:mx-0">
          <span>01 / Introduction</span><span>One Vision. Next Generation.</span>
        </div>
      </motion.div>

      <div data-onexa-globe-target aria-hidden="true" className="relative mx-auto mt-2 aspect-square w-full max-w-[680px] lg:mt-0">
      </div>
    </div>

    <a href="#services" aria-label="Scroll to services" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/40 transition hover:text-[var(--electric-blue)]">
      Scroll to explore <span aria-hidden="true" className="text-sm">↓</span>
    </a>
  </section>;
}
