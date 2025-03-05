import React, { ReactNode } from "react";
import ThemeTransition from "../ThemeTransition/ThemeTransition";

/**
 * SectionContainer component that provides a consistent layout wrapper for sections.
 * Includes theme transition animation and responsive padding/margins.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Content to be wrapped by the container
 */
const SectionContainer = ({ children, paddingLess }: { children: ReactNode; paddingLess?: boolean }) => {
  return (
    <main
      className={`relative z-10 w-screen ${
        !paddingLess && "px-m lg:p-l"
      } pb-xl pt-[8.5rem] flex flex-col items-start justify-center gap-l lg:pt-xl lg:mt-xxl xl:min-h-screen xl:pl-[208px] xl:pt-l xl:mt-l`}
    >
      <ThemeTransition wait className="flex flex-col items-center gap-l box-border">
        {children}
      </ThemeTransition>
    </main>
  );
};

export default SectionContainer;
