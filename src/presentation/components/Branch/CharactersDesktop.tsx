import React from "react";
import "@/presentation/styles/globals.css";
import AnimatedImage from "../AnimatedImage/AnimatedImage";

/**
 * CharactersDesktop component that displays a group of animated character images
 * arranged in a circular layout. This component is designed for desktop screens
 * and uses the `AnimatedImage` component for animations and optimized image delivery.
 *
 * @component
 * @example
 * ```jsx
 * <CharactersDesktop />
 * ```
 *
 * @description
 * - Displays three animated character images.
 * - Positioned within a circular background.
 * - Hidden on smaller screens and visible only on extra-large screens (`xl:flex`).
 */
const CharactersDesktop = () => {
  return (
    <div className="absolute -right-xl -bottom-[40%] h-[608px] w-[608px] rounded-full bg-branchSecondary hidden xl:flex">
      <AnimatedImage
        containerStyle={"absolute bottom-0 left-0 z-10"}
        image={"branch/client-desktop"}
        alt={"branch client"}
        imageWidth={331}
        imageHeight={640}
        svg
      />
      <AnimatedImage
        containerStyle={"absolute bottom-0 left-[190px] z-0"}
        image={"branch/mechanic-male"}
        alt={"branch mechanic"}
        imageWidth={337}
        imageHeight={652}
        svg
      />
      <AnimatedImage
        containerStyle={"absolute bottom-0 right-0 z-10"}
        imageStyle={"scale-x-[-1]"}
        image={"branch/mechanic-female"}
        alt={"branch mechanic"}
        imageWidth={347}
        imageHeight={570}
        svg
      />
    </div>
  );
};

export default CharactersDesktop;
