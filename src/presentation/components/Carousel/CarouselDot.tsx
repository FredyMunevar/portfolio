import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { CarouselButtonType, UseCarouselButtonType } from "./interface/Carousel";

/**
 * Custom hook to manage carousel button functionality.
 * Handles dot button clicks, initialization, and selection state.
 *
 * @param {EmblaCarouselType | undefined} emblaApi - Embla carousel API instance
 * @param {Function} [onButtonClick] - Optional callback function for button click events
 *
 * @returns {Object} Hook return values
 * @returns {number} selectedIndex - Index of the currently selected slide
 * @returns {number[]} scrollSnaps - Array of scroll snap positions
 * @returns {Function} onDotButtonClick - Function to handle dot button clicks
 */
export const useCarouselButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseCarouselButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

/**
 * CarouselButton component that renders a button for carousel navigation.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be rendered inside the button
 * @param {Object} restProps - Additional props to be passed to the button element
 *
 * @example
 * ```jsx
 * <CarouselButton onClick={() => console.log('Button clicked')}>
 *   Button Content
 * </CarouselButton>
 * ```
 */
export const CarouselButton: React.FC<CarouselButtonType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button className="bg-tertiary" type="button" {...restProps}>
      {children}
    </button>
  );
};
