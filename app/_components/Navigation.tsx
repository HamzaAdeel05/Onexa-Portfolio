"use client";

import { useEffect, useState } from "react";

const links = [
  ["Home", "home"],
  ["Services", "services"],
  ["About", "about"],
  ["Projects", "work"],
  ["Contact", "contact"],
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "border-white/10 bg-[#090d0b]/85 shadow-lg shadow-black/10 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
      <nav aria-label="Main navigation" className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a href="#home" onClick={() => setOpen(false)} className="text-xl font-semibold tracking-[0.18em] text-[#f1f5f2]" aria-label="ONEXA home">
          ONE<span className="text-[#35d98a]">XA</span><span className="text-[#a51f32]">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} className="text-xs text-white/60 transition-colors hover:text-[#35d98a]">{label}</a>)}
          <a href="#contact" className="rounded-full border border-[#35d98a]/40 bg-[#16a05a]/10 px-5 py-2.5 text-xs font-medium text-[#dff9e9] transition hover:border-[#35d98a] hover:bg-[#16a05a]/20">Let&apos;s Talk <span aria-hidden="true">↗</span></a>
        </div>

        <button type="button" className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 text-white md:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen(!open)}>
          <span className={`h-px w-4 bg-current transition-transform ${open ? "translate-y-[4px] rotate-45" : ""}`} />
          <span className={`h-px w-4 bg-current transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && <div id="mobile-navigation" className="border-t border-white/10 bg-[#090d0b]/95 px-5 pb-6 pt-3 backdrop-blur-xl md:hidden">
        {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block border-b border-white/5 py-4 text-sm text-white/75">{label}</a>)}
        <a href="#contact" onClick={() => setOpen(false)} className="mt-5 inline-flex rounded-full bg-[#16a05a] px-5 py-3 text-sm font-medium text-white">Let&apos;s Talk <span className="ml-3" aria-hidden="true">↗</span></a>
      </div>}
    </header>
  );
}
