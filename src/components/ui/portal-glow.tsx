"use client";

import React, { useEffect } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

// Deterministic celestial stars to prevent SSR/hydration mismatch
const DEEP_STARS = [
  { x: 14, y: 18, size: 1.5, opacity: 0.5, pulse: 3.2 },
  { x: 26, y: 12, size: 2.5, opacity: 0.9, pulse: 2.4, isCross: true },
  { x: 38, y: 16, size: 1.2, opacity: 0.4, pulse: 4.1 },
  { x: 48, y: 8, size: 1.8, opacity: 0.65, pulse: 3.6 },
  { x: 62, y: 14, size: 1.2, opacity: 0.5, pulse: 2.9 },
  { x: 74, y: 11, size: 2.8, opacity: 0.95, pulse: 2.1, isCross: true },
  { x: 86, y: 20, size: 1.4, opacity: 0.45, pulse: 3.8 },
  { x: 92, y: 32, size: 2.2, opacity: 0.75, pulse: 4.3 },
  { x: 88, y: 46, size: 1.3, opacity: 0.4, pulse: 2.7 },
  { x: 82, y: 62, size: 2.6, opacity: 0.9, pulse: 3.1, isCross: true },
  { x: 90, y: 76, size: 1.5, opacity: 0.6, pulse: 4.5 },
  { x: 78, y: 84, size: 2.2, opacity: 0.7, pulse: 2.8 },
  { x: 64, y: 90, size: 1.2, opacity: 0.4, pulse: 3.4 },
  { x: 50, y: 92, size: 2.8, opacity: 0.95, pulse: 2.5, isCross: true },
  { x: 36, y: 86, size: 1.4, opacity: 0.55, pulse: 3.9 },
  { x: 22, y: 82, size: 2.4, opacity: 0.85, pulse: 2.2 },
  { x: 10, y: 72, size: 1.2, opacity: 0.4, pulse: 4.2 },
  { x: 6, y: 56, size: 2.6, opacity: 0.9, pulse: 3.3, isCross: true },
  { x: 12, y: 42, size: 1.4, opacity: 0.5, pulse: 2.6 },
  { x: 8, y: 28, size: 2.0, opacity: 0.7, pulse: 3.7 },
  // Mid-orbit galaxy stars
  { x: 22, y: 32, size: 1.8, opacity: 0.7, pulse: 3.0 },
  { x: 30, y: 24, size: 1.2, opacity: 0.55, pulse: 4.0 },
  { x: 68, y: 26, size: 2.2, opacity: 0.8, pulse: 2.7 },
  { x: 76, y: 38, size: 1.4, opacity: 0.6, pulse: 3.5 },
  { x: 78, y: 66, size: 2.0, opacity: 0.75, pulse: 2.9 },
  { x: 70, y: 76, size: 1.3, opacity: 0.5, pulse: 4.4 },
  { x: 30, y: 74, size: 2.2, opacity: 0.85, pulse: 2.3 },
  { x: 20, y: 64, size: 1.5, opacity: 0.6, pulse: 3.8 },
  // Close core stars
  { x: 35, y: 40, size: 1.6, opacity: 0.75, pulse: 2.5 },
  { x: 64, y: 42, size: 2.0, opacity: 0.8, pulse: 3.2 },
  { x: 62, y: 58, size: 1.8, opacity: 0.85, pulse: 2.8 },
  { x: 36, y: 60, size: 1.5, opacity: 0.7, pulse: 3.6 },
];

