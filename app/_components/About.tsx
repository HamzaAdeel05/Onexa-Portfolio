
"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden bg-[#0b0e0c] px-6 py-28 text-white sm:px-10 lg:px-20 lg:py-40"
    >
      {/* Background lighting */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#245c36]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1320px]">

        {/* Section label */}
        <div
          className={`mb-16 flex items-center gap-4 transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <span className="h-px w-10 bg-[#83a98a]" />
          <span className="text-[10px] tracking-[3px] text-[#91a095]">
            02 / WHO WE ARE
          </span>
        </div>

        {/* Main headline */}
        <div
          className={`max-w-[1100px] transition-all duration-1000 delay-150 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="text-[clamp(42px,7vw,92px)] leading-[1.08] font-medium tracking-[-4px]">
            ONE VISION.
            <br />
            <span className="text-[#35d98a]">LIMITLESS</span>
            <br />
            POSSIBILITIES.
          </h2>
        </div>

        {/* Description area */}
        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-white/10 pt-12 md:grid-cols-2 lg:mt-28">

          <div>
            <span className="text-[10px] tracking-[2px] text-[#829c86]">
              OUR PHILOSOPHY
            </span>

            <p className="mt-6 max-w-[520px] text-xl leading-[1.8] text-[#d0d6d0] sm:text-2xl">
              ONEXA is a technology-driven company focused on
              building intelligent digital experiences through
              software development, AI and automation.
            </p>
          </div>

          <div>
            <span className="text-[10px] tracking-[2px] text-[#829c86]">
              OUR VISION
            </span>

            <p className="mt-6 max-w-[520px] text-base leading-[2] text-[#8e9990]">
              We believe technology should do more than solve
              problems. It should create opportunities, simplify
              complexity and help businesses move forward.
              We bring ideas, engineering and intelligence
              together to make that happen.
            </p>
          </div>

        </div>

        {/* OPI² feature */}
        <div
          className={`relative mt-24 overflow-hidden border border-[#78947c]/20 bg-[#101712] p-8 transition-all duration-1000 delay-300 sm:p-12 lg:mt-36 lg:p-16 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#386c45]/20 blur-[100px]" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto]">

            <div>
              <span className="text-[10px] tracking-[3px] text-[#88ad8e]">
                INTRODUCING OUR INTELLIGENCE
              </span>

              <h3 className="mt-7 text-5xl font-medium tracking-[-3px] sm:text-7xl">
                OPI
              </h3>

              <h4 className="mt-3 text-sm tracking-[2px] text-[#c3cec5]">
                ONEXA PERSONALIZED INTELLIGENCE
              </h4>

              <p className="mt-8 max-w-[570px] text-sm leading-[2] text-[#929d94] sm:text-base">
                Our vision for personalized intelligence —
                bringing AI capabilities, intelligent workflows
                and automation together to create smarter,
                more connected digital experiences.
              </p>
            </div>

            {/* OPI² visual */}
            <div className="relative mx-auto flex h-48 w-48 items-center justify-center lg:h-64 lg:w-64">
              <div className="absolute inset-0 rounded-full border border-[#83a98a]/20 animate-[spin_25s_linear_infinite]" />

              <div className="absolute inset-5 rounded-full border border-[#83a98a]/20 animate-[spin_18s_linear_infinite_reverse]" />

              <div className="absolute inset-10 rounded-full bg-[#386c45]/20 blur-2xl" />

              <span className="relative text-5xl font-semibold tracking-[-3px] text-white lg:text-6xl">
                OPI
              </span>

              <span className="absolute right-5 top-8 h-2 w-2 rounded-full bg-[#88ad8e] shadow-[0_0_15px_#88ad8e]" />
              <span className="absolute bottom-8 left-5 h-1.5 w-1.5 rounded-full bg-[#a33c4d] shadow-[0_0_12px_#a33c4d]" />
            </div>

          </div>
        </div>

        {/* Brand statement */}
        <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center">

          <p className="text-xs tracking-[3px] text-[#8c978e]">
            ONE VISION. NEXT POSSIBILITIES.
          </p>

          <a
            href="#services"
            className="group flex items-center gap-4 text-sm text-[#d5e5d7] transition-colors hover:text-[#88ad8e]"
          >
            Discover our capabilities
            <span className="transition-transform group-hover:translate-x-2">
              →
            </span>
          </a>

        </div>

      </div>
    </section>
  );
}
