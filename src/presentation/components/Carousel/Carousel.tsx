import React, { useCallback } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { CarouselButton, useCarouselButton } from "./CarouselDot";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { CldImage } from "next-cloudinary";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

/**
 * Carousel component that displays a collection of slides with images and links.
 * Features autoplay functionality, navigation buttons, and theme-aware styling.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<{id: string, logo: string, src: string, link: string}>} props.slides - Array of slide objects
 * @param {Object} props.options - Options for the Embla carousel
 *
 * @example
 * ```jsx
 * const slides = [
 *   { id: "1", logo: "/path/to/logo1.svg", src: "/path/to/image1.jpg", link: "https://example.com" },
 *   { id: "2", logo: "/path/to/logo2.svg", src: "/path/to/image2.jpg", link: "https://example.com" }
 * ];
 * const options = { loop: true };
 *
 * <Carousel slides={slides} options={options} />
 * ```
 */
const Carousel = ({ slides, options }: CarouselType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const language = useLocale();

  /**
   * Handles navigation button click events
   * @param {EmblaCarouselType} emblaApi - Embla carousel API instance
   */
  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarouselButton(emblaApi, onNavButtonClick);

  return (
    <section className="m-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pinch-zoom touch-pan-y gap-m">
          {slides.map((item) => (
            <div
              className="min-w-0 flex grow-0 shrink-0 basis-full relative max-w-11/12 md:max-w-7/12 xl:max-w-6/12"
              key={`${item.id}`}
            >
              {item.logo && (
                <CldImage
                  width="968"
                  height="610"
                  src={`${item.logo}`}
                  className={"absolute h-max object-contain max-w-none w-[140px] left-m top-m"}
                  alt={"million"}
                  format="svg"
                />
              )}
              <CldImage className="w-full h-auto" width="968" height="610" src={`${item.src}`} alt={"million"} />
              {item.link && (
                <Link
                  className="absolute right-m bottom-m bg-secondary border-1 border-tertiary px-m py-s"
                  href={item.link}
                  target={"_blank"}
                >
                  <p className="text-desc text-tertiary">{language === "en" ? "Visit website" : "Visitar sitio web"}</p>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex mt-m">
        <div className="w-full flex justify-between items-center gap-m">
          {scrollSnaps.map((_, index) => (
            <CarouselButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`${index === selectedIndex ? "bg-primary" : "bg-gray"} w-auto h-xs flex grow-1`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
