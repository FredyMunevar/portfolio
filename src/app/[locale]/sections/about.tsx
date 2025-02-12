"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import SectionContainer from "@/presentation/components/SectionContainer/SectionContainer";
import { useTranslations } from "next-intl";
import { CldImage } from "next-cloudinary";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import Experience from "@/presentation/components/Experience/Experience";

const About = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const t = useTranslations("about");
  const experiences = [
    "experiences.million",
    "experiences.branch",
    "experiences.netbangers",
    "experiences.zeta",
    "experiences.navarra",
  ] as const;

  return (
    <SectionContainer>
      <div className="flex flex-col gap-l xl:flex-row xl:gap-xl xl:justify-between xl:h-[94vh] xl:overflow-hidden">
        <div className="flex flex-col gap-l lg:gap-xl xl:justify-center">
          <div className="flex flex-col items-center gap-l md:flex-row-reverse md:justify-between md:items-center 2xl:justify-end">
            <h2 className="text-h1 font-semibold leading-none text-primary text-center md:text-left md:w-min md:min-w-[20rem] lg:w-auto">
              {t("title")}
            </h2>
            <CldImage
              width="94"
              height="50"
              src={`${servicesUrls.cloudynary}common/profile-picture`}
              className={"w-[16rem]"}
              alt={t("title")}
            />
          </div>
          <div
            className={`flex flex-col gap-m text-body text-center leading-loose ${
              isDarkTheme ? "text-tertiary" : "text-secondary"
            } `}
          >
            {t.rich("description", {
              part: (chunks) => <p className="xl:text-left">{chunks}</p>,
              strong: (chunks) => <strong className="text-primary">{chunks}</strong>,
            })}
          </div>
        </div>
        <aside
          className={`flex flex-col gap-m text-body text-center leading-loose xl:h-screen xl:px-l xl:overflow-y-auto xl:pb-[10vh] ${
            isDarkTheme ? "text-tertiary" : "text-secondary"
          } `}
        >
          <div>
            {experiences.map((experience) => (
              <Experience
                key={experience}
                role={t(`${experience}.role`)}
                title={t(`${experience}.title`)}
                date={t(`${experience}.date`)}
                description={t(`${experience}.description`)}
              />
            ))}
          </div>

          <p className="xl:text-left">{t("closure")}</p>
        </aside>
      </div>
    </SectionContainer>
  );
};

export default About;
