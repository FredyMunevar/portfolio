"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import SectionContainer from "@/presentation/components/SectionContainer/SectionContainer";
import { useTranslations } from "next-intl";
import { CldImage } from "next-cloudinary";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import MuneIcon from "@/presentation/components/MuneIcon/MuneIcon";
import Link from "next/link";
import ThemeTransition from "@/presentation/components/ThemeTransition/ThemeTransition";

/**
 * Toolbox section component that displays technical skills and tools.
 * Features an accordion layout with categorized tools and an illustration.
 */
const Contact = () => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("contact");

  /** Array of contact media */
  const contactMedia = [
    {
      icon: t("media.phone.icon"),
      content: t("media.phone.content"),
    },
    {
      icon: t("media.email.icon"),
      content: t("media.email.content"),
    },
    {
      icon: t("media.linkedin.icon"),
      content: t("media.linkedin.content"),
    },
    {
      icon: t("media.github.icon"),
      content: t("media.github.content"),
    },
    {
      icon: t("media.instagram.icon"),
      content: t("media.instagram.content"),
    },
  ] as const;

  const handleLinks = (icon: string, content: string) => {
    const isExternal = icon.includes("linkedin") || icon.includes("github") || icon.includes("instagram");
    return (
      <Link
        target="_blank"
        rel="noopener noreferrer"
        className={`text-body ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}
        href={`${isExternal ? `https://${content}` : icon.includes("phone") ? `tel:${content}` : `mailto:${content}`}`}
      >
        {content}
      </Link>
    );
  };

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ThemeTransition
          wait
          className={`relative portrait:hidden portrait:md:flex portrait:lg:h-auto landscape:md:h-1/2 landscape:lg:h-2/3 landscape:xl:h-4/5 md:sticky md:top-xl`}
        >
          <CldImage
            width="2199"
            height="3824"
            src={`${servicesUrls.cloudinary}common/id-${isDarkTheme ? "dark" : "light"}`}
            className={
              "max-w-none w-[596px] md:w-[645px] lg:w-[590px] xl:w-[700px] absolute bottom-0 right-[50%] translate-x-1/2"
            }
            alt={t("title")}
          />
        </ThemeTransition>
        <section className="flex flex-col gap-l relative z-1 lg:pb-xxl">
          <h2 className="text-h1 font-semibold leading-none text-primary">{t("title")}</h2>

          <p className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
            {t("description")}
          </p>
          <ul className="flex flex-col gap-l">
            {contactMedia.map((item, index) => (
              <li key={index} className="flex items-center gap-m">
                <MuneIcon key={index} name={item.icon} color={"var(--primary)"} />
                {handleLinks(item.icon, item.content)}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SectionContainer>
  );
};

export default Contact;
