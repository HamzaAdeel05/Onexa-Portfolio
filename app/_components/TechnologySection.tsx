
"use client";

import { motion, useReducedMotion } from "framer-motion";

const technologies = [
  {
    id: "01",
    title: "AI & Intelligence",
    description:
      "Intelligent systems that understand, analyze, and assist.",
    tools: ["Python", "LLMs", "AI Agents", "LangChain"],
    icon: "✳",
    position: "top",
    color: "green",
  },
  {
    id: "02",
    title: "Automation",
    description:
      "Smarter workflows that reduce repetitive work and improve efficiency.",
    tools: ["n8n", "APIs", "Workflow Design", "Integrations"],
    icon: "⌘",
    position: "right",
    color: "red",
  },
  {
    id: "03",
    title: "Web Engineering",
    description:
      "Modern digital products built for performance and usability.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind"],
    icon: "</>",
    position: "bottom",
    color: "green",
  },
  {
    id: "04",
    title: "Data & Integration",
    description:
      "Connected systems that turn information into useful insights.",
    tools: ["MongoDB", "FastAPI", "REST APIs", "Databases"],
    icon: "◈",
    position: "left",
    color: "red",
  },
];

const nodes = [
  { x: 350, y: 75 },
  { x: 610, y: 250 },
  { x: 350, y: 425 },
  { x: 90, y: 250 },
];

export default function TechnologySection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="technology"
      className="relative overflow-hidden bg-[#090B09] px-5 py-28 text-white sm:px-8 lg:px-16"
    >
      {/* Background lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#174B32]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#3F9B68]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#65B989]">
              Technology / 06
            </span>
          </div>

          <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Powered by technology.
            <br />
            <span className="text-[#65B989]">
              Driven by intelligence.
            </span>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
            We combine modern engineering, artificial intelligence,
            automation, and connected technologies to create
            smarter digital experiences.
          </p>
        </motion.div>

        {/* Ecosystem */}
        <div className="relative mx-auto mb-24 hidden h-[580px] max-w-[900px] lg:block">

          {/* Connection lines */}
          <svg
            viewBox="0 0 700 500"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
          >
            {nodes.map((node, index) => (
              <g key={index}>
                <motion.path
                  d={`M350 250 L${node.x} ${node.y}`}
                  stroke={index % 2 === 0 ? "#39865A" : "#873642"}
                  strokeWidth="1.2"
                  strokeDasharray="5 7"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.65 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.2,
                  }}
                />

                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="4"
                  fill={index % 2 === 0 ? "#65B989" : "#E47B86"}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + index * 0.2 }}
                />
              </g>
            ))}

            {/* Moving connection particles */}
            {!reducedMotion &&
              nodes.map((node, index) => (
                <motion.circle
                  key={`particle-${index}`}
                  r="3"
                  fill={index % 2 === 0 ? "#65B989" : "#E47B86"}
                  animate={{
                    cx: [350, node.x],
                    cy: [250, node.y],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: index * 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              ))}
          </svg>

          {/* Central OPI² */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute left-1/2 top-1/2 z-20 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#65B989]/40 bg-[#101A13] shadow-[0_0_80px_rgba(63,155,104,0.15)]"
          >
            <div className="absolute inset-3 rounded-full border border-dashed border-[#65B989]/20" />

            <motion.div
              animate={reducedMotion ? undefined : { rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[-9px] rounded-full border border-[#65B989]/10 border-t-[#65B989]/60"
            />

            <span className="text-5xl font-semibold tracking-tight">
              OPI<sup className="text-[#65B989]">2</sup>
            </span>

            <span className="mt-3 text-[9px] uppercase tracking-[0.22em] text-white/45">
              ONEXA INTELLIGENCE
            </span>

            <span className="mt-2 text-[8px] text-[#65B989]">
              PERSONALIZED INTELLIGENCE
            </span>
          </motion.div>

          {/* Technology nodes */}
          {technologies.map((item, index) => {
            const positions = [
              "left-1/2 top-0 -translate-x-1/2",
              "right-0 top-1/2 -translate-y-1/2",
              "bottom-0 left-1/2 -translate-x-1/2",
              "left-0 top-1/2 -translate-y-1/2",
            ];

            const green = item.color === "green";

            return (
              <motion.div
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`absolute z-10 w-[225px] ${positions[index]}`}
              >
                <div className="group rounded-2xl border border-white/10 bg-[#111713]/95 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#65B989]/40 hover:bg-[#152019]">
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg ${
                        green
                          ? "border-[#65B989]/30 bg-[#174B32]/30 text-[#65B989]"
                          : "border-[#E47B86]/30 bg-[#641D29]/30 text-[#E47B86]"
                      }`}
                    >
                      {item.icon}
                    </span>

                    <span className="font-mono text-xs text-white/30">
                      / {item.id}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-medium">
                    {item.title}
                  </h3>

                  <p className="mb-5 text-xs leading-5 text-white/45">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/10 px-2 py-1 text-[9px] text-white/45"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile ecosystem */}
        <div className="mb-20 lg:hidden">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-8 flex h-44 w-44 flex-col items-center justify-center rounded-full border border-[#65B989]/40 bg-[#101A13] shadow-[0_0_60px_rgba(63,155,104,0.12)]"
          >
            <span className="text-5xl font-semibold">
              OPI<sup className="text-[#65B989]">2</sup>
            </span>
            <span className="mt-3 text-[9px] uppercase tracking-widest text-white/40">
              ONEXA INTELLIGENCE
            </span>
          </motion.div>

          <div className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-[#65B989]">
            ↓ Connected Technology Ecosystem
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {technologies.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reducedMotion ? 0 : index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#111713] p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl text-[#65B989]">
                    {item.icon}
                  </span>
                  <span className="font-mono text-xs text-white/30">
                    / {item.id}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-medium">
                  {item.title}
                </h3>

                <p className="mb-5 text-xs leading-6 text-white/45">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* OPI² explanation */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-[#65B989]/20 bg-[#101812] p-8 sm:p-12 lg:p-16"
        >
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#28784A]/20 blur-[100px]" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.25em] text-[#65B989]">
                Our Intelligence Vision
              </span>

              <h3 className="text-5xl font-semibold tracking-tight sm:text-7xl">
                OPI<sup className="text-[#65B989]">2</sup>
              </h3>

              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40">
                ONEXA Personalized Intelligence
              </p>
            </div>

            <div>
              <p className="text-sm leading-8 text-white/55 sm:text-base">
                OPI² represents our vision for personalized intelligence:
                bringing AI capabilities, automation, and connected systems
                together to create experiences that adapt to individual
                needs and business goals.
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

        {/* Technology statement */}
        <div className="mt-20 border-t border-white/10 pt-10 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-white/35">
            The technology is the foundation.
          </p>

          <h3 className="mt-5 text-3xl font-medium sm:text-5xl">
            Intelligence is the <span className="text-[#65B989]">difference.</span>
          </h3>
        </div>

      </div>
    </section>
  );
}
