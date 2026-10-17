"use client";

import React from "react";
import { Reveal, TextReveal, FadeScale, SectionReveal } from "@/components/ui/animation-primitives";
import { personalData } from "@/data/personal";
import { Terminal, Cpu, ArrowUpRight } from "lucide-react";

export const IntroSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden border-t border-white/[0.08] bg-transparent px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1600px] space-y-20 sm:space-y-28">
        {/* Large Typographic Headline */}
        <div className="max-w-5xl">
          <TextReveal delay={0.1}>
            <h2 className="text-3xl leading-[1.08] font-bold tracking-tight text-[#F2F2F2] uppercase sm:text-5xl md:text-6xl lg:text-7xl">
              I BUILD DIGITAL SYSTEMS THAT TURN{" "}
              <span className="text-gradient-gold">COMPLEX PROBLEMS</span>{" "}
              INTO SIMPLE EXPERIENCES.
            </h2>
          </TextReveal>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 items-start gap-12 border-t border-white/[0.06] pt-8 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Abstract Architecture Artifact */}
          <div className="lg:col-span-5">
            <FadeScale delay={0.2}>
              <div className="relative space-y-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0806] p-6 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 font-mono text-xs text-[#C8C8DC]">
                  <span className="flex items-center gap-2 text-[#F2F2F2]">
                    <Terminal className="h-4 w-4 text-amber-400" />
                    <span>ENGINEERING_PROFILE</span>
                  </span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-start justify-between">
                    <span className="text-[#C8C8DC]">ACTIVE_ROLES</span>
                    <span className="text-right text-[#F2F2F2]">G8G Agency / Elevance</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-[#C8C8DC]">PRIMARY_STACK</span>
                    <span className="text-right text-[#F2F2F2]">Next.js • Supabase • TS</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-[#C8C8DC]">SPECIALIZATION</span>
                    <span className="text-right text-amber-400">Multi-Tenant SaaS / RLS</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-[#C8C8DC]">DSA_SOLUTIONS</span>
                    <span className="text-right text-emerald-400">150+ LeetCode & CodeStudio</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-4 w-4 text-amber-400" />
                    <div>
                      <p className="text-xs font-semibold text-[#F2F2F2]">Event Concurrency</p>
                      <p className="text-[10px] text-[#C8C8DC]">Supabase Realtime Floor Sync</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-emerald-400">OPTIMAL</span>
                </div>
              </div>
            </FadeScale>
          </div>

          {/* Right Column: Carefully Written Editorial Narrative */}
          <div className="space-y-8 lg:col-span-7">
            <Reveal delay={0.3}>
              <div className="space-y-6 text-base leading-relaxed text-[#DCDCE8] sm:text-lg">
                <p className="text-xl leading-snug font-medium text-[#F2F2F2] sm:text-2xl">
                  I&apos;m a full-stack developer focused on building production-ready web
                  applications, SaaS platforms, realtime systems, and robust cloud architectures.
                </p>
                <p>
                  My work combines product thinking with engineering — from frontend experiences to
                  backend architecture, databases, APIs, and deployment.
                </p>
                <p className="text-sm text-[#C8C8DC]">
                  Currently contributing to high-concurrency production tools at{" "}
                  <span className="text-[#F2F2F2]">G8G Agency</span> and advancing scalable
                  full-stack web workflows at <span className="text-[#F2F2F2]">Elevance Skill</span>
                  .
                </p>
              </div>
            </Reveal>

            {/* Quick Links / Highlights */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-8 border-t border-white/[0.06] pt-6 font-mono text-xs tracking-widest text-[#C8C8DC]">
                <a
                  href={`mailto:${personalData.email}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-[#F2F2F2]"
                >
                  <span>{personalData.email}</span>
                  <ArrowUpRight className="h-3 w-3 text-amber-400" />
                </a>
                <span>ROORKEE, INDIA</span>
                <span className="text-amber-400">AVAILABLE FOR NEW OPPORTUNITIES</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
