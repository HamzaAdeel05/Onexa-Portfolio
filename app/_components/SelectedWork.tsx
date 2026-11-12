"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SelectedWork() {
  const reducedMotion = useReducedMotion();
  return <section id="work" className="relative overflow-hidden bg-[#090d0b] px-5 py-28 text-white sm:px-8 lg:px-16">
    <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#16a05a]/10 blur-[120px]" />
    <div className="relative mx-auto max-w-7xl">
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-[#35d98a]" /><span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#35d98a]">Selected Work / 05</span></div>
          <h2 className="text-4xl font-medium leading-tight tracking-tight sm:text-6xl lg:text-7xl">BUILT TO<br /><span className="text-[#35d98a]">MAKE AN IMPACT.</span></h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-white/50 sm:text-base">A closer look at ONEXA&apos;s work in intelligent software and digital experiences.</p>
      </motion.div>

      <motion.article initial={reducedMotion ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7 }} className="grid overflow-hidden border-y border-white/10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="group relative flex min-h-[340px] items-center justify-center overflow-hidden bg-[#0c1510] p-8 sm:min-h-[480px] sm:p-14">
          <div aria-hidden="true" className="absolute inset-0 opacity-35 [background-image:radial-gradient(#35d98a33_1px,transparent_1px)] [background-size:24px_24px]" />
          <div aria-hidden="true" className="absolute h-[75%] aspect-square rounded-full border border-[#35d98a]/10 transition-transform duration-1000 group-hover:scale-110" />
          <div aria-hidden="true" className="absolute h-[60%] aspect-square rounded-full border border-dashed border-[#35d98a]/20 transition-transform duration-[1400ms] group-hover:-rotate-12" />
          <div aria-hidden="true" className="absolute h-[45%] aspect-square rounded-full bg-[radial-gradient(circle_at_35%_32%,rgba(53,217,138,0.34),rgba(21,59,41,0.18)_48%,transparent_74%)] blur-sm" />
          <div className="relative z-10 text-center">
            <span className="block text-[10px] uppercase tracking-[0.3em] text-[#9aa79e]">ONEXA / CRM</span>
            <span className="mt-3 block text-5xl font-medium tracking-[-0.08em] text-white sm:text-7xl">CUI<span className="text-[#35d98a]">BEX</span></span>
            <span className="mt-3 block text-[9px] uppercase tracking-[0.28em] text-white/40">Project showcase</span>
          </div>
          <span className="absolute bottom-5 left-5 text-[9px] uppercase tracking-[0.2em] text-white/35">01 / CUIBEX CRM</span>
          <span aria-hidden="true" className="absolute right-6 top-5 text-[#35d98a]/60">↗</span>
        </div>

        <div className="flex flex-col justify-center border-t border-white/10 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-14">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#35d98a]">CRM · Software</span>
          <h3 className="mt-5 text-3xl font-medium tracking-tight sm:text-5xl">CUIBEX CRM</h3>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#9aa79e]">A CRM project in ONEXA&apos;s portfolio. Get in touch to discuss the work and what you&apos;re looking to build.</p>
          <div className="mt-8 flex flex-wrap gap-2"><span className="border border-white/15 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55">Customer relationship management</span></div>
          <a href="#contact" className="group mt-10 inline-flex w-fit items-center gap-4 border-b border-[#35d98a]/50 pb-3 text-sm text-[#dff9e9] transition-colors hover:border-[#35d98a] hover:text-[#35d98a]">Discuss a similar project <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span></a>
        </div>
      </motion.article>

      <div className="mt-14 flex flex-col justify-end gap-5 sm:flex-row sm:items-center">
        <a href="#contact" className="group inline-flex items-center gap-4 rounded-full border border-white/20 px-6 py-4 text-sm transition-all hover:border-[#35d98a]/60 hover:bg-[#153b29]/40">Let&apos;s build something meaningful <span className="transition-transform group-hover:translate-x-1">↗</span></a>
      </div>
    </div>
  </section>;
}
