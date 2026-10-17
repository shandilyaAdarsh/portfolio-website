import { Metadata } from "next";
import { PageTransition } from "@/components/ui/page-transition";
import { ProjectCard } from "@/components/projects/project-card";
import { projectsData } from "@/data/projects";
import { personalData } from "@/data/personal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Selected Works • ${personalData.name}`,
  description:
    "Curated archive of production web applications, SaaS platforms, and realtime systems.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen w-full bg-[#060504] px-6 pt-32 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1600px] space-y-16">
          {/* Header */}
          <div className="space-y-6 border-b border-white/[0.08] pb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#C8C8DC] transition-colors hover:text-[#FFFFFF]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>BACK TO HOME</span>
            </Link>

            <div className="space-y-2">
              <h1 className="tracking-display text-4xl font-black text-[#F2F2F2] uppercase sm:text-6xl md:text-7xl">
                SELECTED WORKS
              </h1>
              <p className="max-w-2xl pt-2 text-base leading-relaxed text-[#DCDCE8]">
                Production-ready web applications, SaaS platforms, and realtime operational
                architectures.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
