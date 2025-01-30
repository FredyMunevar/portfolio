"use client";
import React from "react";
import ThemeTransition from "@/components/ThemeTransition/ThemeTransition";
// import { useTheme } from "@/context/ThemeContext";
import "@/styles/globals.css";

const Precision = () => {
  // const { theme } = useTheme();
  // const isDarkTheme = theme === "dark";

  return (
    <main className="relative z-10 w-screen h-screen p-m flex flex-col items-start justify-center gap-l lg:p-l xl:pl-[208px]">
      <ThemeTransition wait className="flex flex-col items-center gap-l box-border">
        <p className={`w-full text-h1 font-semibold leading-snug`}>Precision</p>
      </ThemeTransition>
    </main>
  );
};

export default Precision;
