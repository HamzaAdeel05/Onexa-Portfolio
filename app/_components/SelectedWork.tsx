
"use client";

import { motion, useReducedMotion } from "framer-motion";

const projects = [
  {
    number: "01",
    name: "AI Outreach CRM",
    category: "AI & AUTOMATION",
    description:
      "An intelligent lead generation and email outreach platform designed to discover, qualify, and engage potential business clients.",
    technologies: ["Next.js", "Python", "FastAPI", "AI Agents"],
    type: "featured",
    visual: "crm",
    accent: "green",
  },
  {
    number: "02",
    name: "MediGuide AI",
    category: "ARTIFICIAL INTELLIGENCE",
    description:
      "An AI-powered healthcare assistant designed to make medical information more accessible through intelligent interactions.",
    technologies: ["Python", "Streamlit", "LLMs"],
    type: "normal",
    visual: "medical",
    accent: "red",
  },
  {
    number: "03",
    name: "FinWise AI",
    category: "AI & WEB DEVELOPMENT",
    description:
      "A smart financial analysis platform combining intelligent insights with a modern web experience.",
    technologies: ["Next.js", "FastAPI", "Python"],
    type: "normal",
    visual: "finance",
    accent: "red",
  },
  {
    number: "04",
    name: "ReadMe AI",
    category: "AI & AUTOMATION",
    description:
      "A document intelligence solution that uses retrieval-augmented generation to help users interact with their documents.",
    technologies: ["Python", "LangChain", "FAISS"],
    type: "featured",
    visual: "document",
    accent: "green",
  },
];

