"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSceneVisibility } from "./useSceneVisibility";

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
  dashboardLabels: [string, string, string];
  dashboardValues: [string, string, string];
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
    description: "A B2B lead-generation and outreach platform. Find businesses, enrich and qualify prospects from their websites, then create tailored email campaigns and track leads through one CRM workflow.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "SQLite", "Foursquare API", "Gemini AI", "SMTP"],
    features: ["Business discovery", "Website data extraction", "AI lead qualification", "Personalized email drafts", "Campaign review and sending", "Lead tracking and Excel export"],
    preview: "B2B LEAD GENERATION DASHBOARD",
    dashboardLabels: ["PROSPECTING", "EMAIL OUTREACH", "LEAD PIPELINE"],
    dashboardValues: ["FIND + QUALIFY", "AI PERSONALIZED", "TRACK + MANAGE"], demoUrl: "#contact", githubUrl: "#contact",
    visualization: "business-network", accent: "#73e8c2", secondary: "#68a8ff", revealRange: 1.1,
    supportingDisplays: ["Lead discovery", "Qualified businesses", "Email preview", "Campaign manager", "Outreach analytics", "Email activity", "Business profiles", "Workflow status"].map((label, i) => ({ label, kind: (["analytics", "table", "conversation", "interface", "chart", "analytics", "table", "network"] as DisplayKind[])[i] })),
  },
  {
    number: "02", title: "MediGuide AI", category: "Healthcare AI",
    description: "An AI-assisted symptom assessment prototype. People describe symptoms and receive a structured, educational overview with possible explanations and urgency guidance. It is designed for informational support, not medical diagnosis.",
    technologies: ["Python", "Streamlit", "LangChain", "OpenAI API"],
    features: ["Guided symptom intake", "AI-generated assessment", "Possible explanations", "Urgency guidance", "Educational health information"],
    preview: "SYMPTOM ASSESSMENT & HEALTH GUIDANCE",
    dashboardLabels: ["SYMPTOM INPUT", "AI ASSESSMENT", "HEALTH GUIDANCE"],
    dashboardValues: ["USER PROVIDED", "EDUCATIONAL", "NOT DIAGNOSIS"], demoUrl: "#contact", githubUrl: "#contact",
    visualization: "medical-intelligence", accent: "#71e5e9", secondary: "#b8a1ff", revealRange: 1.05,
    supportingDisplays: ["Assistant conversation", "Health information", "Care topics", "Knowledge pathways", "Application preview", "Information index", "Response context", "Topic analytics"].map((label, i) => ({ label, kind: (["conversation", "documents", "table", "network", "interface", "documents", "conversation", "chart"] as DisplayKind[])[i] })),
  },
  {
    number: "03", title: "FinWise AI", category: "Financial Technology / AI",
    description: "A personal-finance assistant for understanding monthly cash flow. Enter income, savings, expenses, currency, and a financial goal to get spending analysis, budget ideas, and a practical action plan.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "LangChain", "OpenAI"],
    features: ["Income and expense breakdown", "Multiple currencies", "Goal-aware analysis", "Financial health summary", "Budget and savings recommendations", "Streaming follow-up guidance"],
    preview: "PERSONAL FINANCE & BUDGET ANALYSIS",
    dashboardLabels: ["FINANCE INPUT", "AI ANALYSIS", "RECOMMENDATIONS"],
    dashboardValues: ["INCOME + SPENDING", "CASH FLOW", "NEXT STEPS"], demoUrl: "#contact", githubUrl: "#contact",
    visualization: "financial-globe", accent: "#83dfff", secondary: "#c69bff", revealRange: 1.05,
    supportingDisplays: ["Financial overview", "Market signals", "Analysis trends", "Performance metrics", "Data insights", "Portfolio view", "Trend analysis", "API status"].map((label, i) => ({ label, kind: (["analytics", "chart", "chart", "analytics", "table", "interface", "chart", "network"] as DisplayKind[])[i] })),
  },
  {
    number: "04", title: "ReadMe AI", category: "Artificial Intelligence / RAG",
    description: "A document-grounded question-answering assistant. Upload documents, then ask questions in natural language; it retrieves relevant passages from a FAISS index and gives the language model context for its answer.",
    technologies: ["Python", "LangChain", "Streamlit", "FAISS", "LLM API"],
    features: ["Document upload and processing", "Text chunking and embeddings", "Semantic search with FAISS", "Context-grounded answers"],
    preview: "DOCUMENT SEARCH & QUESTION ANSWERING",
    dashboardLabels: ["DOCUMENT UPLOAD", "RETRIEVAL", "ANSWER"],
    dashboardValues: ["YOUR SOURCES", "FAISS SEARCH", "GROUNDED"], demoUrl: "#contact", githubUrl: "#contact",
    visualization: "knowledge-graph", accent: "#a8c8ff", secondary: "#81e2c9", revealRange: 1.05,
    supportingDisplays: ["Document index", "Knowledge retrieval", "Question and answer", "Source documents", "Vector search", "Connected topics", "Search activity", "Context chunks"].map((label, i) => ({ label, kind: (["documents", "network", "conversation", "documents", "analytics", "network", "chart", "table"] as DisplayKind[])[i] })),
  },
];

