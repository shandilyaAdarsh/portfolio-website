"use client";

import React from "react";
import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { Icons } from "@/components/ui/icons";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0806] p-6 transition-all duration-300 hover:border-amber-500/25 hover:shadow-2xl sm:p-8">
      <div className="space-y-4">
        {/* Category & Date */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-xs text-[#C8C8DC]">
          <span className="font-bold tracking-wider text-amber-400 uppercase">
            {project.category}
          </span>
          <span>{project.date}</span>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-xl font-bold tracking-tight text-[#F2F2F2] transition-colors group-hover:text-amber-400 sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-[#D0D0E2]">{project.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#DCDCE8]">{project.description}</p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-1.5 border-l border-white/10 pt-2 pl-3 text-xs text-[#C8C8DC]">
            {project.highlights.slice(0, 2).map((h, i) => (
              <p key={i}>• {h}</p>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4 border-t border-white/5 pt-6">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-white/10 bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-[#E0E0EC]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-2 font-mono text-xs">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#F2F2F2] transition-colors hover:text-amber-400"
            >
              <Icons.gitHub className="h-3.5 w-3.5 fill-current" />
              <span>SOURCE</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 transition-colors hover:text-white"
            >
              <span>LIVE DEMO</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
