
"use client";

const features = [
  {
    number: "01",
    title: "Pro Designer",
    subtitle: "DESIGN WITH PURPOSE",
    description:
      "We create distinctive digital experiences that combine creativity, clarity and functionality. Every detail has a purpose.",
    theme: "green",
    visual: "design",
  },
  {
    number: "02",
    title: "Future-Ready Technology",
    subtitle: "BUILT FOR WHAT'S NEXT",
    description:
      "From OPI² and intelligent systems to modern software, we build technology that helps businesses move forward.",
    theme: "red",
    visual: "technology",
  },
  {
    number: "03",
    title: "Fast & Efficient Execution",
    subtitle: "IDEAS INTO ACTION",
    description:
      "We value your time. Our focus is on clear planning, efficient execution and delivering practical solutions without unnecessary complexity.",
    theme: "green",
    visual: "execution",
  },
  {
    number: "04",
    title: "Perfection Until You're Satisfied",
    subtitle: "DETAILS MAKE THE DIFFERENCE",
    description:
      "Your feedback matters. We refine, improve and polish every solution with you until it meets the vision we set out to achieve.",
    theme: "red",
    visual: "perfection",
  },
];

function Visual({ type }: { type: string }) {
  if (type === "design") {
    return (
      <div className="relative flex h-full min-h-44 items-center justify-center">
        <div className="absolute h-36 w-36 rotate-45 border border-emerald-300/20 transition-all duration-700 group-hover:rotate-90 group-hover:scale-110" />
        <div className="absolute h-28 w-28 -rotate-12 rounded-2xl border border-emerald-300/30 transition-all duration-700 group-hover:rotate-12 group-hover:scale-110" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-300 text-4xl font-light text-black shadow-[0_0_50px_rgba(110,231,183,0.15)] transition-all duration-700 group-hover:rotate-12 group-hover:scale-110">
          ✳
        </div>
        <span className="absolute left-[20%] top-8 text-emerald-300/50 transition-transform duration-500 group-hover:-translate-y-3">✦</span>
        <span className="absolute bottom-7 right-[20%] text-emerald-300/50 transition-transform duration-500 group-hover:translate-y-3">✧</span>
      </div>
    );
  }

  if (type === "technology") {
    return (
      <div className="relative flex h-full min-h-44 items-center justify-center">
        <div className="absolute h-36 w-36 rounded-full border border-rose-300/20 transition-all duration-700 group-hover:scale-125 group-hover:border-rose-300/50" />
        <div className="absolute h-28 w-28 rounded-full border border-dashed border-rose-300/40 animate-[spin_18s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]" />
        <div className="absolute h-20 w-20 rounded-full bg-rose-400/10 blur-xl transition-all duration-500 group-hover:bg-rose-400/30" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-300/40 bg-rose-300/10 font-mono text-2xl text-rose-200 transition-all duration-500 group-hover:rotate-45">
          O²
        </div>
        <span className="absolute right-[22%] top-8 text-xs text-rose-300/60">01</span>
        <span className="absolute bottom-7 left-[22%] text-xs text-rose-300/60">∞</span>
      </div>
    );
  }

  if (type === "execution") {
    return (
      <div className="relative flex h-full min-h-44 items-center justify-center">
        <div className="flex items-center gap-3 transition-all duration-500 group-hover:scale-110">
          <div className="h-12 w-12 rounded-xl border border-emerald-300/30 bg-emerald-300/10 transition-all duration-500 group-hover:-translate-y-4" />
          <div className="flex flex-col gap-2">
            <div className="h-px w-10 bg-emerald-300/70 transition-all duration-500 group-hover:w-16" />
            <div className="h-px w-16 bg-emerald-300/30" />
            <div className="h-px w-10 bg-emerald-300/70 transition-all duration-500 group-hover:w-16" />
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-300/10 text-3xl text-emerald-200 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
            →
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-px w-10 bg-emerald-300/70 transition-all duration-500 group-hover:w-16" />
            <div className="h-px w-16 bg-emerald-300/30" />
            <div className="h-px w-10 bg-emerald-300/70 transition-all duration-500 group-hover:w-16" />
          </div>
          <div className="h-12 w-12 rounded-xl border border-emerald-300/30 bg-emerald-300/10 transition-all duration-500 group-hover:translate-y-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-44 items-center justify-center">
      <div className="absolute h-36 w-36 rounded-full border border-rose-300/20 transition-all duration-700 group-hover:scale-110" />
      <div className="absolute h-28 w-28 rounded-full border border-dashed border-rose-300/40 animate-[spin_20s_linear_infinite] group-hover:animate-[spin_5s_linear_infinite]" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-rose-300/40 bg-rose-300/10 text-3xl text-rose-200 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(251,113,133,0.2)]">
        ✓
      </div>
      <span className="absolute right-[20%] top-8 text-rose-300/60">✦</span>
      <span className="absolute bottom-8 left-[20%] text-rose-300/60">✧</span>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#090a09] px-5 py-24 text-white sm:px-8 lg:px-16 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/[0.06] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-emerald-300" />
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                03 / Why ONEXA
              </span>
            </div>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              What makes us
              <br />
              <span className="text-white/40">different.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/50 sm:text-base">
            Great solutions begin with understanding. We bring together
            creativity, technology and execution to solve real business
            challenges.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((feature) => {
            const green = feature.theme === "green";

            return (
              <article
                key={feature.number}
                className="group relative grid min-h-[430px] grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#111311] transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-[#151815] sm:grid-cols-[1fr_0.9fr]"
              >
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full blur-[90px] transition-all duration-700 ${
                    green
                      ? "bg-emerald-400/[0.04] group-hover:bg-emerald-400/[0.13]"
                      : "bg-rose-400/[0.04] group-hover:bg-rose-400/[0.13]"
                  }`}
                />

                {/* Text area */}
                <div className="relative z-10 flex flex-col p-7 sm:p-8 lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-sm ${green ? "text-emerald-300" : "text-rose-300"}`}>
                      / {feature.number}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] text-white/30">
                      ONEXA
                    </span>
                  </div>

                  <div className="mt-auto pt-14">
                    <span className={`text-[10px] font-medium tracking-[0.22em] ${green ? "text-emerald-300/70" : "text-rose-300/70"}`}>
                      {feature.subtitle}
                    </span>

                    <h3 className="mt-4 max-w-sm text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                      {feature.title}
                    </h3>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-white/45 transition-colors duration-300 group-hover:text-white/70">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Visual area */}
                <div className="relative min-h-44 sm:min-h-full">
                  <Visual type={feature.visual} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111311] via-transparent to-transparent sm:bg-gradient-to-r sm:from-[#111311]/60 sm:via-transparent sm:to-transparent" />
                </div>

                {/* Animated bottom border */}
                <div className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full ${green ? "bg-emerald-300" : "bg-rose-300"}`} />
              </article>
            );
          })}
        </div>

        {/* Business-first message */}
        <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#111311] p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-emerald-400/[0.08] blur-[100px]" />

          <div className="relative max-w-4xl">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-300">
              Our vision
            </span>

            <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your business problem is{" "}
              <span className="text-emerald-300">our problem.</span>
            </h3>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/50">
              No matter what industry you're in or what challenge you're
              facing, we want to understand it. Our vision is simple:
              make business easier through meaningful solutions. We don't
              believe every business needs the same technology. We believe
              every business deserves the right solution.
            </p>

            <p className="mt-7 text-sm font-medium tracking-wide text-white/80">
              Your challenge. Our responsibility. A solution built together.
            </p>

            <a
              href="#contact"
              className="group mt-9 inline-flex items-center gap-4 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-6 py-4 text-sm text-emerald-200 transition-all duration-300 hover:bg-emerald-300 hover:text-black"
            >
              Let's solve it together
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