export default function SelectedWork() {
  const reducedMotion = useReducedMotion();
  const progress = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const scene = useSceneVisibility<HTMLDivElement>();

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
      <div ref={scene.ref} className="absolute inset-0 z-0">
        {scene.shouldRender && <ExhibitionWorld progress={progress} reducedMotion={Boolean(reducedMotion)} projects={exhibitionProjects} active={scene.visible} />}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-5 pb-5 pt-24 sm:px-8 sm:pb-8 lg:px-12 lg:pt-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[.28em] text-[#b4e8d7]/75 sm:text-[10px]"><span className="h-px w-8 bg-[#78e7c0]"/>ONEXA / IMMERSIVE PROJECT ARCHIVE</div>
          <div className="text-right font-mono text-[9px] tracking-[.2em] text-white/55 sm:text-[10px]">{project.number} <span className="text-white/25">/ {String(exhibitionProjects.length).padStart(2, "0")}</span><div className="mt-2 flex justify-end gap-1">{exhibitionProjects.map((item, i) => <span key={item.number} className={`h-px w-5 transition-colors ${i === active ? "bg-[#76e8c0]" : "bg-white/25"}`} />)}</div></div>
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true" className="pointer-events-none absolute bottom-5 left-4 z-20 w-[calc(100%-2rem)] max-w-[440px] border border-white/15 bg-[#03090d]/75 p-4 shadow-[0_18px_60px_rgba(0,0,0,.38)] backdrop-blur-md sm:bottom-10 sm:left-8 sm:p-5 lg:bottom-12 lg:left-12">
        <AnimatePresence initial={false}>
          <motion.article key={project.number} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reducedMotion ? 0 : .24 }}>
            <div className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[.2em] text-white/50 sm:text-[9px]">
              <span className="h-px w-5" style={{ backgroundColor: project.accent }} />
              <span>{project.number} / {project.category}</span>
            </div>
            <h2 className="mt-2 text-xl font-medium leading-tight tracking-tight text-white sm:text-2xl">{project.title}</h2>
            <p className="mt-2 max-w-[62ch] text-[11px] leading-[1.55] text-white/75 sm:text-[13px] sm:leading-relaxed">{project.description}</p>
            <div className="mt-3">
              <p className="mb-1.5 text-[8px] font-medium uppercase tracking-[.18em] text-white/45 sm:text-[9px]">Technology</p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 7).map((technology) => <span key={technology} className="border border-white/10 bg-white/[.045] px-2 py-1 text-[8px] leading-none text-white/75 sm:text-[9px]">{technology}</span>)}
              </div>
            </div>
            <div className="mt-3 hidden sm:block">
              <p className="mb-1.5 text-[8px] font-medium uppercase tracking-[.18em] text-white/45 sm:text-[9px]">What it does</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {project.features.slice(0, 4).map((feature) => <span key={feature} className="text-[9px] leading-snug text-white/70"><span className="mr-1.5" style={{ color: project.accent }}>+</span>{feature}</span>)}
              </div>
            </div>
            <div className="mt-3 flex gap-4 border-t border-white/10 pt-2.5 text-[8px] font-medium uppercase tracking-[.16em] sm:text-[9px]">
              <a className="pointer-events-auto text-white/80 transition-colors hover:text-white" href={project.demoUrl}>Live Demo <span style={{ color: project.accent }}>↗</span></a>
              <a className="pointer-events-auto text-white/55 transition-colors hover:text-white" href={project.githubUrl}>GitHub <span style={{ color: project.accent }}>↗</span></a>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute bottom-5 right-5 z-10 hidden text-right text-[8px] uppercase tracking-[.18em] text-white/35 sm:block lg:bottom-10 lg:right-12">Vertical scroll moves the exhibition camera <span className="text-[#76e8c0]/70">↗</span></div>
    </section>
  );
}
