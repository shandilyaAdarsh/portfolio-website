"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  HTMLMotionProps,
  Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Shared easings ────────────────────────────────────────────────────────
// expo-out: fast entry, silky finish — feels physical and decisive
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
// back-out: overshoots very slightly — adds life to small elements
const BACK_OUT = [0.34, 1.56, 0.64, 1] as const;
// quart-out: smooth mid-weight — good for text
const QUART_OUT = [0.25, 1, 0.5, 1] as const;
// ─── Reveal ───────────────────────────────────────────────────────────────
// Blur + lift — elements emerge from the page surface, not just slide up.
interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = 0.55,
  yOffset = 22,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: yOffset, filter: "blur(6px)" }
      }
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: yOffset, filter: "blur(6px)" }
      }
      transition={{
        duration,
        delay,
        ease: EXPO_OUT,
        filter: { duration: duration * 0.8, delay, ease: QUART_OUT },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ─── TextReveal ────────────────────────────────────────────────────────────
// Masked clip with a very slight skewX — editorial / high-fashion press feel.
interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  delay = 0,
  duration = 0.65,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-6% 0px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "108%", skewY: 1.5, opacity: 0 }}
        animate={
          isInView
            ? { y: "0%", skewY: 0, opacity: 1 }
            : { y: "108%", skewY: 1.5, opacity: 0 }
        }
        transition={{ duration, delay, ease: EXPO_OUT }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ─── SectionReveal ─────────────────────────────────────────────────────────
// Wraps an entire section's heading label ("ABOUT & PROFILE" mono label).
// Slides in from the left with a faint line that draws across.
interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  delay = 0,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: -16 }
      }
      transition={{ duration: 0.45, delay, ease: EXPO_OUT }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

// ─── FadeScale ─────────────────────────────────────────────────────────────
// Cards & panels — emerges from depth (scale 0.94 → 1) with blur clearing.
// More dimensional than a flat fade-up.
interface FadeScaleProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeScale: React.FC<FadeScaleProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-6% 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.94, y: 12, filter: "blur(8px)" }
      }
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
          : prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.94, y: 12, filter: "blur(8px)" }
      }
      transition={{
        duration,
        delay,
        ease: EXPO_OUT,
        scale: { duration: duration * 1.1, delay, ease: EXPO_OUT },
        filter: { duration: duration * 0.75, delay, ease: QUART_OUT },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ─── SlideIn ───────────────────────────────────────────────────────────────
// Horizontal entrance — good for tag pills, index numbers, inline badges.
interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right";
  className?: string;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  direction = "left",
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const xInit = direction === "left" ? -20 : 20;

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: xInit }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: xInit }
      }
      transition={{ duration: 0.45, delay, ease: BACK_OUT }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

// ─── Stagger ───────────────────────────────────────────────────────────────
// Wraps children in a stagger container. Children must use StaggerItem.
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay, delayChildren: 0 },
  }),
};

const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EXPO_OUT },
  },
};

interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  staggerDelay = 0.08,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={staggerContainerVariants}
      custom={staggerDelay}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={prefersReducedMotion ? {} : staggerChildVariants}>
            {child}
          </motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
};

// ─── ScaleIn ──────────────────────────────────────────────────────────────
// Legacy — kept for backward compat. Now delegates to FadeScale.
interface ScaleInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScaleIn: React.FC<ScaleInProps> = (props) => <FadeScale {...props} />;

// ─── Magnetic ─────────────────────────────────────────────────────────────
interface MagneticProps {  children: React.ReactElement;
  distance?: number;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  distance = 15,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  const springConfig = { damping: 18, stiffness: 180, mass: 0.08 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set(((clientX - left - width / 2) / (width / 2)) * distance);
    y.set(((clientY - top - height / 2) / (height / 2)) * distance);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={prefersReducedMotion ? {} : { x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
};


// ─── CountUp ──────────────────────────────────────────────────────────────
// Animates a numeric string when it enters the viewport.
// Supports suffixes like "+" or "ms". Non-numeric strings just fade in.
interface CountUpProps {
  value: string; // e.g. "150+", "03+", "REALTIME"
  duration?: number;
  delay?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 1.2,
  delay = 0,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    // Parse numeric prefix and suffix
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) { setDisplay(value); return; }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const steps = Math.min(target, 40);
    const stepDuration = (duration * 1000) / steps;
    let current = 0;
    const delayMs = delay * 1000;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        current += Math.ceil(target / steps);
        if (current >= target) {
          clearInterval(interval);
          setDisplay(value);
        } else {
          setDisplay(`${current}${suffix}`);
        }
      }, stepDuration);
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [isInView, value, duration, delay, prefersReducedMotion]);

  return (
    <span ref={ref} className={cn(className)}>
      {display}
    </span>
  );
};

