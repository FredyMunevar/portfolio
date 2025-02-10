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
  const tResult = t("experiences", { returnObjects: true }) as unknown as { title: string; text: string };

  console.log("experiences", tResult);

  return (
    <SectionContainer>
      <h2 className="text-h1 font-semibold leading-none text-primary text-center">{t("title")}</h2>
      <CldImage
        width="94"
        height="50"
        src={`${servicesUrls.cloudynary}common/profile-picture`}
        className={"w-[16rem]"}
        alt={t("title")}
      />
      <div
        className={`flex flex-col gap-m text-body text-center leading-loose ${
          isDarkTheme ? "text-tertiary" : "text-secondary"
        } `}
      >
        {t.rich("description", {
          part: (chunks) => <p>{chunks}</p>,
          strong: (chunks) => <strong className="text-primary">{chunks}</strong>,
        })}
        {/* {experiences.map((exp, index) => (
          <Experience key={index} title={exp.title} description={exp.description} />
        ))} */}

        {t("closure")}
      </div>
    </SectionContainer>
  );
};

export default About;
