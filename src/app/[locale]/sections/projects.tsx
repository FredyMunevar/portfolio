"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import SectionContainer from "@/presentation/components/SectionContainer/SectionContainer";
import { useTranslations } from "next-intl";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import Button from "@/presentation/components/Button/Button";
import MuneIcon from "@/presentation/components/MuneIcon/MuneIcon";
import Project from "@/presentation/components/Project/Project";

/**
 * Array of project configurations
 * @type {Array<{title: string, link: string, img: string, bg: string}>}
 */
const projectList = [
  {
    title: "Branch",
    link: "/projects/branch",
    img: "branch/branch-text-white",
    bg: "bg-branchPrimary",
  },
  {
    title: "Weelo",
    link: "/projects/weelo",
    img: "weelo/weelo-white",
    bg: "bg-weeloPrimary",
  },
  {
    title: "Million",
    link: "/projects/million",
    img: "million/million-white",
    bg: "bg-millionPrimary",
  },
  {
    title: "Monte Frío",
    link: "/projects/monte-frio",
    img: "monte-frio/monte-frio-white",
    bg: "bg-montefrioSecondary",
  },
  {
    title: "Precision",
    link: "/projects/precision",
    img: "precision/precision-white",
    bg: "bg-precisionSecondary",
  },
  {
    title: "Hola rental car",
    link: "/projects/hola",
    img: "hola/hola-white",
    bg: "bg-holaPrimary",
  },
];

/**
 * Projects section component that displays a grid of project cards.
 * Features responsive layout, theme-aware styling, and localized content.
 */
const Projects = () => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("projects");

  return (
    <SectionContainer paddingLess>
      <section className="flex flex-col gap-l px-m xl:pl-0">
        <h2 className="text-h1 font-semibold leading-none text-primary">{t("title")}</h2>
        {t.rich("description", {
          part: (chunks) => (
            <p className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>{chunks}</p>
          ),
        })}
      </section>
      <section className="w-screen xl:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projectList.map((project) => (
          <Project key={project.title} title={project.title} link={project.link} img={project.img} bg={project.bg} />
        ))}
      </section>
      <div className="w-full flex items-start gap-m">
        <Button link={servicesUrls.behance} target="_blank">
          {t("button")}
        </Button>
        <MuneIcon name={"icon-behance"} size={30} color="var(--primary)" />
      </div>
    </SectionContainer>
  );
};

export default Projects;
