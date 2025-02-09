import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2b77c4",
        secondary: "#3e9247",
        default: "#FFFFFF",
        error: "#ff0000"
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    addCommonColors: true,
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          default: "#FFFFFF",
          primary: "#2b77c4",
          secondary: "#3e9247",
        }
      }
    }
  })],
} satisfies Config;
