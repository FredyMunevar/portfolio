"use client";
import React from "react";
import Button from "@/presentation/components/Button/Button";
import ThemeTransition from "@/presentation/components/ThemeTransition/ThemeTransition";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import Spline from "@splinetool/react-spline";
import { CldImage } from "next-cloudinary";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const darkBackground = `${servicesUrls.spline}KtWHnM7y4nQFU3sL/scene.splinecode`;
const lightBackground = `${servicesUrls.spline}DqlTPzji7ZwnT9OV/scene.splinecode`;

/**
 * Home component that displays the main page of the website.
 *
 * @returns {JSX.Element} The rendered home component.
 */
const Home = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const themeTextColor = isDarkTheme ? "text-tertiary" : "text-secondary";
  const t = useTranslations("home");

  /**
   * Props for the ProjectButton component.
   */
  interface ProjectButtonProps {
    href: string;
    colorImage: string;
    whiteImage: string;
    alt: string;
  }

  /**
   * ProjectButton component that renders a button linking to a project.
   *
   * @param {ProjectButtonProps} props - The properties object.
   * @returns {JSX.Element} The rendered project button component.
   */
  const ProjectButton = ({ href, colorImage, whiteImage, alt }: ProjectButtonProps) => {
    const projectButtonStyles = `h-xl border flex-grow flex items-center justify-center transition-all duration-1000 ease-in-out
      ${isDarkTheme ? "border-tertiary" : "border-secondary"}
    `;
    return (
      <Link className={`${projectButtonStyles} hover:bg-tertiary hover:border-tertiary group`} href={href}>
        {isDarkTheme ? (
          <>
            <CldImage
              width="94"
              height="50"
              src={`${servicesUrls.cloudynary}${whiteImage}.svg`}
              className={"block group-hover:hidden"}
              alt={alt}
              format="svg"
            />
            <CldImage
              width="94"
              height="50"
              src={`${servicesUrls.cloudynary}${colorImage}.svg`}
              className={"hidden group-hover:block"}
              alt={alt}
              format="svg"
            />
          </>
        ) : (
          <CldImage width="94" height="50" src={`${servicesUrls.cloudynary}${colorImage}.svg`} alt={alt} format="svg" />
        )}
      </Link>
    );
  };

  return (
    <main>
      <div className="relative z-10 w-screen h-screen p-m flex flex-col items-start justify-center gap-l lg:p-l xl:pl-[208px]">
        <ThemeTransition wait className="flex flex-col items-center justify-between gap-xl box-border">
          <h1
            className={`w-full text-hero font-semibold leading-none tracking-tighter xl:text-center ${themeTextColor}`}
          >
            {t("title")}{" "}
          </h1>
          <p
            className={`text-p font-light leading-relaxed landscape:hidden xl:landscape:block xl:text-center ${themeTextColor}`}
          >
            {t("description")}
          </p>
          <div className="hidden md:flex w-full flex-col justify-start gap-m landscape:hidden xl:landscape:!flex">
            <h3 className={`text-h3 font-semibold ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
              {t("subtitle")}
            </h3>
            <div className="w-full flex gap-l justify-between">
              <ProjectButton
                href={"/projects/million"}
                colorImage={"million/million-color"}
                whiteImage={"million/million-white"}
                alt={"Million luxury"}
              />
              <ProjectButton
                href={"/projects/branch"}
                colorImage={"branch/branch-text-color"}
                whiteImage={"branch/branch-text-white"}
                alt={"Branch app"}
              />
              <ProjectButton
                href={"/projects/weelo"}
                colorImage={"weelo/weelo-color"}
                whiteImage={"weelo/weelo-white"}
                alt={"Weelo"}
              />
            </div>
          </div>
        </ThemeTransition>
        <div className="w-full flex gap-l justify-start lg:justify-end">
          <Button link={servicesUrls.cvDownload} props={{ target: "_blank" }} buttonType="secondary" largeButton>
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
