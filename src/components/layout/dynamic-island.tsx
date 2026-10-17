"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export const DynamicIsland: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("ADARSH");
  const islandRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll detection for compact/expanded mode
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 80;
          setIsScrolled(scrolled);
          if (!scrolled) {
            setMobileExpanded(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section Observer for Active Section Tracking
  useEffect(() => {
    const sectionIds = ["hero", "work", "about", "experience", "skills", "contact"];
    const elements: HTMLElement[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) elements.push(el);
    });

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "hero") {
              setActiveSection("ADARSH");
            } else {
              setActiveSection(id.toUpperCase());
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Close mobile island when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setMobileExpanded(false);
        setIsHovered(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Whether the island is in expanded desktop state
  // Expanded when at the top OR when hovered/focused while scrolled
  const isExpanded = !isScrolled || isHovered;

  const handleLinkClick = (href: string) => {
    setIsHovered(false);
    setMobileExpanded(false);

    // Smooth scroll handling
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const springTransition: Transition = prefersReducedMotion
    ? { duration: 0.15 }
    : { type: "spring", stiffness: 380, damping: 28 };

  return (
    <div
      ref={islandRef}
      className="relative flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Desktop Dynamic Island */}
      <motion.nav
        layout={!prefersReducedMotion}
        transition={springTransition}
        className={cn(
          "hidden md:flex items-center justify-center rounded-full border backdrop-blur-2xl transition-all duration-300",
          "bg-[#090806]/90 border-amber-500/[0.20]",
          "shadow-[0_14px_35px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(245,158,11,0.2)]",
          isExpanded
            ? "px-5 py-2 min-w-[380px] gap-6"
            : "px-4 py-1.5 min-w-[140px] gap-2.5 cursor-pointer hover:border-amber-400/40 hover:shadow-[0_14px_35px_rgba(0,0,0,0.9),0_0_24px_rgba(249,115,22,0.3)] hover:scale-[1.02]"
        )}
        role="navigation"
        aria-label="Main Navigation"
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Compact Scrolled State: [ ✦ ACTIVE_SECTION ] */
            <motion.div
              key="compact"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-[#E0E0E8]"
            >
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              </span>
              <span className="text-[11px] font-semibold text-white/95">
                {activeSection}
              </span>
              <span className="text-[10px] text-amber-300/60">✦</span>
            </motion.div>
          ) : (
            /* Expanded Full Navigation State: [ ✦ Work About Experience Skills Contact ] */
            <motion.div
              key="expanded"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -2 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-6 text-xs text-[#D8D8E8]"
            >
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-300 pr-1 border-r border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                <span className="font-semibold tracking-wider text-amber-200">✦</span>
              </div>

              <div className="flex items-center gap-5 text-xs">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection.toLowerCase() === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={cn(
                        "relative py-1 font-medium transition-colors hover:text-white",
                        isActive ? "text-white font-semibold" : "text-[#D4D4E8]"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="island-active-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)]"
                          transition={springTransition}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Dynamic Island */}
      <div className="flex md:hidden flex-col items-center">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className={cn(
            "flex items-center gap-2 rounded-full border backdrop-blur-2xl px-4 py-1.5 transition-all active:scale-95",
            "bg-[#07070B]/85 border-white/[0.14]",
            "shadow-[0_12px_28px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)]"
          )}
          aria-expanded={mobileExpanded}
          aria-label="Toggle Navigation Island"
        >
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-white">
            {activeSection}
          </span>
          <motion.span
            animate={{ rotate: mobileExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[10px] text-white/50"
          >
            ▾
          </motion.span>
        </button>

        {/* Mobile Expanded Menu Dropdown */}
        <AnimatePresence>
          {mobileExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={springTransition}
              className="absolute top-full z-50 mt-1 w-56 rounded-2xl border border-white/15 bg-[#090806]/95 p-3 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex flex-col gap-1 text-xs">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection.toLowerCase() === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 transition-colors",
                        isActive
                          ? "bg-white/10 font-semibold text-white"
                          : "text-[#A0A0AA] hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
