"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ExhibitionWorld = dynamic(() => import("./ProjectExhibitionWorld"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_45%,rgba(65,130,157,.22),transparent_58%)]" />,
});

export type DisplayKind = "analytics" | "table" | "conversation" | "chart" | "documents" | "network" | "interface";
export type SupportingDisplay = { label: string; kind: DisplayKind };
export type ExhibitionProject = {
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  preview: string;
  demoUrl: string;
  githubUrl: string;
  visualization: "business-network" | "medical-intelligence" | "financial-globe" | "knowledge-graph";
  accent: string;
  secondary: string;
  revealRange: number;
  supportingDisplays: SupportingDisplay[];
};

export const exhibitionProjects: ExhibitionProject[] = [
  {
    number: "01", title: "CUIBEX CRM", category: "AI Automation / SaaS / Business Intelligence",
    description: "An AI-powered business outreach and lead generation platform designed to automate prospect discovery, qualification, personalized email generation, and campaign management.",
    technologies: ["React / Next.js", "Python", "FastAPI", "SQLite", "AI integrations", "SMTP / Email automation", "Web scraping / Lead sourcing"],
    features: ["Automated lead discovery", "Business qualification", "Website outreach", "AI-personalized email generation", "Email campaign management", "Lead management", "Email tracking and analytics", "Multiple outreach workflows", "Business information extraction"],
    preview: "CUIBEX CRM DASHBOARD / SCREENSHOT PLACEHOLDER", demoUrl: "#contact", githubUrl: "#contact",
    visualization: "business-network", accent: "#73e8c2", secondary: "#68a8ff", revealRange: 1.1,
    supportingDisplays: ["Lead discovery", "Qualified businesses", "Email preview", "Campaign manager", "Outreach analytics", "Email activity", "Business profiles", "Workflow status"].map((label, i) => ({ label, kind: (["analytics", "table", "conversation", "interface", "chart", "analytics", "table", "network"] as DisplayKind[])[i] })),
  },
  {
    number: "02", title: "MediGuide AI", category: "Healthcare AI",
    description: "An AI-powered healthcare information assistant designed to provide an interactive interface for accessing medical information.",
    technologies: ["AI assistant", "Healthcare information", "Interactive application"],
    features: ["Interactive medical information assistant", "Conversational healthcare interface", "Accessible information experience", "Health data visualization"],
    preview: "MEDIGUIDE AI / SCREENSHOT PLACEHOLDER", demoUrl: "#contact", githubUrl: "#contact",
    visualization: "medical-intelligence", accent: "#71e5e9", secondary: "#b8a1ff", revealRange: 1.05,
    supportingDisplays: ["Assistant conversation", "Health information", "Care topics", "Knowledge pathways", "Application preview", "Information index", "Response context", "Topic analytics"].map((label, i) => ({ label, kind: (["conversation", "documents", "table", "network", "interface", "documents", "conversation", "chart"] as DisplayKind[])[i] })),
  },
  {
    number: "03", title: "FinWise AI", category: "Financial Technology / AI",
    description: "An AI-powered financial analysis application with an API-driven backend and modern frontend.",
    technologies: ["FastAPI", "AI analysis", "Modern frontend"],
    features: ["Financial analysis", "Interactive data insights", "API-driven backend", "Modern analysis interface"],
    preview: "FINWISE AI / SCREENSHOT PLACEHOLDER", demoUrl: "#contact", githubUrl: "#contact",
    visualization: "financial-globe", accent: "#83dfff", secondary: "#c69bff", revealRange: 1.05,
    supportingDisplays: ["Financial overview", "Market signals", "Analysis trends", "Performance metrics", "Data insights", "Portfolio view", "Trend analysis", "API status"].map((label, i) => ({ label, kind: (["analytics", "chart", "chart", "analytics", "table", "interface", "chart", "network"] as DisplayKind[])[i] })),
  },
  {
    number: "04", title: "ReadMe AI", category: "Artificial Intelligence / RAG",
    description: "An intelligent document question-answering application using retrieval-augmented generation and FAISS.",
    technologies: ["RAG", "FAISS", "AI", "Document retrieval"],
    features: ["Document question answering", "Retrieval-augmented generation", "FAISS vector search", "Connected information retrieval"],
    preview: "README AI / SCREENSHOT PLACEHOLDER", demoUrl: "#contact", githubUrl: "#contact",
    visualization: "knowledge-graph", accent: "#a8c8ff", secondary: "#81e2c9", revealRange: 1.05,
    supportingDisplays: ["Document index", "Knowledge retrieval", "Question and answer", "Source documents", "Vector search", "Connected topics", "Search activity", "Context chunks"].map((label, i) => ({ label, kind: (["documents", "network", "conversation", "documents", "analytics", "network", "chart", "table"] as DisplayKind[])[i] })),
  },
];

export default function SelectedWork() {
  const reducedMotion = useReducedMotion();
  const progress = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (exhibitionProjects.length - 1)}`,
        pin: true,
        pinSpacing: true,
        refreshPriority: 0,
        scrub: reducedMotion ? false : 0.65,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.current = self.progress * (exhibitionProjects.length - 1);
          const index = Math.min(exhibitionProjects.length - 1, Math.round(progress.current));
          setActive((current) => current === index ? current : index);
        },
        onRefresh: (self) => {
          progress.current = self.progress * (exhibitionProjects.length - 1);
          const index = Math.min(exhibitionProjects.length - 1, Math.round(progress.current));
          setActive((current) => current === index ? current : index);
        },
      });
    }, sectionRef);
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => { window.clearTimeout(refreshTimer); context.revert(); };
  }, [reducedMotion]);

  const project = exhibitionProjects[active];

  return (
    <section ref={sectionRef} id="work" aria-label="ONEXA immersive project exhibition" className="relative isolate h-[100svh] min-h-[100svh] overflow-hidden bg-[#030609] text-white">
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(3,6,9,.04),transparent_24%,transparent_70%,rgba(3,6,9,.14)),linear-gradient(90deg,rgba(3,6,9,.04),transparent_36%,transparent_70%,rgba(3,6,9,.035)]" />
      <div className="absolute inset-0 z-0">
        <ExhibitionWorld progress={progress} reducedMotion={Boolean(reducedMotion)} projects={exhibitionProjects} activeIndex={active} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-5 pb-6 pt-24 sm:px-8 sm:pb-8 lg:px-12 lg:pt-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[.28em] text-[#b4e8d7]/75 sm:text-[10px]"><span className="h-px w-8 bg-[#78e7c0]"/>ONEXA / IMMERSIVE PROJECT ARCHIVE</div>
          <div className="text-right font-mono text-[9px] tracking-[.2em] text-white/55 sm:text-[10px]">{project.number} <span className="text-white/25">/ {String(exhibitionProjects.length).padStart(2, "0")}</span><div className="mt-2 flex justify-end gap-1">{exhibitionProjects.map((item, i) => <span key={item.number} className={`h-px w-5 transition-colors ${i === active ? "bg-[#76e8c0]" : "bg-white/25"}`} />)}</div></div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={project.number} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .22 }} className="max-w-[270px] text-[8px] uppercase tracking-[.18em] text-white/45 sm:max-w-none sm:text-[9px]">
            <span>Vertical scroll moves the exhibition camera </span><span className="text-[#76e8c0]/70">↗</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {project.number}. {project.title}. {project.category}. {project.description} Technologies: {project.technologies.join(", ")}. Features: {project.features.join(", ")}.
      </div>
    </section>
  );
}
