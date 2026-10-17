"use client";

import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ReflectAppMockup } from "@/components/ui/reflect-app-mockup";

const FIRST_NAME_LETTERS = ["A", "D", "A", "R", "S", "H"];

export const HeroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Scroll-based typography transformation (Editorial motion, not basic parallax)
  const rawNameY = useTransform(scrollY, [0, 700], [0, -120]);
  const rawNameScale = useTransform(scrollY, [0, 700], [1, 0.93]);
  const rawNameOpacity = useTransform(scrollY, [0, 550], [1, 0.25]);
  const rawLetterSpacing = useTransform(scrollY, [0, 700], ["-0.035em", "0.03em"]);

  const nameY = useSpring(rawNameY, { stiffness: 90, damping: 25 });
  const nameScale = useSpring(rawNameScale, { stiffness: 90, damping: 25 });
  const nameOpacity = useSpring(rawNameOpacity, { stiffness: 90, damping: 25 });

  // SHANDILYA moves in subtle staggered parallax
  const rawShandilyaY = useTransform(scrollY, [0, 700], [0, -75]);
  const rawShandilyaX = useTransform(scrollY, [0, 700], [0, 18]);
  const shandilyaY = useSpring(rawShandilyaY, { stiffness: 85, damping: 25 });
  const shandilyaX = useSpring(rawShandilyaX, { stiffness: 85, damping: 25 });

  // Supporting statement scrolls up smoothly
  const rawContentY = useTransform(scrollY, [0, 700], [0, -50]);
  const contentY = useSpring(rawContentY, { stiffness: 90, damping: 25 });

  // Mouse hover proximity state for individual letters
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden pt-24 sm:pt-28 md:pt-32 select-none"
    >
      {/* Background Architectural Grid Lines & Ambient Details */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        {/* Subtle vertical architectural guide lines */}
        <div className="mx-auto flex h-full max-w-7xl justify-between px-6 sm:px-12">
          <div className="h-full w-px bg-white/[0.03]" />
          <div className="hidden h-full w-px bg-white/[0.03] md:block" />
          <div className="h-full w-px bg-white/[0.03]" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO POSTER COMPOSITION: ADARSH SHANDILYA                                */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex w-full max-w-[1400px] flex-col items-center px-4 sm:px-8 text-center">
        {/* Editorial Sub-Header Strip */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-6 flex items-center gap-3 rounded-full border border-amber-500/25 bg-amber-500/[0.06] px-4 py-1.5 font-mono text-[10px] sm:text-xs text-[#F2EDE8] tracking-[0.18em] uppercase backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          </span>
          <span>FULL-STACK DEVELOPER</span>
          <span className="text-white/20">|</span>
          <span>REALTIME SYSTEMS</span>
          <span className="text-white/20">|</span>
          <span className="text-gradient-warm">AI BUILDER</span>
        </motion.div>

        {/* Primary Visual Identity: HUGE "ADARSH" TYPOGRAPHY */}
        <motion.div
          style={{
            y: prefersReducedMotion ? 0 : nameY,
            scale: prefersReducedMotion ? 1 : nameScale,
            opacity: prefersReducedMotion ? 1 : nameOpacity,
            letterSpacing: prefersReducedMotion ? "-0.035em" : rawLetterSpacing,
          }}
          className="relative flex flex-col items-center leading-none"
        >
          {/* First Name: ADARSH (Letter-by-Letter physical entrance) */}
          <h1
            className="flex items-center justify-center font-black uppercase text-white tracking-tighter"
            style={{
              fontSize: "clamp(4.2rem, 16vw, 15rem)",
              lineHeight: 0.84,
            }}
          >
            {FIRST_NAME_LETTERS.map((letter, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <span
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative inline-block cursor-default overflow-hidden px-[0.015em]"
                >
                  <motion.span
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            y: 90,
                            scale: 0.94,
                            filter: "blur(12px)",
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.95,
                      delay: 0.18 + idx * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            y: -3,
                            scale: 1.015,
                            transition: { type: "spring", stiffness: 450, damping: 18 },
                          }
                    }
                    className="inline-block transition-colors duration-200"
                    style={{
                      color: isHovered ? "#FFFFFF" : "#F4F4F6",
                      textShadow: isHovered
                        ? "0 0 30px rgba(249, 115, 22, 0.75), 0 0 60px rgba(253, 224, 71, 0.45)"
                        : "none",
                    }}
                  >
                    {letter}
                  </motion.span>
                </span>
              );
            })}
          </h1>

          {/* Surname: SHANDILYA (Editorial Offset Staggered Balance) */}
          <motion.div
            style={{
              y: prefersReducedMotion ? 0 : shandilyaY,
              x: prefersReducedMotion ? 0 : shandilyaX,
            }}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 35, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.9,
              delay: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-2 sm:mt-4 flex items-center justify-center font-mono text-xs sm:text-base md:text-xl lg:text-2xl font-medium text-gradient-primary uppercase tracking-[0.3em] sm:tracking-[0.45em]"
          >
            <span>SHANDILYA</span>
          </motion.div>
        </motion.div>

        {/* Supporting Editorial Statement & Purpose */}
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : contentY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-10 flex flex-col items-center max-w-2xl px-4 text-center"
        >
          <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white uppercase">
            BUILDING DIGITAL SYSTEMS{" "}
            <span className="text-gradient-warm">WITH PURPOSE.</span>
          </p>
          <p className="mt-3 text-xs sm:text-sm md:text-base font-normal text-[#9090b8] leading-relaxed max-w-md">
            Scalable full-stack products · low-latency realtime architectures ·
            high-throughput software engineered for resilience.
          </p>

          {/* Shimmer divider below tagline */}
          <div className="mt-8 shimmer-divider w-48 sm:w-72" />
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* SCROLLING APPLICATION MOCKUP: Emerging through the viewport horizon       */}
      {/* ========================================================================= */}
      <div className="relative z-20 mt-14 sm:mt-20 md:mt-28 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          <ReflectAppMockup />
        </motion.div>
      </div>
    </section>
  );
};
