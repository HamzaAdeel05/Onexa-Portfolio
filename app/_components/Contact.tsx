
"use client";

import { motion, useReducedMotion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "Think Beyond",
    description: "We look beyond conventional solutions to discover better possibilities.",
  },
  {
    number: "02",
    title: "Build With Purpose",
    description: "Every design, line of code, and intelligent system has a reason to exist.",
  },
  {
    number: "03",
    title: "Move Forward",
    description: "We embrace emerging technologies to create solutions ready for tomorrow.",
  },
];

export default function Contact() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-[#090B09] px-5 py-28 text-white sm:px-8 lg:px-16"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#174B32]/15 blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#7B202C]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#3F9B68]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#65B989]">
              About Us / 05
            </span>
          </div>

          <h2 className="max-w-5xl text-5xl font-medium leading-[1.1] tracking-tight sm:text-6xl lg:text-8xl">
            Not just building
            <br />
            technology.
            <br />
            <span className="text-[#65B989]">Building what's next.</span>
          </h2>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left: Brand visual */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#111713] p-8 sm:min-h-[500px]"
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(#ffffff0b 1px, transparent 1px), linear-gradient(90deg, #ffffff0b 1px, transparent 1px)",
                backgroundSize: "35px 35px",
              }}
            />

            {/* Glow */}
            <div className="absolute h-64 w-64 rounded-full bg-[#28784A]/20 blur-[90px]" />

            {/* Brand mark */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : { rotate: [0, 3, -3, 0] }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-48 w-48 items-center justify-center rounded-[40px] border border-[#65B989]/30 bg-[#174B32]/20 shadow-[0_0_100px_rgba(63,155,104,0.12)] sm:h-60 sm:w-60"
              >
                <span className="text-7xl font-semibold tracking-[-0.12em] text-white sm:text-8xl">
                  O<span className="text-[#65B989]">.</span>
                </span>

                <span className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#65B989]/40 bg-[#111713] text-[#65B989]">
                  ↗
                </span>

                <span className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full border border-[#A12D3B]/50 bg-[#641D29]" />
              </motion.div>

              <h3 className="mt-10 text-3xl font-semibold tracking-[0.35em]">
                ONEXA
              </h3>

              <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/40">
                One Vision. Next Future.
              </p>
            </div>

            <span className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.2em] text-white/30">
              EST. ON IDEAS. BUILT FOR TOMORROW.
            </span>

            <span className="absolute right-6 top-6 font-mono text-xs text-[#65B989]/60">
              [ O / X ]
            </span>
          </motion.div>

          {/* Right: Introduction */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <span className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#65B989]">
              Who We Are
            </span>

            <h3 className="mb-7 text-3xl font-medium leading-tight sm:text-4xl">
              One vision.
              <br />
              <span className="text-white/40">Multiple possibilities.</span>
            </h3>

            <div className="space-y-5 text-sm leading-8 text-white/50 sm:text-base">
              <p>
                ONEXA is a technology-driven creative company focused on
                building digital experiences, intelligent solutions, and
                software that makes a difference.
              </p>

              <p>
                We bring creativity, engineering, and artificial intelligence
                together to help businesses transform ideas into meaningful
                digital products.
              </p>

              <p>
                Our approach is simple: understand the challenge, think
                differently, and build solutions that move businesses forward.
              </p>
            </div>

            {/* Brand statement */}
            <div className="mt-10 border-l-2 border-[#65B989] pl-6">
              <p className="text-xl font-medium leading-relaxed sm:text-2xl">
                "The future isn't something we wait for. It's something we build."
              </p>
              <span className="mt-3 block text-[10px] uppercase tracking-[0.2em] text-white/35">
                The ONEXA Philosophy
              </span>
            </div>
          </motion.div>
        </div>

        {/* Philosophy */}
        <div className="mt-28">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
          >
            <div>
              <span className="mb-4 block text-xs uppercase tracking-[0.25em] text-[#65B989]">
                What Drives Us
              </span>
              <h3 className="text-3xl font-medium sm:text-5xl">
                Our Core Philosophy.
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/40">
              Three principles that shape every decision, every project,
              and every experience we create.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {principles.map((item, index) => (
              <motion.div
                key={item.number}
                initial={reducedMotion ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: reducedMotion ? 0 : index * 0.12,
                }}
                whileHover={reducedMotion ? undefined : { y: -6 }}
                className="group rounded-2xl border border-white/10 bg-[#111411] p-8 transition-colors duration-300 hover:border-[#65B989]/40"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="font-mono text-sm text-white/30">
                    / {item.number}
                  </span>
                  <span className="text-xl text-[#65B989] transition-transform duration-300 group-hover:rotate-45">
                    ↗
                  </span>
                </div>

                <h4 className="mb-4 text-2xl font-medium">
                  {item.title}
                </h4>

                <p className="text-sm leading-7 text-white/45">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* OPI² highlight */}
        <motion.div
          id="opi2"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-24 overflow-hidden rounded-3xl border border-[#65B989]/20 bg-[#101812] p-8 sm:p-12 lg:p-16"
        >
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#28784A]/20 blur-[100px]" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.25em] text-[#65B989]">
                Beyond Conventional AI
              </span>

              <h3 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                Meet OPI<sup className="text-[#65B989]">2</sup>
              </h3>

              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/40">
                ONEXA Personalized Intelligence
              </p>
            </div>

            <div>
              <p className="text-base leading-8 text-white/55">
                We're building toward a more personalized approach to
                intelligent technology. OPI² represents our vision of
                combining AI, automation, and personalized intelligence
                to create smarter digital experiences.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#65B989]" />
                <span className="text-xs uppercase tracking-[0.18em] text-[#65B989]">
                  Intelligence with purpose.
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Closing statement */}
        <div className="mt-24 border-t border-white/10 pt-12">
          <p className="text-center text-sm uppercase tracking-[0.2em] text-white/30">
            One vision. Endless possibilities.
          </p>

          <h3 className="mt-5 text-center text-3xl font-medium tracking-tight sm:text-5xl">
            This is just the <span className="text-[#65B989]">beginning.</span>
          </h3>
        </div>

      </div>
    </section>
  );
}
