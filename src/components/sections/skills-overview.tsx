"use client";

import React from "react";
import { Reveal, TextReveal, FadeScale } from "@/components/ui/animation-primitives";
import { skillsData } from "@/data/skills";
import { SkillCategory } from "@/types";

export const SkillsOverview: React.FC = () => {
  const categoryOrder: { category: SkillCategory; code: string }[] = [
    { category: "Languages", code: "01" },
    { category: "Frontend", code: "02" },
    { category: "Backend", code: "03" },
    { category: "Databases & Cloud", code: "04" },
    { category: "Data Structures & Algorithms", code: "05" },
    { category: "Core Concepts", code: "06" },
  ];

  return (
    <section
      id="skills"
      className="relative w-full border-t border-white/[0.08] bg-transparent px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1600px] space-y-20">
        {/* Section Header */}
        <div className="relative pb-10">
          <TextReveal>
            <h2 className="tracking-display text-4xl font-black text-[#F2F2F2] uppercase sm:text-6xl md:text-7xl">
              SKILLS INDEX
            </h2>
          </TextReveal>
          <div className="shimmer-divider absolute bottom-0 left-0 right-0" />
        </div>

        {/* Editorial Typographic Columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {categoryOrder.map(({ category, code }, idx) => {
            const items = skillsData.filter((s) => s.category === category);
            if (items.length === 0) return null;

            return (
              <FadeScale key={category} delay={idx * 0.07}>
                <div className="card-hover group space-y-6 rounded-2xl border border-white/[0.06] bg-[#0a0806] p-6 transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_8px_32px_rgba(249,115,22,0.18)] sm:p-8">
                  <div className="flex items-baseline justify-between border-b border-white/[0.07] pb-4">
                    <h3 className="font-mono text-sm font-bold tracking-widest text-[#F2F2F2] uppercase group-hover:text-amber-400 transition-colors duration-300">
                      {category}
                    </h3>
                    <span className="font-mono text-xs text-[#555] group-hover:text-[#888] transition-colors">{code}</span>
                  </div>

                  <ul className="space-y-2.5 font-mono text-xs sm:text-sm">
                    {items.map((skill) => (
                      <li
                        key={skill.id}
                        className="flex items-center justify-between text-[#DCDCE8] transition-colors hover:text-[#F2F2F2]"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-amber-400/70 group-hover:bg-amber-400 transition-colors" />
                          <span>{skill.name}</span>
                        </span>
                        {skill.proficiency && (
                          <span className="text-[10px] text-[#C8C8DC]">{skill.proficiency}%</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeScale>
            );
          })}
        </div>
      </div>
    </section>
  );
};
