/**
 * Portfolio Design Tokens — Editorial & Minimalist System
 * Dark cinematic palette with near-black foundation and restrained silver/off-white accents.
 */
export const tokens = {
  colors: {
    bg: {
      primary: "#050505", // Deep near-black
      secondary: "#0D0D0D", // Deep Charcoal
      tertiary: "#141414", // Elevated surfaces
      card: "#0D0D0D",
    },
    accent: {
      subtle: "#D6A85F", // Very restrained warm off-white / silver-gold
      silver: "#E2E8F0",
      glow: "rgba(214, 168, 95, 0.08)",
    },
    text: {
      primary: "#F2F2F2", // Clean off-white
      secondary: "#A0A0A0", // Mid-tone grey
      muted: "#666666", // Subtle metadata grey
    },
    border: {
      subtle: "rgba(255, 255, 255, 0.08)",
      medium: "rgba(255, 255, 255, 0.15)",
      accent: "rgba(214, 168, 95, 0.3)",
    },
  },
  typography: {
    fontFamily: {
      sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      mono: ["var(--font-mono)", "monospace"],
    },
    tracking: {
      display: "-0.05em",
      tight: "-0.025em",
      normal: "-0.015em",
      editorial: "0.15em",
    },
  },
  animation: {
    duration: {
      fast: 0.2,
      normal: 0.5,
      slow: 0.9,
    },
    easing: [0.16, 1, 0.3, 1], // Cinematic ease-out
  },
} as const;

export type DesignTokens = typeof tokens;
