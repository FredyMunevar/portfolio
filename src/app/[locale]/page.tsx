"use client";
import React from "react";
import Button from "@/presentation/components/Button/Button";
import ThemeTransition from "@/presentation/components/ThemeTransition/ThemeTransition";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import Spline from "@splinetool/react-spline";
import { useTranslations } from "next-intl";

/**
 * Home page component that displays the main landing page of the website.
 * Features a responsive layout with animated theme transitions, 3D background,
 * and localized content.
 */
const Home = () => {
  /**
   * Theme context for dark/light mode
   */
  const { theme } = useTheme();

  /**
   * Flag to check if dark theme is active
   */
  const isDarkTheme = theme === "dark";

  /**
   * Dynamic text color based on current theme
   */
  const themeTextColor = isDarkTheme ? "text-tertiary" : "text-secondary";

  /**
   * Translation function for localized content
   */
  const t = useTranslations("home");

  /**
   * 3D background scene URLs for different themes
   */
  const darkBackground = `${servicesUrls.spline}KtWHnM7y4nQFU3sL/scene.splinecode`;
  const lightBackground = `${servicesUrls.spline}DqlTPzji7ZwnT9OV/scene.splinecode`;

  return (
    <main>
      <div className="relative z-10 w-screen h-screen p-m flex flex-col items-start justify-center gap-l lg:p-l xl:pl-[208px]">
        <ThemeTransition wait className="flex flex-col items-center justify-between gap-xl box-border">
          <h1
            className={`w-full text-hero font-semibold leading-none tracking-tighter xl:text-center landscape:text-center ${themeTextColor}`}
          >
            {t("title")}{" "}
          </h1>
          <h2
            className={`text-h4 font-light leading-relaxed landscape:hidden lg:landscape:block xl:text-center ${themeTextColor}`}
          >
            {t("description")}
          </h2>
        </ThemeTransition>
        <div className="w-full flex gap-l justify-start landscape:justify-center landscape:lg:justify-center">
          <Button link={servicesUrls.cvDownload} buttonType="secondary" largeButton>
            {t("downloadButton")}
          </Button>
          <Button link={"/projects"} largeButton>
            {t("projectsButton")}
          </Button>
        </div>
      </div>
      <div className="absolute top-0 w-screen h-screen overflow-hidden">
        <ThemeTransition className="w-screen h-[120vh] absolute -z-10">
          <Spline scene={isDarkTheme ? darkBackground : lightBackground} />
        </ThemeTransition>
      </div>
    </main>
  );
};

export default Home;
