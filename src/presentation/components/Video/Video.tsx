import { useTheme } from "@/context/ThemeContext";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import React from "react";

/**
 * Video component that displays a responsive video with theme-aware sources.
 * Supports multiple video formats and automatic playback.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.height - CSS height value for the video container
 * @param {string} props.video - Base name of the video file (without extension)
 *
 * @example
 * ```jsx
 * <Video
 *   height="400px"
 *   video="intro"
 * />
 * ```
 *
 * @description
 * - Supports MP4, WebM, and OGV formats
 * - Automatically switches between dark/light theme versions
 * - Plays automatically, loops, and is muted by default
 * - Applies contrast adjustment for dark theme
 */
const Video = ({ style, video }: { style: string; video: string }) => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  return (
    <div className={`relative ${style}`}>
      {/* <video className={"w-full h-full object-fit"} autoPlay loop muted playsInline> */}
      <video
        className={`w-full h-full object-fit ${isDarkTheme && "[@media(hover:hover)]:contrast-[104%]"}`}
        autoPlay
        loop
        muted
        playsInline
      >
        {/* check if video background doesn't fit the web background */}
        <source
          src={`${servicesUrls.cloudinaryVideo}${video}-${isDarkTheme ? "dark" : "light"}.mp4`}
          type="video/mp4"
        />
        <source
          src={`${servicesUrls.cloudinaryVideo}${video}-${isDarkTheme ? "dark" : "light"}.webm`}
          type="video/webm"
        />
        <source
          src={`${servicesUrls.cloudinaryVideo}${video}-${isDarkTheme ? "dark" : "light"}.ogv`}
          type="video/ogg"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
