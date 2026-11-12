
"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ContactSection() {
  const reducedMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "Web Development",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Project Inquiry - ${form.service}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "Not provided"}\nService: ${form.service}\n\nProject Details:\n${form.message}`
    );

    window.location.href =
      `mailto:info@onexa.com?subject=${subject}&body=${body}`;
  };

  const fadeUp = {
    initial: reducedMotion ? false : { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7 },
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#090B09] px-5 pt-28 text-white sm:px-8 lg:px-16"
    >
      {/* Background lighting */}
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#174B32]/15 blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 bottom-40 h-96 w-96 rounded-full bg-[#7B202C]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div {...fadeUp} className="mb-20">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#3F9B68]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#65B989]">
              Contact / 07
            </span>
          </div>

          <h2 className="text-5xl font-medium leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl">
            Have an idea?
            <br />
            <span className="text-[#65B989]">
              Let's make it happen.
            </span>
          </h2>

          <p className="mt-8 max-w-lg text-sm leading-7 text-white/45 sm:text-base">
            Whether you're building something new, transforming
            your business, or exploring what's possible with AI,
            we'd love to hear about it.
          </p>
        </motion.div>

        {/* Main contact area */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

          {/* Contact information */}
          <motion.div {...fadeUp} className="flex flex-col">

            <span className="mb-8 text-xs uppercase tracking-[0.25em] text-[#65B989]">
              Get in Touch
            </span>

            <h3 className="mb-5 text-3xl font-medium sm:text-4xl">
              Let's start a conversation.
            </h3>

            <p className="mb-10 max-w-sm text-sm leading-7 text-white/45">
              Tell us what you're thinking. We'll help you
              explore the possibilities and find the right
              direction for your project.
            </p>

            {/* Email */}
            <a
              href="mailto:info@onexa.com"
              className="group mb-8 flex items-center gap-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#65B989]/20 bg-[#174B32]/20 text-xl text-[#65B989] transition-colors group-hover:bg-[#174B32]/40">
                ✉
              </div>

              <div>
                <span className="mb-1 block text-xs text-white/35">
                  Email Us
                </span>
                <span className="text-base transition-colors group-hover:text-[#65B989]">
                  info@onexa.com
                </span>
              </div>
            </a>

            {/* Location */}
            <div className="mb-12 flex items-center gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E47B86]/20 bg-[#641D29]/20 text-xl text-[#E47B86]">
                ◎
              </div>

              <div>
                <span className="mb-1 block text-xs text-white/35">
                  Our Presence
                </span>
                <span className="text-base">
                  Pakistan · Working Worldwide
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-auto border-t border-white/10 pt-8">
              <span className="mb-5 block text-xs uppercase tracking-[0.2em] text-white/35">
                Connect with ONEXA
              </span>

              <a href="mailto:info@onexa.com" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs text-white/55 transition-all duration-300 hover:border-[#65B989]/50 hover:text-[#65B989]">Email ONEXA <span aria-hidden="true">↗</span></a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-white/10 bg-[#111411] p-6 sm:p-10"
          >
            <div className="mb-9 flex items-center justify-between">
              <div>
                <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#65B989]">
                  Project Inquiry
                </span>
                <h3 className="text-2xl font-medium">
                  Tell us about your idea.
                </h3>
              </div>

              <span className="hidden text-3xl text-[#65B989] sm:block">
                ↗
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">

              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="mb-3 block text-xs text-white/50">
                  Your Name
                </label>

                <input
                  required
                  id="contact-name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#65B989]"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="mb-3 block text-xs text-white/50">
                  Email Address
                </label>

                <input
                  required
                  id="contact-email"
                  type="email"
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#65B989]"
                />
              </div>

              {/* Optional company */}
              <div>
                <label htmlFor="contact-company" className="mb-3 block text-xs text-white/50">Company <span className="text-white/30">(optional)</span></label>
                <input
                  id="contact-company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company name"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#65B989]"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="contact-service" className="mb-3 block text-xs text-white/50">
                  What are you looking for?
                </label>

                <select
                  id="contact-service"
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className="w-full border-b border-white/15 bg-[#111411] py-3 text-sm text-white outline-none focus:border-[#65B989]"
                >
                  <option>Web Development</option>
                  <option>AI Solutions</option>
                  <option>AI Agents & Automation</option>
                  <option>UI/UX Design</option>
                  <option>Custom Software</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="mb-3 block text-xs text-white/50">
                  Tell us about your project
                </label>

                <textarea
                  required
                  id="contact-message"
                  rows={4}
                  placeholder="I have an idea for..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full resize-none border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#65B989]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-between rounded-full bg-[#28623E] px-7 py-5 text-sm font-medium transition-all duration-300 hover:bg-[#39865A]"
              >
                Send Project Inquiry

                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </button>

              <p className="text-center text-[10px] leading-5 text-white/30">
                Submitting opens your default email application
                with your project details prepared.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Big closing statement */}
        <motion.div
          {...fadeUp}
          className="relative mt-32 overflow-hidden border-y border-white/10 py-20 text-center"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#174B32]/15 blur-[100px]" />

          <p className="relative mb-6 text-xs uppercase tracking-[0.3em] text-[#65B989]">
            One Vision. Next Future.
          </p>

          <h3 className="relative text-6xl font-semibold tracking-[-0.07em] sm:text-8xl lg:text-[140px]">
            ONE<span className="text-[#65B989]">XA</span>
            <span className="text-[#A12D3B]">.</span>
          </h3>

          <p className="relative mt-5 text-xs uppercase tracking-[0.2em] text-white/35">
            Let's build what's next.
          </p>
        </motion.div>

        {/* Footer */}
        <footer className="py-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>
              <a href="#home" className="text-2xl font-semibold tracking-[0.2em]">
                ONE<span className="text-[#65B989]">XA</span>.
              </a>

              <p className="mt-3 text-xs text-white/35">
                Technology. Creativity. Intelligence.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-7 gap-y-4 text-xs text-white/45">
              {[
                ["Home", "#home"],
                ["Services", "#services"],
                ["Work", "#work"],
                ["About", "#about"],
                ["Contact", "#contact"],
              ].map(([name, link]) => (
                <a
                  key={name}
                  href={link}
                  className="transition-colors hover:text-[#65B989]"
                >
                  {name}
                </a>
              ))}
            </div>

            <span className="text-xs text-white/30">
            © 2026 ONEXA. All rights reserved.
            </span>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.15em] text-white/25 sm:flex-row">
            <span>Designed with purpose. Built for tomorrow.</span>
            <span>One Vision. Next Future.</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
