import { useTheme } from "@/context/ThemeContext";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { CldImage } from "next-cloudinary";
import React from "react";
import { ILogos, LogosType } from "./interface/iLogos";

/**
 * Logos component that displays a collection of logos in a responsive grid layout.
 * Uses Cloudinary for optimized image delivery and supports custom styling for specific logos.
 *
 * @component
 * @param {Object} props - Component props
 * @param {LogosType[]} props.logos - Array of logo names to be displayed
 *
 * @example
 * ```jsx
 * const logosList = ['react', 'typescript', 'marvel'];
 * <Logos logos={logosList} />
 * ```
 */
const Logos = ({ logos }: ILogos) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div className="flex flex-row gap-l items-center justify-start flex-wrap px-m">
      {logos.map((logo: LogosType) => (
        <CldImage
          key={logo}
          width="32"
          height="32"
          src={`${servicesUrls.cloudinary}logos/logo-${logo}`}
          className={`object-contain w-auto h-l ${logo === "marvel" && "w-[74px]"} ${
            logo === "next" && isDarkTheme && "invert"
          }`}
          alt={logo}
          format="svg"
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default Logos;
