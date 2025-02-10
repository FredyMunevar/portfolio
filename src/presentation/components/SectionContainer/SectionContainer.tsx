import React, { ReactNode } from "react";
import ThemeTransition from "../ThemeTransition/ThemeTransition";

const SectionContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative z-10 w-screen px-m pb-xl pt-[8.5rem] flex flex-col items-start justify-center gap-l lg:p-l xl:pl-[208px]">
      <ThemeTransition wait className="flex flex-col items-center gap-l box-border">
        {children}
      </ThemeTransition>
    </main>
  );
};

export default SectionContainer;
