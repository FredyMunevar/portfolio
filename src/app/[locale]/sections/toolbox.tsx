"use client";
import React, { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import SectionContainer from "@/presentation/components/SectionContainer/SectionContainer";
import { useTranslations } from "next-intl";
import { CldImage } from "next-cloudinary";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import Accordion from "@/presentation/components/Accordion/Accordion";
import { IAccordionItem } from "@/presentation/components/Accordion/interface/iAccordion";

/**
 * Renders a styled subtitle for tool sections
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Content to render
 */
const ToolSubtitle = ({ children, isDark }: { children: ReactNode; isDark: boolean }) => {
  return (
    <h4 className={`text-h4 font-semibold mt-l mb-m ${isDark ? "text-tertiary" : "text-secondary"}`}>{children}</h4>
  );
};

/**
 * Toolbox section component that displays technical skills and tools.
 * Features an accordion layout with categorized tools and an illustration.
 */
const Toolbox = () => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("toolbox");

  /**
   * Renders styled content for tool descriptions
   * @param {Object} props - Component props
   * @param {ReactNode} props.children - Content to render
   */
  const ToolContent = ({ children }: { children: ReactNode }) => {
    return <p className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>{children}</p>;
  };

  /** Array of tool categories with their descriptions */
  const tools: IAccordionItem[] = [
    {
      title: t("tools.design.title"),
      toolDescription: t.rich("tools.design.toolDescription", {
        subtitle: (chunks) => <ToolSubtitle isDark={isDarkTheme}>{chunks}</ToolSubtitle>,
        content: (chunks) => <ToolContent>{chunks}</ToolContent>,
      }),
    },
    {
      title: t("tools.front.title"),
      toolDescription: t.rich("tools.front.toolDescription", {
        subtitle: (chunks) => <ToolSubtitle isDark={isDarkTheme}>{chunks}</ToolSubtitle>,
        content: (chunks) => <ToolContent>{chunks}</ToolContent>,
      }),
    },
    {
      title: t("tools.mobile.title"),
      toolDescription: t.rich("tools.mobile.toolDescription", {
        subtitle: (chunks) => <ToolSubtitle isDark={isDarkTheme}>{chunks}</ToolSubtitle>,
        content: (chunks) => <ToolContent>{chunks}</ToolContent>,
      }),
    },
    {
      title: t("tools.collaboration.title"),
      toolDescription: t.rich("tools.collaboration.toolDescription", {
        subtitle: (chunks) => <ToolSubtitle isDark={isDarkTheme}>{chunks}</ToolSubtitle>,
        content: (chunks) => <ToolContent>{chunks}</ToolContent>,
      }),
    },
  ] as const;

  return (
    <SectionContainer>
      <div className="flex">
        <section className="flex flex-col gap-l lg:w-1/2">
          <h2 className="text-h1 font-semibold leading-none text-primary">{t("title")}</h2>
          {t.rich("description", {
            part: (chunks) => (
              <p className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>{chunks}</p>
            ),
          })}
          <Accordion id={"toolsAccordion"} items={tools} />
          <p className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
            {t.rich("closure", {
              part: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </p>
        </section>
        <div
          className={`portrait:hidden portrait:lg:flex portrait:lg:h-min lg:w-1/2 landscape:lg:h-fit lg:top-xl lg:sticky`}
        >
          <CldImage
            width="2118"
            height="1736"
            src={`${servicesUrls.cloudinary}common/bg-toolbox`}
            className={"w-full h-fit object-contain"}
            alt={t("title")}
            format="webp"
            loading="lazy"
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default Toolbox;
