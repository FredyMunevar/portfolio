import type { Config } from "tailwindcss";
export default {
  content: ["./src/presentation/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      tertiary: "var(--tertiary)",
      gray: "var(--gray)",
      grayLight: "var(--gray-light)",
      borderLight: "var(--border-light)",
      borderDark: "var(--border-dark)",
      branchPrimary: "var(--branch-primary)",
      branchSecondary: "var(--branch-secondary)",
      millionPrimary: "var(--million-primary)",
      millionSecondary: "var(--million-secondary)",
      weeloPrimary: "var(--weelo-primary)",
      weeloSecondary: "var(--weelo-secondary)",
      precisionPrimary: "var(--precision-primary)",
      precisionSecondary: "var(--precision-secondary)",
      montefrioPrimary: "var(--montefrio-primary)",
      montefrioSecondary: "var(--montefrio-secondary)",
      holaPrimary: "var(--hola-primary)",
      holaSecondary: "var(--hola-secondary)",
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
      footer: "1.125rem",
      desc: "0.938rem",
      type: "1.125rem",
      body: "clamp(1.125rem, 3vw, 1.250rem)",
      hero: "clamp(3.75rem, 10.5vw, 6.875rem)",
      h1: "clamp(2.688rem, 7.5vw, 3.563rem)",
      h2: "clamp(2.250rem, 6vw, 2.438rem)",
      h3: "clamp(1.875rem, 4vw, 2.063rem)",
      h4: "clamp(1.5rem, 3vw, 1.625rem)",
    },
  },
  plugins: [
    function ({ addVariant }: { addVariant: (name: string, css: string) => void }) {
      addVariant("pointer-coarse", "@media (pointer: coarse)");
    },
  ],
} satisfies Config;
