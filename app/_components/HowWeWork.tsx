"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSceneVisibility } from "./useSceneVisibility";

const WorkflowWorld = dynamic(() => import("./WorkflowWorld"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_58%_48%,rgba(22,160,90,.12),transparent_60%)]" />,
});

const stages = [
  {
    number: "01",
    title: "Understanding Before Building.",
    description: "We explore your business, understand your challenges, and identify opportunities where technology can create meaningful impact.",
    support: "Business / Challenges / Opportunity",
  },
  {
    number: "02",
    title: "Turning Ideas Into Direction.",
    description: "We define the right strategy, architecture, technologies, and implementation roadmap for your project.",
    support: "Strategy / Architecture / Roadmap",
  },
  {
    number: "03",
    title: "Giving Ideas Their Identity.",
    description: "We create thoughtful interfaces, intuitive experiences, and structured product designs aligned with your vision.",
    support: "Interface / Experience / Identity",
  },
  {
    number: "04",
    title: "Engineering What Matters.",
    description: "We build reliable, scalable, and intelligent digital solutions using carefully selected technologies.",
    support: "Engineering / Integration / Quality",
  },
  {
    number: "05",
    title: "Built to Perform. Ready to Grow.",
    description: "We launch, test, optimize, and continuously improve solutions to support your evolving business needs.",
    support: "Launch / Optimization / Growth",
  },
];

export default function ProcessSection() {
  const reducedMotion = useReducedMotion();
  const scene = useSceneVisibility<HTMLDivElement>();
  const progress = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!stageRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    let refreshTimer: number | undefined;
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * stages.length}`,
        pin: stageRef.current,
        pinSpacing: true,
        scrub: reducedMotion ? false : 0.7,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (trigger) => {
          progress.current = trigger.progress;
          const index = Math.min(stages.length - 1, Math.floor(trigger.progress * stages.length));
          setActive((current) => current === index ? current : index);
        },
        onRefresh: (trigger) => {
          progress.current = trigger.progress;
          const index = Math.min(stages.length - 1, Math.floor(trigger.progress * stages.length));
          setActive((current) => current === index ? current : index);
        },
      });
    }, stageRef);
    // Services is also pinned and lazy-loads its ScrollTrigger. Refresh after its
    // trigger is registered so this downstream pin measures the true document offset.
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => {
      if (refreshTimer !== undefined) window.clearTimeout(refreshTimer);
      context.revert();
    };
  }, [reducedMotion]);

  const current = stages[active];

  return (
    <section id="process" className="relative overflow-x-clip bg-[#090d0b] text-[#f1f5f2]">
      <div ref={stageRef} className="relative isolate grid h-[100svh] min-h-[590px] grid-cols-1 overflow-hidden bg-[#090d0b] lg:grid-cols-[.86fr_1.14fr]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_76%_48%,rgba(21,59,41,.28),transparent_57%)]" />

        <div ref={scene.ref} className="pointer-events-none absolute inset-0 z-0 lg:left-auto lg:right-0 lg:w-[66%]">
          {scene.shouldRender && <WorkflowWorld progress={progress} reducedMotion={Boolean(reducedMotion)} active={scene.visible} />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d0b] via-[#090d0b]/30 to-transparent lg:bg-gradient-to-r lg:from-[#090d0b] lg:via-[#090d0b]/20 lg:to-transparent" />
          <div className="absolute right-5 top-24 text-[9px] uppercase tracking-[.22em] text-[#35d98a]/65 sm:right-8 lg:right-12 lg:top-10">ONEXA / DIGITAL CREATION ENGINE</div>
          <div className="absolute bottom-[48%] right-5 font-mono text-[9px] tracking-[.16em] text-white/25 sm:right-8 lg:bottom-10 lg:right-12">FIG. {current.number} — PROCESS IN MOTION</div>
        </div>

        <div className="relative z-10 flex min-h-0 flex-col justify-end px-5 pb-16 pt-[42vh] sm:px-8 sm:pb-20 lg:col-start-1 lg:justify-center lg:px-12 lg:pb-12 lg:pt-24 xl:px-20">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="h-px w-9 bg-[#35d98a]" />
            <span className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#35d98a]">Our Process / 03</span>
          </div>
          <h2 className="mb-8 text-4xl font-medium leading-[.98] tracking-tight sm:text-5xl lg:mb-12 lg:text-6xl xl:text-7xl">HOW WE<br/><span className="text-[#35d98a]">WORK.</span></h2>

          <div className="flex gap-6 sm:gap-8">
            <div className="relative flex w-8 shrink-0 flex-col items-center">
              <div className="absolute bottom-2 top-2 w-px bg-white/15" />
              <div className="absolute top-2 w-px origin-top bg-gradient-to-b from-[#35d98a] to-[#16a05a] transition-transform duration-300" style={{ height: "calc(100% - 16px)", transform: `scaleY(${active / (stages.length - 1)})` }} />
              {stages.map((step, index) => <span key={step.number} className={`relative z-10 mb-auto flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300 last:mb-0 ${index === active ? "border-[#35d98a] bg-[#35d98a] shadow-[0_0_18px_rgba(53,217,138,.5)]" : index < active ? "border-[#16a05a] bg-[#16a05a]" : "border-white/25 bg-[#090d0b]"}`} aria-label={`Stage ${step.number}${index === active ? ", current" : ""}`} />)}
            </div>

            <div className="min-h-[214px] flex-1 sm:min-h-[230px]">
              <div className="mb-3 flex items-center gap-4">
                <span className="font-mono text-sm tracking-[.2em] text-[#35d98a]">{current.number}</span>
                <span className="h-px w-8 bg-white/15" />
                <span className="text-[9px] uppercase tracking-[.22em] text-white/40">{["Discover", "Strategize", "Design", "Develop", "Deploy & Evolve"][active]}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.number}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: reducedMotion ? 0 : 0.36, ease: "easeOut" }}
                >
                  <h3 className="max-w-xl text-2xl font-medium leading-[1.08] tracking-tight sm:text-3xl lg:text-[clamp(1.75rem,3vw,3.25rem)]">{current.title}</h3>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-[#9aa79e] sm:mt-5 sm:text-base">{current.description}</p>
                  <p className="mt-5 text-[9px] uppercase tracking-[.18em] text-white/30 sm:mt-7">{current.support}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between pl-14 sm:mt-10 sm:pl-16">
            <span className="text-[9px] uppercase tracking-[.2em] text-white/35">Scroll to move through the system</span>
            <span className="font-mono text-[10px] tracking-[.18em] text-white/50">{current.number} <span className="text-white/20">/ 05</span></span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[.07] bg-[#090d0b] px-5 py-7 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[9px] uppercase tracking-[.22em] text-[#35d98a]/70">The ONEXA approach</span>
          <span className="text-xs text-white/40">Built with purpose. Delivered with precision.</span>
        </div>
      </div>
    </section>
  );
}
