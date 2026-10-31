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
        charcoal: {
          950: "#0b0d11",
          900: "#10131a",
          850: "#141822",
          800: "#1a1f2c",
          700: "#242a3c",
          600: "#323a52",
        },
        brand: {
          purple: {
            subtle: "rgba(168, 85, 247, 0.12)",
            border: "rgba(168, 85, 247, 0.28)",
            light: "#c084fc",
            DEFAULT: "#a855f7",
            dark: "#7e22ce",
          },
          green: {
            subtle: "rgba(52, 211, 153, 0.12)",
            border: "rgba(52, 211, 153, 0.28)",
            light: "#6ee7b7",
            DEFAULT: "#34d399",
            dark: "#059669",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

