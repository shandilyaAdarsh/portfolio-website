"use client";

import React from "react";
import { Reveal, TextReveal, FadeScale, SectionReveal } from "@/components/ui/animation-primitives";
import { personalData } from "@/data/personal";
import { socialLinksData } from "@/data/social";
import { ArrowUpRight } from "lucide-react";

export const ContactSection: React.FC = () => {
  const linkedinLink =
    socialLinksData.find((s) => s.id === "linkedin")?.url || "https://linkedin.com";
  const githubLink =
    socialLinksData.find((s) => s.id === "github")?.url || "https://github.com/shandilyaAdarsh";

  return (
    <section
      id="contact"
      className="relative w-full border-t border-white/[0.08] bg-transparent px-6 py-28 sm:px-10 sm:py-40 lg:px-16"
    >
      <div className="mx-auto max-w-[1600px] space-y-16 sm:space-y-24">
        {/* Section Tag */}
        <div className="border-b border-white/[0.08] pb-6">
          <SectionReveal>
            <p className="font-mono text-xs tracking-widest text-[#C8C8DC] uppercase">
              GET IN TOUCH
            </p>
          </SectionReveal>
        </div>

        {/* Huge Typographic Statement */}
        <div className="max-w-5xl space-y-6">
          <TextReveal>
            <h2 className="tracking-display text-[12vw] leading-[0.88] font-black text-[#F2F2F2] uppercase sm:text-[9vw]">
              LET&apos;S BUILD SOMETHING USEFUL.
            </h2>
          </TextReveal>

          <Reveal delay={0.2}>
            <p className="max-w-2xl pt-4 text-base leading-relaxed text-[#DCDCE8] sm:text-xl">
              Have an idea, product, internship, freelance opportunity, or engineering problem?
              Let&apos;s talk.
            </p>
          </Reveal>
        </div>

        {/* Massive Interactive Links List */}
        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          <FadeScale delay={0.1}>
            <a
              href={`mailto:${personalData.email}`}
              className="group flex items-center justify-between py-8 transition-colors hover:text-amber-400 sm:py-12"
            >
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] text-[#C8C8DC] tracking-widest uppercase">DIRECT EMAIL</span>
                <p className="link-underline text-2xl font-bold tracking-tight text-[#F2F2F2] transition-colors group-hover:text-amber-400 sm:text-4xl lg:text-5xl">
                  {personalData.email}
                </p>
              </div>
              <ArrowUpRight className="h-8 w-8 shrink-0 text-[#555] transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:text-amber-400 group-hover:scale-110 sm:h-12 sm:w-12" />
            </a>
          </FadeScale>

          <FadeScale delay={0.15}>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-8 transition-colors hover:text-amber-400 sm:py-12"
            >
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] text-[#C8C8DC] tracking-widest uppercase">PROFESSIONAL NETWORK</span>
                <p className="link-underline text-2xl font-bold tracking-tight text-[#F2F2F2] transition-colors group-hover:text-amber-400 sm:text-4xl lg:text-5xl">
                  LINKEDIN PROFILE
                </p>
              </div>
              <ArrowUpRight className="h-8 w-8 shrink-0 text-[#555] transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:text-amber-400 group-hover:scale-110 sm:h-12 sm:w-12" />
            </a>
          </FadeScale>

          <FadeScale delay={0.2}>
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-8 transition-colors hover:text-amber-400 sm:py-12"
            >
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] text-[#C8C8DC] tracking-widest uppercase">CODE REPOSITORIES</span>
                <p className="link-underline text-2xl font-bold tracking-tight text-[#F2F2F2] transition-colors group-hover:text-amber-400 sm:text-4xl lg:text-5xl">
                  GITHUB @shandilyaAdarsh
                </p>
              </div>
              <ArrowUpRight className="h-8 w-8 shrink-0 text-[#555] transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:text-amber-400 group-hover:scale-110 sm:h-12 sm:w-12" />
            </a>
          </FadeScale>
        </div>
      </div>
    </section>
  );
};