export const PortalGlow: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // =========================================================================
  // 1. CUMULATIVE ROTATION SYSTEM (delta = currentScrollY - previousScrollY)
  // Preserves current angle when idle. Does NOT reset to 0°.
  // =========================================================================
  const cumulativeRotation = useMotionValue(0);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (prefersReducedMotion) return;
      const prev = scrollY.getPrevious() ?? latest;
      const delta = latest - prev;
      if (delta !== 0) {
        // Delta > 0 = scroll down -> clockwise rotation
        // Delta < 0 = scroll up -> counter-clockwise rotation
        cumulativeRotation.set(cumulativeRotation.get() + delta * 0.16);
      }
    });
  }, [scrollY, cumulativeRotation, prefersReducedMotion]);

  // Inertial spring for cumulative rotation
  const smoothRotation = useSpring(cumulativeRotation, {
    stiffness: 85,
    damping: 24,
    mass: 0.35,
  });

  // Layer rotations derived from smooth cumulative rotation
  const galaxyRotation = useTransform(smoothRotation, (r) => (prefersReducedMotion ? 0 : r * 0.75));
  const counterRotation = useTransform(smoothRotation, (r) => (prefersReducedMotion ? 0 : r * -0.55));
  const starfieldRotation = useTransform(smoothRotation, (r) => (prefersReducedMotion ? 0 : r * 0.35));

  // =========================================================================
  // 2. SCROLL VELOCITY-DRIVEN DYNAMIC ZOOM (Returns to 1.0 on idle)
  // Scroll down = zoom IN (up to +0.15)
  // Scroll up = zoom OUT (down to -0.03)
  // Stop scrolling = velocity drops to 0, zoom returns to 0
  // =========================================================================
  const rawVelocityZoom = useTransform(
    scrollVelocity,
    [-3000, -1000, 0, 1200, 3500],
    [-0.03, -0.015, 0, 0.06, 0.16],
    { clamp: true }
  );

  // Subtle section-aware baseline scale
  const sectionBaseScale = useTransform(
    scrollY,
    [0, 800, 2000, 3200, 4400, 5600],
    [1.0, 1.03, 1.02, 1.0, 0.98, 1.04],
    { clamp: true }
  );

  // Combine baseline scale + velocity zoom, clamped between 0.96 and 1.18
  const combinedScale = useTransform(
    [sectionBaseScale, rawVelocityZoom],
    ([base, zoom]) => {
      if (prefersReducedMotion) return 1;
      const total = (base as number) + (zoom as number);
      return Math.min(Math.max(total, 0.96), 1.18);
    }
  );

  // Smooth physical spring for scale zoom
  const smoothScale = useSpring(combinedScale, {
    stiffness: 110,
    damping: 22,
    mass: 0.35,
  });

  // =========================================================================
  // 3. LAYER-DIFFERENTIAL SCALE RESPONSES (Dimensional Depth)
  // Core remains scale: 1 (static anchor)
  // Inner ring: scale ~1.03 * smoothScale
  // Outer ring & galaxy: scale ~1.07 * smoothScale
  // Particles & stars: scale ~1.12 * smoothScale
  // =========================================================================
  const innerRingScale = useTransform(smoothScale, (s) => (prefersReducedMotion ? 1 : s * 1.03));
  const outerRingScale = useTransform(smoothScale, (s) => (prefersReducedMotion ? 1 : s * 1.07));
  const particleScale = useTransform(smoothScale, (s) => (prefersReducedMotion ? 1 : s * 1.12));
  const flareScaleX = useTransform(smoothScale, (s) => (prefersReducedMotion ? 1 : s * 1.05));

  // =========================================================================
  // 4. SCROLL VELOCITY-RESPONSIVE GLOW
  // Fast scroll down increases glow; idle returns to baseline 0.8
  // =========================================================================
  const rawGlow = useTransform(
    scrollVelocity,
    [-2000, 0, 2500],
    [0.72, 0.82, 1.0],
    { clamp: true }
  );
  const smoothGlow = useSpring(rawGlow, {
    stiffness: 95,
    damping: 22,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-1/2 top-[64%] sm:top-[60%] md:top-[58%] -translate-x-1/2 -translate-y-1/2 z-[1] select-none flex items-center justify-center"
      style={{
        width: "min(1050px, 98vw)",
        height: "min(1050px, 98vw)",
        transformOrigin: "center center",
      }}
    >
      {/* ========================================================================= */}
      {/* GALAXY LAYER 0: Ambient Deep Starfield (Twinkling & Parallax Swirl)        */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          rotate: starfieldRotation,
          scale: particleScale,
          transformOrigin: "center center",
          willChange: "transform",
        }}
        className="absolute inset-0"
      >
        {DEEP_STARS.map((star, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          >
            {star.isCross ? (
              /* Bright Star with 4-Point Diffraction Cross */
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: [star.opacity * 0.7, star.opacity, star.opacity * 0.7],
                        scale: [0.9, 1.15, 0.9],
                      }
                }
                transition={{
                  duration: star.pulse,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex items-center justify-center"
              >
                {/* Vertical ray */}
                <div
                  className="absolute w-[1px] bg-white/90"
                  style={{ height: `${star.size * 5}px` }}
                />
                {/* Horizontal ray */}
                <div
                  className="absolute h-[1px] bg-white/90"
                  style={{ width: `${star.size * 5}px` }}
                />
                {/* Core dot */}
                <div
                  className="rounded-full bg-white shadow-[0_0_8px_#fff]"
                  style={{
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                  }}
                />
              </motion.div>
            ) : (
              /* Regular Twinkling Pinpoint Star */
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
                      }
                }
                transition={{
                  duration: star.pulse,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* ========================================================================= */}
      {/* GALAXY LAYER 1: Deep Spiral Nebula Arms & Cosmic Stardust (Outer Scale)    */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          rotate: galaxyRotation,
          scale: outerRingScale,
          opacity: smoothGlow,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {/* Galaxy Arm 1: Majestic curving stardust arm */}
        <div
          className="absolute h-[420px] w-[580px] sm:h-[580px] sm:w-[780px] md:h-[680px] md:w-[920px] rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at 40% 50%, rgba(249, 115, 22, 0.36) 0%, rgba(245, 158, 11, 0.22) 35%, rgba(253, 224, 71, 0.10) 55%, transparent 75%)",
            filter: "blur(45px)",
            transform: "rotate(-25deg)",
          }}
        />

        {/* Galaxy Arm 2: Counter-sweeping spiral nebula arm */}
        <div
          className="absolute h-[380px] w-[540px] sm:h-[520px] sm:w-[720px] md:h-[620px] md:w-[860px] rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at 60% 50%, rgba(234, 88, 12, 0.28) 0%, rgba(249, 115, 22, 0.20) 35%, rgba(254, 240, 138, 0.12) 60%, transparent 75%)",
            filter: "blur(48px)",
            transform: "rotate(155deg)",
          }}
        />

        {/* Curving SVG Stardust Spiral Trails */}
        <svg
          viewBox="0 0 800 800"
          className="absolute h-[600px] w-[600px] sm:h-[780px] sm:w-[780px] md:h-[920px] md:w-[920px] opacity-75"
          fill="none"
        >
          <defs>
            <linearGradient id="armGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#fde047" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="armGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="75%" stopColor="#ea580c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            <filter id="spiralGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Spiral Trajectory 1 */}
          <path
            d="M 400 400 C 460 380, 520 320, 560 250 C 600 180, 640 100, 710 80"
            stroke="url(#armGrad1)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#spiralGlow)"
          />
          {/* Spiral Trajectory 1 Secondary Whisps */}
          <path
            d="M 400 400 C 440 360, 490 310, 520 220 C 550 150, 590 80, 660 50"
            stroke="url(#armGrad1)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            opacity="0.6"
          />

          {/* Spiral Trajectory 2 */}
          <path
            d="M 400 400 C 340 420, 280 480, 240 550 C 200 620, 160 700, 90 720"
            stroke="url(#armGrad2)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#spiralGlow)"
          />
          {/* Spiral Trajectory 2 Secondary Whisps */}
          <path
            d="M 400 400 C 360 440, 310 490, 280 580 C 250 650, 210 720, 140 750"
            stroke="url(#armGrad2)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            opacity="0.6"
          />

          {/* Dense galactic core cluster dots */}
          <circle cx="460" cy="350" r="1.5" fill="#fff" opacity="0.8" />
          <circle cx="510" cy="290" r="2" fill="#fde047" opacity="0.9" />
          <circle cx="580" cy="200" r="1.5" fill="#fff" opacity="0.7" />
          <circle cx="630" cy="140" r="2" fill="#fbbf24" opacity="0.8" />
          <circle cx="340" cy="450" r="1.5" fill="#fff" opacity="0.8" />
          <circle cx="290" cy="510" r="2" fill="#f97316" opacity="0.9" />
          <circle cx="220" cy="600" r="1.5" fill="#fff" opacity="0.7" />
          <circle cx="170" cy="660" r="2" fill="#fb923c" opacity="0.8" />
        </svg>
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 3: Volumetric Ambient Cosmic Core Bloom (Glow scale)                 */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          opacity: smoothGlow,
          scale: outerRingScale,
          transformOrigin: "center center",
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-[480px] w-[480px] rounded-full sm:h-[640px] sm:w-[640px] md:h-[780px] md:w-[780px]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(253, 224, 71, 0.40) 0%, rgba(249, 115, 22, 0.26) 32%, rgba(234, 88, 12, 0.10) 55%, transparent 75%)",
            filter: "blur(55px)",
          }}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 4: Orbital Concentric Trajectories & Celestial Nodes (Particle Scale)*/}
      {/* ========================================================================= */}
      <motion.div
        style={{
          rotate: counterRotation,
          scale: particleScale,
          transformOrigin: "center center",
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Ring 1 - Outer fine ring */}
        <div className="h-[480px] w-[480px] rounded-full border border-white/[0.06] sm:h-[640px] sm:w-[640px] md:h-[760px] md:w-[760px]" />

        {/* Ring 2 - Mid dashed orbital trajectory */}
        <div className="absolute h-[360px] w-[360px] rounded-full border border-dashed border-amber-400/25 sm:h-[480px] sm:w-[480px] md:h-[580px] md:w-[580px]" />

        {/* Ring 3 - Inner fine wireframe */}
        <div className="absolute h-[260px] w-[260px] rounded-full border border-white/[0.09] sm:h-[340px] sm:w-[340px] md:h-[420px] md:w-[420px]" />

        {/* Celestial nodes / orbital particles */}
        <div className="absolute top-12 left-1/4 h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_12px_#fff]" />
        <div className="absolute bottom-20 right-1/4 h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_10px_#fff]" />
        <div className="absolute top-1/3 right-10 h-2 w-2 rounded-full bg-[#f97316] shadow-[0_0_12px_#f97316]" />
        <div className="absolute bottom-1/3 left-12 h-1.5 w-1.5 rounded-full bg-amber-400/90 shadow-[0_0_8px_#fbbf24]" />
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 5: Accretion Disk / Laser Flare Bar (Responsive Width)              */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          scaleX: flareScaleX,
          opacity: smoothGlow,
          transformOrigin: "center center",
        }}
        className="absolute inset-x-0 flex items-center justify-center"
      >
        {/* Soft wide diffuse light bar */}
        <div
          className="absolute h-10 w-full max-w-4xl rounded-full blur-xl"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(249, 115, 22, 0.45) 25%, rgba(255, 255, 255, 0.95) 50%, rgba(249, 115, 22, 0.45) 75%, transparent 100%)",
          }}
        />

        {/* Razor-thin intense laser horizon line */}
        <div
          className="h-[1.5px] w-full max-w-4xl"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(253, 224, 71, 0.4) 15%, rgba(255, 255, 255, 1) 50%, rgba(253, 224, 71, 0.4) 85%, transparent 100%)",
            boxShadow:
              "0 0 25px rgba(255, 255, 255, 0.95), 0 0 45px rgba(249, 115, 22, 0.75)",
          }}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 2: Accretion Rim & Photon Ring (Rotates & Zooms with SCROLL)        */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          rotate: smoothRotation,
          scale: innerRingScale,
          transformOrigin: "center center",
          willChange: "transform",
        }}
        className="absolute flex items-center justify-center"
      >
        {/* Rotating Conic Radiant Ring */}
        <div
          className="h-[220px] w-[220px] rounded-full sm:h-[300px] sm:w-[300px] md:h-[370px] md:w-[370px]"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.05) 0deg, rgba(249,115,22,0.65) 90deg, rgba(255,255,255,0.95) 180deg, rgba(253,224,71,0.65) 270deg, rgba(255,255,255,0.05) 360deg)",
            filter: "blur(8px)",
            opacity: 0.95,
          }}
        />

        {/* Ambient Rim Bloom */}
        <div
          className="absolute h-[210px] w-[210px] rounded-full sm:h-[290px] sm:w-[290px] md:h-[350px] md:w-[350px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(253, 224, 71, 0.85) 35%, rgba(249, 115, 22, 0.5) 60%, rgba(234, 88, 12, 0.2) 80%, transparent 100%)",
            filter: "blur(14px) drop-shadow(0 0 50px rgba(249, 115, 22, 0.95))",
          }}
        />

        {/* Crisp Radiant White Core Border */}
        <div
          className="absolute h-[190px] w-[190px] rounded-full border-[2.5px] border-white sm:h-[260px] sm:w-[260px] md:h-[320px] md:w-[320px]"
          style={{
            boxShadow:
              "0 0 35px rgba(255, 255, 255, 1), 0 0 65px rgba(249, 115, 22, 0.85), inset 0 0 30px rgba(255, 255, 255, 0.4)",
          }}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 1: Central Black Void (STATIC ANCHOR - Stationary Core Void ◉)       */}
      {/* Scale remains 1.0 (visually stable), center remains locked in place       */}
      {/* ========================================================================= */}
      <div
        className="relative z-10 h-[175px] w-[175px] rounded-full bg-[#060504] sm:h-[245px] sm:w-[245px] md:h-[305px] md:w-[305px]"
        style={{
          boxShadow:
            "inset 0 0 55px rgba(0, 0, 0, 1), 0 0 1px 1px rgba(255, 255, 255, 0.15)",
          transformOrigin: "center center",
        }}
      />
    </div>
  );
};
