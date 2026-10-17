"use client";

import React from "react";
import { personalData } from "@/data/personal";
import { socialLinksData } from "@/data/social";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const githubLink =
    socialLinksData.find((s) => s.id === "github")?.url || "https://github.com/shandilyaAdarsh";
  const linkedinLink =
    socialLinksData.find((s) => s.id === "linkedin")?.url || "https://linkedin.com";

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#020206] px-6 py-12 font-mono text-xs sm:px-10 lg:px-16">
      {/* Shimmer top accent */}
      <div className="shimmer-divider absolute inset-x-0 top-0" />

      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 text-[#C8C8DC] sm:flex-row sm:items-center">
        {/* Left: Identity */}
        <div className="space-y-1.5">
          <p className="font-bold tracking-widest text-[#F2F2F2] uppercase">
            {personalData.name}
          </p>
          <p className="text-[11px] text-[#888] tracking-wider">
            FULL-STACK DEVELOPER · REALTIME SYSTEMS BUILDER
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub", href: githubLink, external: true },
            { label: "LinkedIn", href: linkedinLink, external: true },
            { label: "Email", href: `mailto:${personalData.email}`, external: false },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="link-underline transition-colors hover:text-[#F2F2F2]"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right: Copyright & Back to top */}
        <div className="flex items-center gap-6 text-[#666]">
          <span className="text-[10px] tracking-wider">
            © 2026 Adarsh Shandilya
          </span>
          <button
            onClick={scrollToTop}
            className="group inline-flex cursor-pointer items-center gap-1.5 tracking-widest text-[#C8C8DC] uppercase transition-colors hover:text-amber-400"
            aria-label="Back to top"
          >
            <span>TOP</span>
            <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
