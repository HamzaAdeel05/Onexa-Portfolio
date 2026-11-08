
"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "Understanding the vision",
    description:
      "Every great project starts with an idea. We understand your goals, audience, challenges, and vision before making a move.",
    tag: "Research & Strategy",
    symbol: "◎",
    accent: "green",
  },
  {
    number: "02",
    title: "Planning",
    subtitle: "Building the roadmap",
    description:
      "We transform your ideas into a clear strategy, define the requirements, and establish a roadmap for successful execution.",
    tag: "Strategy & Roadmap",
    symbol: "⌘",
    accent: "red",
  },
  {
    number: "03",
    title: "Design",
    subtitle: "Creating the experience",
    description:
      "We craft intuitive interfaces, thoughtful user experiences, and distinctive visual identities that make your brand stand out.",
    tag: "UI/UX & Creativity",
    symbol: "✳",
    accent: "green",
  },
  {
    number: "04",
    title: "Development",
    subtitle: "Bringing ideas to life",
    description:
      "Our team turns approved designs into functional digital experiences using modern technologies, intelligent systems, and clean code.",
    tag: "Engineering & AI",
    symbol: "</>",
    accent: "red",
  },
  {
    number: "05",
    title: "Testing",
    subtitle: "Refining every detail",
    description:
      "We test, optimize, and refine every element to ensure performance, reliability, usability, and a seamless experience.",
    tag: "Quality & Performance",
    symbol: "✓",
    accent: "green",
  },
  {
    number: "06",
    title: "Launch",
    subtitle: "Taking it to the world",
    description:
      "Once everything is ready, we launch your solution and help you move forward with confidence, support, and room to grow.",
    tag: "Delivery & Growth",
    symbol: "↗",
    accent: "red",
  },
];

export default function ProcessSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#090B09] px-5 py-28 text-white sm:px-8 lg:px-16"
    >
      {/* Background details */}
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#174B32]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#8B202C]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#3F9B68]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#65B989]">
                Our Process / 06
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              How we turn
              <br />
              <span className="text-[#65B989]">ideas into impact.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/50 sm:text-base">
            Great results don't happen by accident. They happen through
            a thoughtful process, creative thinking, and precise execution.
          </p>
        </motion.div>

        {/* Process overview */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-5"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">
            From concept to completion
          </span>

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#65B989]" />
            <span className="text-xs text-white/60">
              06 Steps · One Vision
            </span>
          </div>
        </motion.div>

        {/* Process cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const isGreen = step.accent === "green";

            return (
              <motion.div
                key={step.number}
                initial={
                  reducedMotion ? false : { opacity: 0, y: 35 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: reducedMotion ? 0 : index * 0.1,
                }}
                whileHover={reducedMotion ? undefined : { y: -7 }}
                className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#111411] p-7 transition-colors duration-500 hover:border-white/20 sm:p-8"
              >
                {/* Hover background */}
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full blur-[80px] transition-opacity duration-500 group-hover:opacity-100 ${
                    isGreen
                      ? "bg-[#28784A]/10 opacity-30"
                      : "bg-[#A12D3B]/10 opacity-30"
                  }`}
                />

                {/* Top row */}
                <div className="relative mb-12 flex items-center justify-between">
                  <span className="font-mono text-sm tracking-widest text-white/35">
                    / {step.number}
                  </span>

                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xl transition-all duration-500 group-hover:rotate-12 ${
                      isGreen
                        ? "border-[#3F9B68]/30 bg-[#174B32]/20 text-[#65B989]"
                        : "border-[#A12D3B]/30 bg-[#641D29]/20 text-[#E47B86]"
                    }`}
                  >
                    {step.symbol}
                  </span>
                </div>

                {/* Card content */}
                <div className="relative flex flex-1 flex-col">
                  <span
                    className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                      isGreen ? "text-[#65B989]" : "text-[#E47B86]"
                    }`}
                  >
                    {step.subtitle}
                  </span>

                  <h3 className="mb-4 text-3xl font-medium tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mb-8 text-sm leading-7 text-white/45">
                    {step.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                      {step.tag}
                    </span>

                    <span
                      className={`text-xl transition-transform duration-300 group-hover:translate-x-1 ${
                        isGreen ? "text-[#65B989]" : "text-[#E47B86]"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-[#111411] p-7 sm:flex-row sm:items-center sm:p-10"
        >
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#65B989]">
              The ONEXA Approach
            </p>

            <h3 className="text-2xl font-medium sm:text-3xl">
              One vision. Every detail matters.
            </h3>
          </div>

          <div className="flex items-center gap-3 text-sm text-white/50">
            <span className="h-2 w-2 rounded-full bg-[#65B989]" />
            Built with purpose. Delivered with precision.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
