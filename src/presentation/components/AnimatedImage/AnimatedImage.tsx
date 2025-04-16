import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { motion } from "motion/react";
import { CldImage } from "next-cloudinary";
import React from "react";

/**
 * AnimatedImage component that displays an image with a fade-in and slide-up animation.
 * Uses Framer Motion for animations and Cloudinary for optimized image delivery.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.containerStyle - CSS classes for the container element
 * @param {string} props.imageStyle - CSS classes for the image element
 * @param {string} props.image - Path to the image file (relative to the Cloudinary base URL)
 * @param {string} props.alt - Alt text for the image
 *
 * @example
 * ```jsx
 * <AnimatedImage
 *   containerStyle="w-full h-auto"
 *   imageStyle="rounded-lg shadow-lg"
 *   image="path/to/image.jpg"
 *   alt="Descriptive alt text"
 * />
 * ```
 */
const AnimatedImage = ({
  containerStyle,
  imageStyle,
  imageWidth,
  imageHeight,
  image,
  alt,
  children,
  svg,
}: {
  containerStyle: string;
  imageStyle?: string;
  imageWidth: number;
  imageHeight: number;
  image: string;
  alt: string;
  children?: React.ReactNode;
  svg?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(20px)" }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileInView={{ opacity: 1, transform: "translateY(0)" }}
      className={containerStyle}
    >
      {children}
      <CldImage
        width={imageWidth}
        height={imageHeight}
        src={`${servicesUrls.cloudinary}${image}`}
        className={imageStyle}
        alt={alt}
        format={svg ? "svg" : "webp"}
        loading="lazy"
      />
    </motion.div>
  );
};

export default AnimatedImage;
