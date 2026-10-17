"use client";

import React from "react";
import { FadeScale, SectionReveal, CountUp } from "@/components/ui/animation-primitives";

export const MetricsSection: React.FC = () => {
  const metrics = [
    {
      value: "150+",
      label: "DSA PROBLEMS SOLVED",
      detail: "LeetCode & CodeStudio — Arrays, Linked Lists, Sliding Window",
      accent: "text-amber-400",
      bar: "from-yellow-400 to-amber-500",
    },
    {
      value: "03+",
      label: "PRODUCTION SYSTEMS",
      detail: "Multi-Tenant SaaS, Floor Operations & Career Platforms",
      accent: "text-emerald-400",
      bar: "from-emerald-500 to-emerald-400",
    },
    {
      value: "10+",
      label: "CORE TECHNOLOGIES",
      detail: "Next.js · TypeScript · Supabase · PostgreSQL · REST APIs",
      accent: "text-sky-400",
      bar: "from-sky-500 to-sky-400",
    },
    {
      value: "REALTIME",
      label: "ARCHITECTURE FOCUS",
      detail: "Supabase Realtime · WebSocket bus · RLS tenant security",
      accent: "text-orange-400",
      bar: "from-amber-500 via-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="relative w-full border-t border-white/[0.06] bg-transparent px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1600px] space-y-16">
        <div className="border-b border-white/[0.06] pb-6">
          <SectionReveal>
            <p className="font-mono text-xs tracking-widest text-[#C8C8DC] uppercase">
              KEY METRICS & FOCUS
            </p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <FadeScale key={metric.label} delay={idx * 0.08}>
              <div className="card-hover group relative space-y-4 rounded-2xl border border-white/[0.06] bg-[#0a0806] p-6 transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_8px_40px_rgba(249,115,22,0.2)]">
                {/* Top accent bar that grows on hover */}
                <div className={`absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r ${metric.bar} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                <CountUp
                  value={metric.value}
                  delay={idx * 0.08 + 0.2}
                  className={`tracking-display text-4xl font-black sm:text-5xl ${metric.accent}`}
                />

                <p className="font-mono text-[11px] font-bold tracking-widest text-amber-400">
                  {metric.label}
                </p>
                <p className="text-xs leading-relaxed text-[#C0C0D4]">{metric.detail}</p>
              </div>
            </FadeScale>
          ))}
        </div>
      </div>
    </section>
  );
};
