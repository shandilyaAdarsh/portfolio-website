"use client";

import React from "react";
import { Reveal, TextReveal, FadeScale, SectionReveal } from "@/components/ui/animation-primitives";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";

export const ExperienceOverview: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative w-full border-t border-white/[0.08] bg-transparent px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1600px] space-y-24">
        {/* Section Header */}
        <div className="relative pb-10">
          <TextReveal>
            <h2 className="tracking-display text-4xl font-black text-[#F2F2F2] uppercase sm:text-6xl md:text-7xl">
              EXPERIENCE
            </h2>
          </TextReveal>
          <div className="shimmer-divider absolute bottom-0 left-0 right-0" />
        </div>

        {/* Work Experience Timeline */}
        <div className="space-y-12">
          <SectionReveal>
            <p className="font-mono text-xs tracking-widest text-[#C8C8DC] uppercase">
              PROFESSIONAL ROLES
            </p>
          </SectionReveal>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {experienceData.map((exp, idx) => (
              <FadeScale key={exp.id} delay={idx * 0.1}>
                <div className="group grid grid-cols-1 items-start gap-8 py-10 pl-0 transition-all duration-300 hover:pl-2 lg:grid-cols-12">
                  {/* Period & Status */}
                  <div className="space-y-2 lg:col-span-3">
                    <span className="font-mono text-xs font-bold text-amber-400">{exp.period}</span>
                    <p className="font-mono text-xs text-[#C8C8DC]">{exp.location}</p>
                    {exp.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 glow-emerald">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        ACTIVE ROLE
                      </span>
                    )}
                  </div>

                  {/* Role & Company */}
                  <div className="space-y-1 lg:col-span-4">
                    <h3 className="text-xl font-bold text-[#F2F2F2] transition-colors group-hover:text-amber-400 sm:text-2xl">
                      {exp.company}
                    </h3>
                    <p className="font-mono text-sm text-[#DCDCE8]">{exp.role}</p>
                  </div>

                  {/* Narrative & Technologies */}
                  <div className="space-y-4 lg:col-span-5">
                    <p className="text-sm leading-relaxed text-[#C8C8DC]">{exp.description}</p>

                    <div className="space-y-1.5 border-l-2 border-amber-500/20 pl-3 text-xs text-[#C0C0D4] transition-colors group-hover:border-amber-400/50">
                      {exp.bulletPoints.map((point, i) => (
                        <p key={i}>→ {point}</p>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-[#D8D8EC] transition-colors hover:border-amber-400/40 hover:text-amber-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeScale>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8 pt-8">
          <SectionReveal>
            <p className="font-mono text-xs tracking-widest text-[#C8C8DC] uppercase">
              ACADEMIC BACKGROUND
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {educationData.map((edu, idx) => (
              <FadeScale key={edu.id} delay={idx * 0.1}>
                <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-[#0a0806] p-6">
                  <span className="font-mono text-xs font-bold text-amber-400">{edu.period}</span>
                  <h4 className="text-base font-bold text-[#F2F2F2]">{edu.degree}</h4>
                  <p className="font-mono text-xs text-[#C8C8DC]">
                    {edu.institution} • {edu.location}
                  </p>
                  {edu.gradeOrGpa && (
                    <span className="inline-block rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-xs text-emerald-400">
                      {edu.gradeOrGpa}
                    </span>
                  )}
                </div>
              </FadeScale>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
