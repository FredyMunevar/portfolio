import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      tertiary: "var(--tertiary)",
      gray: "var(--gray)",
      borderLight: "var(--border-light)",
    },
    spacing: {
      0: "0",
      xxs: "0.125rem",
      xs: "0.25rem",
      s: "0.5rem",
      m: "1rem",
      l: "2rem",
      xl: "4rem",
      xxl: "8rem",
    },
    fontFamily: {
      primary: ["Poppins", "sans-serif"],
    },
    fontWeight: {
      extralight: "200",
      light: "300",
      normal: "400",
      semibold: "600",
    },
    fontSize: {
      menu: "1.250rem",
      footer: "1rem",
      desc: "0.750rem",
      type: "1rem",
      p: "clamp(1rem, 3vw, 1.125rem)",
      h1: "clamp(2.063rem, 7.5vw, 2.938rem)",
      h2: "clamp(1.625rem, 6vw, 1.813rem)",
      h3: "clamp(1.250rem, 4vw, 1.438rem)",
    },
  },
  plugins: [],
} satisfies Config;
