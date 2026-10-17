"use client";

import React from "react";
import { Reveal, TextReveal, FadeScale, SectionReveal } from "@/components/ui/animation-primitives";

export const AboutSection: React.FC = () => {
  const focusAreas = [
    {
      title: "FULL-STACK DEVELOPMENT",
      description:
        "Building production Next.js App Router architectures, robust TypeScript codebases, and performant REST APIs.",
    },
    {
      title: "REALTIME SYSTEMS",
      description:
        "Low-latency bidirectional WebSocket synchronization using Supabase Realtime for operational dispatch and live state tracking.",
    },
    {
      title: "SAAS ARCHITECTURE",
      description:
        "Multi-tenant cloud infrastructure with PostgreSQL Row-Level Security (RLS), role-based permissions, and isolated tenant partitions.",
    },
    {
      title: "ALGORITHMIC PROBLEM SOLVING",
      description:
        "150+ DSA challenges solved across LeetCode & CodeStudio. Deep foundation in two-pointer, sliding window, recursion, and linked lists.",
    },
  ];

  return (
    <section className="relative w-full border-t border-white/[0.08] bg-transparent px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-[1600px] space-y-20">
        {/* Large Typographic Heading */}
        <div className="max-w-5xl">
          <TextReveal>
            <h2 className="tracking-display text-4xl leading-[0.9] font-black text-[#F2F2F2] uppercase sm:text-6xl md:text-7xl lg:text-8xl">
              ENGINEERING{" "}
              <span className="text-gradient-gold">WITH INTENTION.</span>
            </h2>
          </TextReveal>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 items-start gap-12 border-t border-white/[0.08] pt-10 lg:grid-cols-12 lg:gap-20">
          {/* Left Column: Index Label */}
          <div className="space-y-4 lg:col-span-4">
            <SectionReveal>
              <span className="font-mono text-xs tracking-widest text-[#C8C8DC] uppercase">
                ABOUT & PROFILE
              </span>
            </SectionReveal>
            <Reveal delay={0.1}>
              <p className="font-mono text-sm leading-relaxed text-[#DCDCE8] uppercase">
                B.Tech Computer Science Engineering student at Quantum University, Roorkee. Full-stack
                developer at G8G Agency & Elevance Skill.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Focus Areas Editorial Index */}
          <div className="space-y-12 lg:col-span-8">
            <Reveal delay={0.15}>
              <p className="max-w-2xl text-xl leading-relaxed font-medium text-[#F2F2F2] sm:text-2xl">
                I&apos;m a Computer Science engineering student and full-stack developer building web
                products, SaaS systems, and scalable web applications.
              </p>
            </Reveal>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {focusAreas.map((area, idx) => (
                <FadeScale key={area.title} delay={idx * 0.08}>
                  <div className="group flex flex-col justify-between gap-4 py-7 sm:flex-row sm:items-start">
                    <div className="space-y-1 sm:max-w-xs">
                      <span className="font-mono text-[10px] text-[#C8C8DC]">
                        0{idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-[#F2F2F2] transition-colors group-hover:text-amber-400 sm:text-lg">
                        {area.title}
                      </h4>
                    </div>
                    <p className="text-sm leading-relaxed text-[#C8C8DC] sm:max-w-md">
                      {area.description}
                    </p>
                  </div>
                </FadeScale>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
