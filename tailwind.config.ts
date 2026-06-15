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
        navy:       "#0B1A30",   // Deep Navy
        cobalt:     "#0047AB",   // Cobalt Blue — primary brand
        darkblue:   "#00028E",   // Dark Blue — headers, body text
        almond:     "#E8DED2",   // Almond — page/card background
        cadmium:    "#FFDE21",   // Cadmium Yellow — primary CTA
        gold:       "#C9A84C",   // Gold — borders, rules, accents
        champagne:  "#EDD98A",   // Champagne — label text on dark
        fuchsia:    "#DE21FF",   // Fuchsia — badges, alerts
        sky:        "#5B8DEF",   // Sky Blue — links, interactive
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
