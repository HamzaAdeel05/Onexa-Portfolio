
"use client";

import OnexaOrb from "./EnergyOrb";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-[#080a09] text-[#f3f5f2]"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_78%_45%,rgba(30,83,54,0.17),transparent_42%),radial-gradient(ellipse_at_10%_90%,rgba(120,25,40,0.09),transparent_38%)]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "75px 75px",
          maskImage:
            "linear-gradient(to right, transparent, black 35%, black 85%, transparent)",
        }}
      />

      {/* Main container */}
      <div className="mx-auto grid w-[90%] max-w-[1320px] grid-cols-1 items-center gap-0 pt-28 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[30px] lg:py-28">

        {/* LEFT CONTENT */}
        <div className="relative z-10 text-center lg:text-left">

          {/* Eyebrow */}
          <div className="mb-8 flex items-center justify-center gap-3 text-[10px] font-semibold tracking-[2px] text-[#a8b2aa] lg:justify-start">
            <span className="h-[7px] w-[7px] rounded-full bg-[#77bd86] shadow-[0_0_12px_rgba(119,189,134,0.8)]" />
            AI & AUTOMATION · SOFTWARE DEVELOPMENT
          </div>

          {/* Heading */}
          <h1 className="mx-auto flex max-w-[650px] flex-col text-[clamp(55px,7vw,100px)] leading-[0.99] font-semibold tracking-[-5px] lg:mx-0">
            <span>We build</span>
            <span className="text-[#79a986]">
              intelligent
            </span>
            <span>experiences.</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-[30px] mb-[35px] max-w-[480px] text-[14px] leading-[1.9] text-[#9da59e] sm:text-base lg:mx-0">
            From intelligent automation to powerful digital
            solutions, we turn ambitious ideas into technology
            that moves businesses forward.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-[15px] lg:justify-start">

            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-6 rounded-[3px] bg-[#d5e5d7] px-[22px] py-4 text-xs font-semibold text-[#101510] transition-all duration-300 hover:-translate-y-[3px] hover:bg-white"
            >
              Start a Project
              <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-6 rounded-[3px] border border-[#343b36] px-[22px] py-4 text-xs font-semibold text-[#e1e7e1] transition-all duration-300 hover:border-[#79a986] hover:text-[#79a986]"
            >
              Explore What We Do
              <span className="transition-transform group-hover:translate-y-1">
                ↓
              </span>
            </a>

          </div>

          {/* Bottom information */}
          <div className="mx-auto mt-[55px] flex max-w-[480px] justify-between border-t border-[#252c27] pt-[18px] text-[8px] tracking-[1.5px] text-[#68726a] sm:text-[9px] lg:mx-0 lg:mt-[95px]">
            <span>01 / INTRODUCTION</span>
            <span>BUILT FOR WHAT'S NEXT.</span>
          </div>

        </div>

        {/* RIGHT 3D VISUAL */}
        <div className="relative flex min-w-0 items-center justify-center">

          {/* Orb glow */}
          <div className="pointer-events-none absolute aspect-square w-[85%] rounded-full bg-[radial-gradient(circle,rgba(72,116,85,0.17),rgba(120,25,40,0.04)_48%,transparent_72%)] blur-[35px]" />

          {/* Existing 3D Orb */}
          <div className="relative z-[1] w-full max-w-[570px]">
            <OnexaOrb
              label="OPI² · ONEXA PERSONALIZED INTELLIGENCE"
              className="!h-[380px] w-full sm:!h-[500px] lg:!h-[570px]"
            />
          </div>

          {/* Floating OPI² tag */}
          <div className="absolute bottom-[12%] left-[5%] z-[3] flex items-center gap-3 border border-[#87a58c]/20 bg-[#101612]/80 px-3 py-3 backdrop-blur-[15px] sm:px-5 sm:py-4 lg:bottom-[19%] lg:left-0">

            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#77bd86] shadow-[0_0_12px_rgba(119,189,134,0.8)]" />

            <div>
              <span className="block text-[10px] tracking-[1.5px] text-[#e5eee6]">
                OPI² SYSTEM
              </span>

              <span className="mt-1 block text-[9px] text-[#89968b]">
                Intelligence in motion
              </span>
            </div>

          </div>

          {/* Orb caption */}
          <div className="absolute right-0 bottom-[2%] flex gap-2 text-[7px] tracking-[1px] text-[#727e74] sm:gap-5 sm:text-[9px]">
            <span>FIG. 001</span>
            <span>INTELLIGENCE / REDEFINED</span>
          </div>

        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[18px] left-1/2 flex -translate-x-1/2 items-center gap-[13px] text-[9px] tracking-[2px] text-[#758078] sm:bottom-7">
        <span>SCROLL TO EXPLORE</span>
        <div className="h-px w-[35px] bg-[#79a986]" />
      </div>

    </section>
  );
}
