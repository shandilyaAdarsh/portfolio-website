"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TypographicStatementProps {
  phrase?: string[];
  subtext?: string;
}

export const TypographicStatement: React.FC<TypographicStatementProps> = ({
  phrase = ["BUILD.", "SHIP.", "ITERATE."],
  subtext = "ENGINEERED FOR PRODUCTION • TESTED FOR RESILIENCE",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section className="relative w-full overflow-hidden border-t border-b border-white/[0.06] bg-[#060608]/60 backdrop-blur-sm px-6 py-20 select-none sm:px-10 sm:py-28 lg:px-16">
      {/* Accent line — draws across on enter */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
      />

      <div ref={ref} className="mx-auto flex max-w-[1600px] flex-col items-start justify-center">
        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase"
        >
          {subtext}
        </motion.p>

        {/* Words — each clips up with staggered delay */}
        <div className="space-y-0">
          {phrase.map((word, idx) => (
            <div key={word} className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="tracking-display text-[11vw] leading-[0.88] font-black text-[#F2F2F2] uppercase transition-colors duration-500 hover:text-amber-400 sm:text-[9vw]"
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Index counter — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8 self-end font-mono text-[10px] tracking-widest text-[#555] uppercase"
        >
          SCROLL TO CONTINUE ↓
        </motion.div>
      </div>

      {/* Bottom shimmer line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 1 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      />
    </section>
  );
};
