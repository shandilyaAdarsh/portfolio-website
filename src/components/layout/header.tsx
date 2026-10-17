"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useScroll } from "@/hooks/use-scroll";
import { personalData } from "@/data/personal";
import { socialLinksData } from "@/data/social";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { DynamicIsland } from "./dynamic-island";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isScrolled = useScroll(30);

  const githubLink =
    socialLinksData.find((s) => s.id === "github")?.url || "https://github.com/shandilyaAdarsh";
  const linkedinLink =
    socialLinksData.find((s) => s.id === "linkedin")?.url || "https://linkedin.com";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          isScrolled
            ? "border-b border-white/[0.06] bg-[#040408]/80 py-3 backdrop-blur-xl"
            : "bg-transparent py-4 sm:py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
          {/* Brand Logo & Editorial Monogram */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform duration-300 hover:opacity-90"
            aria-label="Home"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] font-mono text-xs font-bold text-white transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/[0.1] group-hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]">
              A
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-sans text-xs sm:text-sm font-bold tracking-tight text-[#FFFFFF]">
                ADARSH SHANDILYA
              </span>
              <span className="font-mono text-[9px] text-[#C4C4DC] tracking-widest uppercase mt-0.5">
                SYSTEMS & CODE
              </span>
            </div>
          </Link>

          {/* Center Dynamic Island Navigation */}
          <div className="flex items-center justify-center">
            <DynamicIsland />
          </div>

          {/* Right Action Minimal Links & Outlined CTA Button */}
          <div className="hidden items-center gap-5 sm:flex">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-mono text-xs text-[#DCDCE8] transition-colors hover:text-white"
              title="GitHub Profile"
            >
              GitHub ↗
            </a>

            <a
              href={`mailto:${personalData.email}`}
              className="group relative inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/[0.06] px-4 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-amber-400/50 hover:bg-amber-500/[0.12] hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] active:scale-95"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400" />
            </a>
          </div>

          {/* Mobile Secondary Menu Trigger */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-xs text-[#F2F2F2] transition-colors hover:bg-white/10 sm:hidden"
            aria-label="Open mobile menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu for Full Socials & Contacts */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#040408]/95 p-6 backdrop-blur-2xl sm:hidden"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/5 font-mono text-xs font-bold text-white">
                  A
                </div>
                <span className="font-bold text-sm tracking-tight text-white">
                  ADARSH SHANDILYA
                </span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="rounded-full p-2 text-white hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 pt-8 text-base font-medium text-[#C0C0C8]">
              {[
                { label: "Work", href: "/#work" },
                { label: "About", href: "/#about" },
                { label: "Experience", href: "/#experience" },
                { label: "Skills", href: "/#skills" },
                { label: "Contact", href: "/#contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className="py-1 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-6 border-t border-white/10 flex flex-col gap-4 text-sm font-mono">
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-[#C8C8DC]"
                >
                  GitHub ↗
                </a>
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-[#C8C8DC]"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={`mailto:${personalData.email}`}
                  className="text-amber-300 font-semibold pt-2"
                >
                  {personalData.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
