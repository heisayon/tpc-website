import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Montserrat", "Inter", "system-ui", "sans-serif"],
        sans: ["Montserrat", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        tpc: {
          ink: "#100B0D",
          charcoal: "#171013",
          wine: "#5E0F2D",
          plum: "#721A36",
          red: "#B71613",
          ember: "#E5471D",
          gold: "#F3A912",
          honey: "#FFD166",
          cream: "#FFF8EC",
          paper: "#F7EFE2",
          mist: "#EEE3D5",
          slate: "#514950",
          sage: "#47685C",
        },
      },
      boxShadow: {
        glow: "0 24px 70px rgba(183, 22, 19, 0.22)",
        lift: "0 18px 45px rgba(33, 18, 20, 0.12)",
        gold: "0 16px 36px rgba(243, 169, 18, 0.22)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        marquee: "marquee 30s linear infinite",
        "soft-pulse": "softPulse 2.8s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        softPulse: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