function ProjectPreview({ type }: { type: string }) {
  return (
    <div className="relative h-full min-h-[260px] w-full overflow-hidden rounded-xl bg-[#0A0D0B] p-5 sm:min-h-[340px] sm:p-8">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#ffffff18 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {type === "crm" && (
        <div className="relative mx-auto flex h-full max-w-lg gap-3">
          <div className="hidden w-20 flex-col gap-5 rounded-lg border border-white/10 bg-[#141B16] p-3 sm:flex">
            <div className="h-5 w-5 rounded bg-[#39865A]" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-2 w-full rounded bg-white/10" />
            ))}
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-white/80" />
              <div className="h-7 w-20 rounded-md bg-[#28623E]" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-[#151B17] p-3">
                  <div className="mb-3 h-2 w-10 rounded bg-white/20" />
                  <div className="h-5 w-12 rounded bg-[#65B989]/70" />
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-white/10 bg-[#151B17] p-4">
              <div className="mb-5 h-3 w-24 rounded bg-white/30" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="mb-4 flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-[#28623E]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 w-2/3 rounded bg-white/30" />
                    <div className="h-1.5 w-1/3 rounded bg-white/10" />
                  </div>
                  <div className="h-4 w-12 rounded-full bg-[#28623E]/60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {type === "medical" && (
        <div className="relative mx-auto flex h-full max-w-lg items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#151719] p-5 shadow-2xl sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#782D38] text-xl">✚</div>
              <div>
                <div className="h-3 w-24 rounded bg-white/80" />
                <div className="mt-2 h-2 w-16 rounded bg-white/20" />
              </div>
            </div>
            <div className="mb-4 h-3 w-3/4 rounded bg-white/60" />
            <div className="space-y-2">
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="h-2 w-5/6 rounded bg-white/10" />
              <div className="h-2 w-4/6 rounded bg-white/10" />
            </div>
            <div className="mt-6 rounded-xl border border-[#9C4651]/30 bg-[#642630]/20 p-4">
              <div className="mb-3 h-2 w-20 rounded bg-[#E47B86]" />
              <div className="h-2 w-full rounded bg-white/20" />
              <div className="mt-2 h-2 w-4/5 rounded bg-white/20" />
            </div>
            <div className="mt-5 h-10 rounded-lg bg-[#8C3541]" />
          </div>
        </div>
      )}

      {type === "finance" && (
        <div className="relative mx-auto flex h-full max-w-lg items-center justify-center">
          <div className="w-full rounded-2xl border border-white/10 bg-[#151A17] p-5 sm:p-7">
            <div className="mb-6 flex justify-between">
              <div>
                <div className="mb-2 h-2 w-20 rounded bg-white/30" />
                <div className="h-7 w-32 rounded bg-white/80" />
              </div>
              <div className="h-9 w-9 rounded-lg bg-[#326C48]" />
            </div>
            <div className="mb-5 flex h-32 items-end gap-2 border-b border-white/10 px-2">
              {[35, 50, 42, 65, 48, 75, 60, 90, 72, 100, 82, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-[#4A9668]/80" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/5 p-3">
                <div className="mb-2 h-2 w-14 rounded bg-white/20" />
                <div className="h-4 w-20 rounded bg-[#65B989]" />
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <div className="mb-2 h-2 w-14 rounded bg-white/20" />
                <div className="h-4 w-20 rounded bg-white/60" />
              </div>
            </div>
          </div>
        </div>
      )}

      {type === "document" && (
        <div className="relative mx-auto flex h-full max-w-lg items-center justify-center gap-4">
          <div className="hidden w-2/5 rotate-[-5deg] rounded-xl border border-white/10 bg-[#191D1A] p-5 sm:block">
            <div className="mb-5 h-4 w-20 rounded bg-white/60" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="mb-3 h-2 rounded bg-white/15" style={{ width: `${100 - i * 7}%` }} />
            ))}
          </div>
          <div className="z-10 w-4/5 rounded-xl border border-[#39865A]/40 bg-[#152019] p-5 shadow-2xl sm:w-3/5 sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#28623E] text-center leading-8">✦</div>
              <div className="h-3 w-24 rounded bg-white/70" />
            </div>
            <div className="mb-4 h-3 w-3/4 rounded bg-[#65B989]" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-2 rounded bg-white/15" style={{ width: `${100 - i * 8}%` }} />
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-[#28623E]/30 p-3">
              <div className="mb-2 h-2 w-16 rounded bg-[#65B989]" />
              <div className="h-2 w-full rounded bg-white/20" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SelectedWork() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-[#090B09] px-5 py-28 text-white sm:px-8 lg:px-16"
    >
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#174B32]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#3F9B68]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#65B989]">
                Selected Work / 04
              </span>
            </div>

            <h2 className="text-4xl font-medium leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Ideas made
              <br />
              <span className="text-[#65B989]">tangible.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/50 sm:text-base">
            A selection of digital experiences, intelligent systems, and
            creative solutions built to solve real-world problems.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              initial={reducedMotion ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: reducedMotion ? 0 : index * 0.12,
              }}
              className={`group min-w-0 ${
                project.type === "featured" ? "md:col-span-1" : ""
              }`}
            >
              {/* Project visual */}
              <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#111411]">
                <div className="absolute left-5 top-5 z-20 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/60 backdrop-blur-md">
                  Project {project.number}
                </div>

                <div className="transition-transform duration-700 ease-out group-hover:scale-[1.035]">
                  <ProjectPreview type={project.visual} />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                <div className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xl text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#65B989] group-hover:bg-[#28623E]">
                  ↗
                </div>
              </div>

              {/* Project information */}
              <div className="flex flex-col gap-4 px-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={`text-[10px] font-semibold tracking-[0.2em] ${
                    project.accent === "green"
                      ? "text-[#65B989]"
                      : "text-[#E47B86]"
                  }`}>
                    {project.category}
                  </span>

                  <span className="font-mono text-xs text-white/30">
                    / {project.number}
                  </span>
                </div>

                <h3 className="text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-[#65B989] sm:text-3xl">
                  {project.name}
                </h3>

                <p className="max-w-lg text-sm leading-7 text-white/45">
                  {project.description}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-white/55 transition-colors group-hover:border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center"
        >
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#65B989]">
              Have an idea?
            </p>
            <h3 className="text-2xl font-medium sm:text-3xl">
              Let's make something meaningful.
            </h3>
          </div>

          <a
            href="#contact"
            className="group flex items-center gap-4 rounded-full border border-white/20 px-6 py-4 text-sm transition-all duration-300 hover:border-[#65B989] hover:bg-[#174B32]/30"
          >
            Start a Project
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
