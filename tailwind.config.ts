import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F172A",          // Deep obsidian slate
          darker: "#090D16",        // Midnight canvas
          surface: "#1E293B",       // Rich dark surface
          blue: "#2563EB",          // High-tech royal electric blue
          "blue-glow": "#3B82F6",   // Vibrant active glow
          "blue-light": "#EFF6FF",  // Crisp frosted blue
          "blue-hover": "#1D4ED8",  // Solid hover state
          cyan: "#06B6D4",          // Medical precision cyan accent
          emerald: "#10B981",       // Health vitality accent
          offwhite: "#F8FAFC",      // Ultra-clean modern white canvas
          warmbg: "#F1F5F9",        // Clean architectural slate background
          footer: "#0A0F1D",        // Deep cinematic midnight footer
          muted: "#64748B",         // Sophisticated slate grey
          border: "#E2E8F0",        // Crisp 1px structural borders
          "border-dark": "#334155", // Dark container borders
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        editorial: "1400px",
      },
      borderRadius: {
        editorial: "20px",
        "editorial-lg": "28px",
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(37, 99, 235, 0.25)",
        "glow-cyan": "0 0 50px -10px rgba(6, 182, 212, 0.25)",
        card: "0 20px 40px -15px rgba(15, 23, 42, 0.07)",
        "card-hover": "0 30px 60px -15px rgba(37, 99, 235, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
