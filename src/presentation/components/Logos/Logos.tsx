import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { CldImage } from "next-cloudinary";
import React from "react";

/**
 * Logos component that displays a collection of logos in a responsive grid layout.
 * Uses Cloudinary for optimized image delivery and supports custom styling for specific logos.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string[]} props.logos - Array of logo names to be displayed
 *
 * @example
 * ```jsx
 * const logosList = ['react', 'typescript', 'marvel'];
 * <Logos logos={logosList} />
 * ```
 */
const Logos = ({ logos }: { logos: string[] }) => {
  return (
    <div className="flex flex-row gap-l items-center justify-start flex-wrap px-m">
      {logos.map((logo: string) => (
        <CldImage
          key={logo}
          width="32"
          height="32"
          src={`${servicesUrls.cloudinary}logos/logo-${logo}`}
          className={`object-contain ${logo === "marvel" && "w-[74px]"}`}
          alt={logo}
          format="svg"
        />
      ))}
    </div>
  );
};

export default Logos;
