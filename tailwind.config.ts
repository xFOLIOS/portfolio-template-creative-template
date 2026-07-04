import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // CreativeTemplate curated palette
        ember:   "#C45A3D",
        plum:    "#7C3AED",
        saffron: "#F59E0B",
        teal:    "#0F766E",
        moss:    "#4D7C0F",
        lilac:   "#C39BD3",
        paper:   "#FCFAF7",
        ink:     "#171717",
        mustard: "#D97706",
        rose:    "#E11D48",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
