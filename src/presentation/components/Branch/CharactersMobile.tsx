import React from "react";
import "@/presentation/styles/globals.css";
import AnimatedImage from "../AnimatedImage/AnimatedImage";

/**
 * CharactersMobile component that displays a group of animated character images
 * arranged in a layout optimized for mobile screens. This component uses the
 * `AnimatedImage` component for animations and optimized image delivery.
 *
 * @component
 * @example
 * ```jsx
 * <CharactersMobile />
 * ```
 *
 * @description
 * - Displays four animated images: two mechanics, a client, and a motorcycle.
 * - Positioned within a responsive container.
 * - Visible only on smaller screens and hidden on extra-large screens (`xl:hidden`).
 */
const CharactersMobile = () => {
  return (
    <div className="relative h-[240px] md:h-[398px] w-full max-w-[662px] mx-auto xl:hidden">
      <AnimatedImage
        containerStyle={"absolute bottom-0 left-0 z-10"}
        imageStyle={"md:w-[227px] md:h-[371px]"}
        image={"branch/mechanic-female"}
        alt={"branch mechanic"}
        imageWidth={137}
        imageHeight={225}
        svg
      />
      <AnimatedImage
        containerStyle={"absolute bottom-0 left-[120px] z-10 md:left-[175px]"}
        imageStyle={"md:w-[209px] md:h-[382px]"}
        image={"branch/client-mobile"}
        alt={"branch client"}
        imageWidth={127}
        imageHeight={231}
        svg
      />
      <AnimatedImage
        containerStyle={"absolute bottom-0 right-0 z-10"}
        imageStyle={"md:w-[205px] md:h-[396px]"}
        image={"branch/mechanic-male"}
        alt={"branch mechanic"}
        imageWidth={124}
        imageHeight={239}
        svg
      />
      <AnimatedImage
        containerStyle={"absolute bottom-0 left-[85px] z-0 md:left-[115px]"}
        imageStyle={"md:w-[477px] md:h-[281px]"}
        image={"branch/motorcycle"}
        alt={"branch motorcycle"}
        imageWidth={287}
        imageHeight={169}
        svg
      />
    </div>
  );
};

export default CharactersMobile;
