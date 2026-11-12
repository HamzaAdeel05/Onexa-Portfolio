"use client";

import { motion, useReducedMotion } from "framer-motion";

const services = [
  { n: "01", title: "AI & Intelligent Automation", text: "Turn repetitive work and complex decisions into purposeful, intelligent workflows.", mark: "AI" },
  { n: "02", title: "Software Development", text: "Build reliable digital products with thoughtful engineering from the first line of code.", mark: "{}" },
  { n: "03", title: "Web Development", text: "Create expressive, responsive websites and web applications made for real people.", mark: "WEB" },
  { n: "04", title: "Custom Digital Solutions", text: "Shape technology around the challenge, with a solution designed to fit your needs.", mark: "↗" },
];

function NetworkVisual({ index }: { index: number }) {
  if (index === 0) return <svg viewBox="0 0 200 140" className="h-32 w-48 text-[#35d98a]" fill="none" aria-hidden="true"><path d="M35 70 78 34l48 22 40-28M35 70l42 42 49-24 40 26M78 34l-1 78m49-56 0 32m40-82v108" stroke="currentColor" strokeOpacity=".42"/><circle cx="35" cy="70" r="5" fill="currentColor"/><circle cx="78" cy="34" r="6" fill="currentColor"/><circle cx="126" cy="56" r="9" fill="currentColor" fillOpacity=".6"/><circle cx="166" cy="28" r="4" fill="currentColor"/><circle cx="77" cy="112" r="4" fill="currentColor"/><circle cx="126" cy="88" r="6" fill="currentColor"/><circle cx="166" cy="114" r="5" fill="currentColor"/></svg>;
  if (index === 1) return <div aria-hidden="true" className="font-mono text-5xl tracking-[-0.15em] text-[#35d98a]/65">&lt; / &gt;</div>;
  if (index === 2) return <div aria-hidden="true" className="relative h-24 w-40 border border-[#35d98a]/40 bg-[#35d98a]/[0.04] p-3"><div className="mb-3 flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-[#35d98a]/70"/><i className="h-1.5 w-1.5 rounded-full bg-white/20"/><i className="h-1.5 w-1.5 rounded-full bg-white/20"/></div><div className="h-px w-3/4 bg-white/20"/><div className="mt-3 grid grid-cols-3 gap-2"><i className="h-8 border border-[#35d98a]/20 bg-[#35d98a]/10"/><i className="h-8 border border-white/10"/><i className="h-8 border border-[#35d98a]/20 bg-[#35d98a]/10"/></div></div>;
  return <div aria-hidden="true" className="relative flex h-28 w-40 items-center justify-center"><div className="absolute h-24 w-24 rotate-45 border border-[#35d98a]/30 transition-transform duration-700 group-hover:rotate-[65deg]"/><div className="absolute h-20 w-20 rounded-[42%_58%_61%_39%] border border-[#35d98a]/60 bg-[#16a05a]/10 transition-transform duration-700 group-hover:scale-110"/><span className="relative text-2xl text-[#35d98a]">✳</span></div>;
}

export default function ServicesSection() {
  const reducedMotion = useReducedMotion();
  return <section id="services" className="relative overflow-hidden bg-[#101813] px-5 py-28 text-white sm:px-8 lg:px-16">
    <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-[#16a05a]/[0.07] blur-[140px]" />
    <div className="relative mx-auto max-w-7xl">
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16 max-w-3xl">
        <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-[#35d98a]"/><span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#35d98a]">02 / What we do</span></div>
        <h2 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">IDEAS INTO<br/><span className="text-[#35d98a]">INTELLIGENCE.</span></h2>
        <p className="mt-6 max-w-xl text-sm leading-7 text-[#9aa79e] sm:text-base">Transforming complex challenges into intelligent digital solutions.</p>
      </motion.div>
      <div className="border-t border-white/10">
        {services.map((service, index) => <motion.article key={service.n} initial={reducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: reducedMotion ? 0 : index * 0.06 }} className="group grid min-h-[190px] grid-cols-[42px_1fr] items-center gap-4 border-b border-white/10 py-8 sm:grid-cols-[64px_1.1fr_1fr_200px] sm:gap-6 sm:py-10">
          <span className="self-start pt-2 font-mono text-xs text-[#35d98a]/60">/{service.n}</span>
          <h3 className="text-xl font-medium leading-tight tracking-tight transition-colors group-hover:text-[#70e4a7] sm:text-2xl lg:text-3xl">{service.title}</h3>
          <p className="col-start-2 max-w-md text-sm leading-6 text-white/45 sm:col-start-auto">{service.text}</p>
          <div className="col-start-2 flex h-24 items-center justify-center overflow-hidden sm:col-start-auto"><NetworkVisual index={index}/></div>
        </motion.article>)}
      </div>
      <a href="#contact" className="mt-9 inline-flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-[#35d98a] transition-colors hover:text-white">Find the right solution <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}
