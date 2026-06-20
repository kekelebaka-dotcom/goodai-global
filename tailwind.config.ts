import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#05070B",
          secondary: "#0A0D12",
          surface: "#0F1318",
          elevated: "#141920",
          card: "#111520",
          "card-hover": "#161C24",
        },
        accent: {
          gold: "#F4B63D",
          "gold-muted": "#C9922A",
          "gold-dim": "#8A6420",
          orange: "#E8721A",
        },
        text: {
          DEFAULT: "#F0EDE8",
          secondary: "#A8A49E",
          muted: "#6B6862",
          inverse: "#05070B",
        },
        desk: {
          signal: "#F4B63D",
          policy: "#818CF8",
          compute: "#34D399",
          sovereignty: "#F97316",
          markets: "#22C55E",
          philosophy: "#C084FC",
        },
      },
      fontFamily: {
        serif: ["'Source Serif 4'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
