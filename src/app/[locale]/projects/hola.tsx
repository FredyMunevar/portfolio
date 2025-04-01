"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import { useTranslations } from "next-intl";
import SectionContainer from "@/presentation/components/SectionContainer/SectionContainer";
import ProjectInfo from "@/presentation/components/ProjectInfo/ProjectInfo";
import Logos from "@/presentation/components/Logos/Logos";
import Video from "@/presentation/components/Video/Video";
import SnippetRenderer from "@/presentation/components/SnippetRenderer/SnippetRenderer";
import { LogosType } from "@/presentation/components/Logos/interface/iLogos";
import { holaSnippets } from "@/snippets/hola/holaSnippets";
import AnimatedImage from "@/presentation/components/AnimatedImage/AnimatedImage";

const designLogos: LogosType[] = ["figma", "illustrator", "photoshop"];
const devLogos: LogosType[] = ["typescript", "react", "git", "webpack", "eslint", "prettier"];
const Hola = () => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("hola");

  return (
    <SectionContainer paddingLess>
      <section className="flex flex-col gap-xl">
        {/* intro section */}
        <div className={"flex flex-col gap-l"}>
          <ProjectInfo
            isDarkTheme={isDarkTheme}
            roleTitle={t("roleTitle")}
            roleContent={t("roleContent")}
            typeTitle={t("typeTitle")}
            typeContent={t("typeContent")}
          />
          <div className="relative h-fit md:flex md:justify-end md:-mt-xxl portrait:md:justify-center portrait:lg:justify-end">
            <AnimatedImage
              containerStyle={
                "w-9/12 absolute top-0 left-[50%] -translate-x-[50%] -z-1 md:z-1 md:w-fit md:left-[unset] md:translate-x-[unset] portrait:md:-z-1 portrait:md:top-xxl lg:top-0 portrait:lg:z-1 portrait:lg:top-0"
              }
              imageStyle={
                "object-contain h-auto w-[534px] md:w-[340px] portrait:md:w-[500px] lg:w-[430px] portrait:lg:!w-[500px] xl:w-[450px]"
              }
              image={"hola/hola-poster"}
              alt={"million poster"}
              imageWidth={430}
              imageHeight={759}
            />
            <div className="bg-hola-secondary px-m py-l mt-[24rem] mb-xl md:mt-xxl md:mb-l portrait:md:mt-[36rem] portrait:md:mb-[20rem] portrait:lg:mt-xxl portrait:lg:mb-l xl:p-l">
              <h2
                className={
                  "text-h1 font-semibold leading-tight text-tertiary text-left md:w-7/12 portrait:md:w-full portrait:lg:w-1/2"
                }
              >
                {t("title")}
              </h2>
            </div>
          </div>
          {t.rich("intro", {
            part: (chunks) => (
              <p
                className={`text-body leading-loose text-center px-m md:text-left md:w-4/7 md:last:w-full portrait:md:w-full portrait:md:text-center portrait:lg:text-left lg:last:w-8/12 portrait:lg:w-1/2 xl:w-7/12 xl:last:w-8/12 xl:!pl-l ${
                  isDarkTheme ? "text-tertiary" : "text-secondary"
                }`}
              >
                {chunks}
              </p>
            ),
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </div>
        {/* description section */}
        <div
          className={`p-m flex flex-col justify-start portrait:md:flex-col md:flex-row md:mt-xl portrait:lg:flex-row xl:p-l xl:mt-xxl`}
        >
          <Video
            style={"w-[140%] -ml-[25%] h-auto md:w-3/5 portrait:md:w-full md:mx-auto lg:w-2/5 xl:w-3/6 "}
            video={"hola/hola-mockup"}
          />
          <div className="w-full flex flex-col gap-l px-m py-l bg-hola-primary rounded-lg md:p-l portrait:md:w-full md:w-3/5 lg:max-w-7/12">
            <h2 className={"text-h2 font-semibold leading-none text-center text-hola-secondary"}>
              {t("purposeTitle")}
            </h2>
            {t.rich("purposeContent", {
              part: (chunks) => <p className={"text-body leading-loose text-tertiary"}>{chunks}</p>,
              strong: (chunks) => <strong>{chunks}</strong>,
            })}

            <h2 className={"text-h2 font-semibold leading-none text-center text-hola-secondary"}>{t("targetTitle")}</h2>
            <p className={"text-body leading-loose text-tertiary"}>{t("targetContent")}</p>
          </div>
        </div>
        {/* design section */}
        <div className="flex flex-col gap-l px-m py-l overflow-hidden md:flex-row portrait:md:flex-col md:items-center portrait:lg:flex-row lg:px-l lg:py-0 lg:flex-row">
          <div className="flex flex-col gap-l md:w-1/2 portrait:md:w-full lg:w-1/2 portrait:lg:w-1/2 xl:w-1/2 ">
            <h2
              className={`text-h2 font-semibold leading-tight text-center md:text-left portrait:md:text-center portrait:lg:text-left ${
                isDarkTheme ? "text-hola-secondary" : "text-hola-primary"
              }`}
            >
              {t("designTitle")}
            </h2>
            <ul className="list-disc pl-l">
              {t.rich("designContent", {
                li: (chunks) => (
                  <li className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
                    {chunks}
                  </li>
                ),
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </ul>
            <Logos logos={designLogos} />
          </div>
          <div className="w-full h-dvh overflow-hidden mb-xl portrait:md:mb-xl md:mb-0 md:w-1/2 md:h-[1000px] lg:h-[900px]">
            <iframe
              width="800"
              height="450"
              src={`https://embed.figma.com/proto/CXW4ouRWmmaqFvMfIjaZex/Hola-Car-Rental-App-v1?page-id=2412%3A12518&node-id=2574-28496&p=f&theme=${
                isDarkTheme ? "dark" : "light"
              }&viewport=-13887%2C-521%2C0.56&scaling=scale-down&content-scaling=fixed&embed-host=share`}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* development section */}
        <div className="flex flex-col gap-l w-full px-m pb-xl portrait:md:flex-col md:flex-row portrait:lg:flex-row lg:px-l">
          <div className="w-full overflow-hidden order-2 portrait:md:order-2 md:order-1 portrait:md:w-full md:w-1/2 portrait:lg:order-1 portrait:lg:w-1/2">
            <SnippetRenderer
              snippets={holaSnippets}
              project="hola"
              style={"h-[600px] portrait:md:h-[800px] xl:h-[570px] 2xl:h-[490px]"}
            />
          </div>
          <div className="flex flex-col gap-l order-1 portrait:md:order-1 md:order-2 portrait:md:w-full portrait:lg:order-2 md:w-1/2 portrait:lg:w-1/2">
            <h2
              className={`text-h2 font-semibold leading-tight text-center md:text-left portrait:md:text-center portrait:lg:text-left ${
                isDarkTheme ? "text-hola-secondary" : "text-hola-primary"
              }`}
            >
              {t("devTitle")}
            </h2>
            <ul className="list-disc pl-l">
              {t.rich("devContent", {
                li: (chunks) => (
                  <li className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
                    {chunks}
                  </li>
                ),
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </ul>
            <Logos logos={devLogos} />
          </div>
        </div>
        {/* challenges section */}
        <div className="flex flex-col gap-l px-m py-l overflow-hidden md:flex-row portrait:md:flex-col md:items-center portrait:lg:flex-row lg:px-l lg:py-0 lg:flex-row">
          <div className="flex flex-col gap-l md:w-1/2 portrait:md:w-full lg:w-1/2 portrait:lg:w-1/2 xl:w-1/2 ">
            <h2
              className={`text-h2 font-semibold leading-tight text-center md:text-left portrait:md:text-center portrait:lg:text-left ${
                isDarkTheme ? "text-hola-secondary" : "text-hola-primary"
              }`}
            >
              {t("challengeTitle")}
            </h2>
            {t.rich("challengeContent", {
              part: (chunks) => (
                <p className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </div>
          <div className="w-full h-[600px] overflow-hidden mb-xl portrait:md:mb-xl md:mb-0 md:w-1/2 md:h-[750px] lg:h-[750px]">
            <iframe
              width="800"
              height="450"
              src={`https://embed.figma.com/proto/sBKjw74xNfcUFyiSvM0g2O/2024-UIKit-Hola-Car-Rentals-v3?page-id=710%3A1125&node-id=710-10625&p=f&theme=${
                isDarkTheme ? "dark" : "light"
              }&viewport=-1098%2C-2908%2C0.19&scaling=scale-down-width&content-scaling=fixed&hotspot-hints=0&embed-host=share`}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* outcome section */}
        <div className={`flex flex-col gap-l px-m py-l mx-m bg-hola-secondary rounded-lg md:p-l`}>
          <h2 className={"text-h2 font-semibold leading-tight text-center text-tertiary"}>{t("outcomeTitle")}</h2>
          {t.rich("outcomeContent", {
            part: (chunks) => <p className={"text-body text-center leading-loose text-tertiary"}>{chunks}</p>,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </div>
      </section>
    </SectionContainer>
  );
};

export default Hola;
