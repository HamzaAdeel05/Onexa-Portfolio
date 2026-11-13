"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ServicesWorld = dynamic(() => import("./ServicesWorld"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,160,90,.16),transparent_62%)]" />,
});

const services = [
  {
    n: "01",
    title: "Intelligent systems. Automated workflows.",
    text: "We build AI-powered solutions that simplify operations, automate repetitive tasks, and improve business efficiency.",
    kind: "AI & automation",
  },
  {
    n: "02",
    title: "Engineering ideas into reality.",
    text: "Scalable, reliable software solutions designed around your business requirements.",
    kind: "Software development",
  },
  {
    n: "03",
    title: "Digital experiences that connect.",
    text: "Modern, responsive, high-performance websites with thoughtful design and seamless functionality.",
    kind: "Web development",
  },
  {
    n: "04",
    title: "One vision. Endless possibilities.",
    text: "Tailored digital products and technology solutions built to solve unique business challenges.",
    kind: "Custom solutions",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const progress = useRef(0);
  const stage = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !stage.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: stage.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          pin: stage.current,
          pinSpacing: true,
          // Refresh pinned sections in document order so their spacer heights
          // are included when downstream sections measure their start points.
          refreshPriority: 2,
          scrub: reducedMotion ? false : 0.8,
          invalidateOnRefresh: true,
          onUpdate: (trigger) => {
            progress.current = trigger.progress;
            const chapter = Math.min(services.length - 1, Math.floor(trigger.progress * services.length));
            setActive((current) => current === chapter ? current : chapter);
          },
          onRefresh: (trigger) => {
            progress.current = trigger.progress;
            const chapter = Math.min(services.length - 1, Math.floor(trigger.progress * services.length));
            setActive((current) => current === chapter ? current : chapter);
          },
        });
      }, stage);
      ScrollTrigger.refresh();
    })();
    return () => { cancelled = true; ctx?.revert(); };
  }, [reducedMotion]);

  return (
    <section id="services" className="relative overflow-x-clip bg-[#090d0b] px-5 py-24 text-[#f1f5f2] sm:px-8 sm:py-32 lg:px-16">
      <div aria-hidden="true" className="pointer-events-none absolute -left-64 top-[28rem] h-[42rem] w-[42rem] rounded-full bg-[#153b29]/20 blur-[150px]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-[#35d98a]"/><span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#35d98a]">02 / What we do</span></div>
          <h2 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">IDEAS INTO<br/><span className="text-[#35d98a]">INTELLIGENCE.</span></h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#9aa79e] sm:text-base">Transforming complex challenges into intelligent digital solutions.</p>
        </header>

        <div ref={stage} className="relative grid h-[100svh] min-h-[620px] max-h-[1000px] grid-cols-1 overflow-hidden border-y border-white/[0.07] bg-[#090d0b] lg:h-[100svh] lg:max-h-none lg:grid-cols-[.9fr_1.1fr] lg:border">
          <div className="relative order-2 z-10 flex min-h-0 flex-col justify-center px-1 pb-16 sm:px-8 lg:order-1 lg:px-12 lg:pb-8 xl:px-16">
            <div className="mb-8 flex items-center gap-3 text-[9px] uppercase tracking-[.24em] text-white/35 sm:text-[10px]">
              <span className="h-px w-8 bg-[#35d98a]" />
              <span>ONEXA / SERVICE SYSTEMS</span>
            </div>
            <div className="relative min-h-[240px] sm:min-h-[280px]">
              {services.map((service, index) => (
                <article
                  key={service.n}
                  aria-hidden={active !== index}
                  className={`absolute inset-0 flex flex-col justify-center transition-[opacity,transform,visibility] duration-700 ease-out ${active === index ? "visible translate-y-0 opacity-100" : "invisible translate-y-5 opacity-0"}`}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <span className="font-mono text-xs tracking-[.16em] text-[#35d98a]">/{service.n}</span>
                    <span className="h-px w-8 bg-white/15" />
                    <span className="text-[9px] uppercase tracking-[.22em] text-white/35">{service.kind}</span>
                  </div>
                  <h3 className="max-w-xl text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-[clamp(2rem,3.2vw,3.6rem)]">{service.title}</h3>
                  <p className="mt-5 max-w-md text-sm leading-7 text-[#9aa79e] sm:text-base">{service.text}</p>
                  <motion.a href="#contact" whileHover={reducedMotion ? undefined : { x: 5 }} className="mt-8 inline-flex w-fit items-center gap-3 text-[10px] uppercase tracking-[.18em] text-[#35d98a] transition-colors hover:text-white">Discuss your project <span aria-hidden="true">↗</span></motion.a>
                </article>
              ))}
            </div>
            <div className="absolute bottom-7 left-1 right-1 flex items-center gap-3 sm:left-8 sm:right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16">
              <div className="flex flex-1 gap-1.5" aria-label={`Chapter ${active + 1} of 4`}>
                {services.map((service, index) => <span key={service.n} className={`h-px flex-1 transition-colors duration-500 ${index <= active ? "bg-[#35d98a]" : "bg-white/20"}`} />)}
              </div>
              <span className="font-mono text-[10px] tracking-[.16em] text-white/45">{services[active].n} / 04</span>
              <span className="ml-2 hidden text-[9px] uppercase tracking-[.2em] text-white/25 sm:inline">Scroll to explore</span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 order-1 lg:relative lg:order-2">
            <ServicesWorld progress={progress} reducedMotion={Boolean(reducedMotion)} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(22,160,90,.12),transparent_66%)]" />
            <div className="absolute right-5 top-5 text-[9px] uppercase tracking-[.2em] text-[#35d98a]/65 sm:right-8 sm:top-8">Continuous environment</div>
            <div className="absolute bottom-5 right-5 font-mono text-[9px] tracking-[.18em] text-white/25 sm:bottom-8 sm:right-8">FIG. {services[active].n} — ONEXA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
