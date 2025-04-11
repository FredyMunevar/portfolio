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
import { weeloSnippets } from "@/snippets/weeloSnippets";
import AnimatedImage from "@/presentation/components/AnimatedImage/AnimatedImage";
import { useProjectAssets } from "@/hooks/useProjectAssets";

/**
 * Weelo project page component that displays detailed information about the Weelo project.
 * Features multiple sections including project info, design process, development stack, challenges, and outcomes.
 *
 * @component
 * @example
 * ```tsx
 * <Weelo />
 * ```
 *
 * @description
 * Layout sections:
 * - Project information (role and type)
 * - Introduction with animated poster
 * - Project purpose and target audience
 * - Research and design process
 * - Design tools and wireframes
 * - Development stack and code snippets
 * - Challenges faced
 * - Project outcomes
 *
 * Features:
 * - Responsive layout
 * - Theme-aware styling
 * - Localized content
 * - Interactive elements
 * - Animated components
 * - Image galleries
 * - Tool showcases
 */
const Weelo = () => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("weelo");

  /** Fetch project assets such as logos and slides */
  const { designLogos, devLogos } = useProjectAssets("weelo");

  return (
    <SectionContainer paddingLess>
      <section className="flex flex-col gap-l">
        {/* Intro section */}
        <div
          className={`relative pt-xl pb-[17rem] mb-[12rem] px-m bg-top bg-no-repeat bg-cover
            md:pb-[5rem] lg:px-l lg:mb-xxl xl:pb-[8rem] xl:mb-l xl:bg-cover
            bg-[url('https://res.cloudinary.com/disbunv6l/image/upload/v1741568494/weelo/bg-primary.png')]`}
        >
          <div className="flex flex-col">
            <ProjectInfo
              isDarkTheme={true}
              roleTitle={t("roleTitle")}
              roleContent={t("roleContent")}
              typeTitle={t("typeTitle")}
              typeContent={t("typeContent")}
            />
            <h2
              className={
                'text-h1 font-semibold leading-tight text-tertiary text-left md:w-7/12 portrait:md:w-1/2 xl:text-left xl:w-7/12 "text-tertiary'
              }
            >
              {t("title")}
            </h2>
          </div>
          <AnimatedImage
            containerStyle={
              "absolute top-[67%] right-0 md:top-[5%] portrait:md:top-[20%] landscape:md:top-[10%] lg:top-0 landscape:xl:top-[20%]"
            }
            imageStyle={"object-contain h-auto w-[534px] md:w-[450px] portrait:md:w-[600px] lg:w-[550px] xl:w-[730px]"}
            image={"weelo/weelo-report"}
            alt={"weelo report"}
            imageWidth={855}
            imageHeight={714}
          />
        </div>
        {t.rich("intro", {
          part: (chunks) => (
            <p
              className={`text-body leading-loose text-center px-m lg:px-l xl:text-left xl:w-6/12 ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {chunks}
            </p>
          ),
          strong: (chunks) => <strong>{chunks}</strong>,
        })}

        {/* Description section */}
        <div
          className={`bg-cover relative py-xxl px-m bg-no-repeat lg:px-l lg:my-l bg-[url('https://res.cloudinary.com/disbunv6l/image/upload/v1741568494/weelo/bg-secondary.png')]`}
        >
          <div className="flex flex-col gap-l lg:flex-row ">
            <div className="flex flex-col gap-l">
              <h2 className={"text-h2 font-semibold leading-none text-center text-weelo-primary"}>
                {t("purposeTitle")}
              </h2>
              {t.rich("purposeContent", {
                part: (chunks) => <p className={"text-body leading-loose text-weelo-primary"}>{chunks}</p>,
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
              <ol className="list-decimal pl-l">
                {t.rich("purposeList", {
                  li: (chunks) => <li className={"text-body leading-loose text-weelo-primary"}>{chunks}</li>,
                })}
              </ol>
            </div>
            <div className="flex flex-col gap-l">
              <h2 className={"text-h2 font-semibold leading-none text-center text-weelo-primary"}>
                {t("targetTitle")}
              </h2>
              <p className={"text-body leading-loose text-weelo-primary"}>{t("targetContent")}</p>
            </div>
          </div>
        </div>

        {/* Design section */}
        <div className="flex flex-col gap-l px-m py-l overflow-hidden md:flex-row portrait:md:flex-col md:items-center portrait:lg:flex-row lg:px-l lg:py-0 lg:flex-row">
          <div className="flex flex-col gap-l md:w-1/2 portrait:md:w-full lg:w-3/5 xl:w-3/6 ">
            <h2
              className={`text-h2 font-semibold leading-tight text-center md:text-left portrait:md:text-center ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
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
          <Video
            style={"w-[140%] -ml-[20%] h-auto md:w-3/5 portrait:md:w-full md:mx-auto lg:w-2/5 xl:w-3/6 "}
            video={"weelo/weelo-flow"}
          />
        </div>

        {/* Development section */}
        <div className="flex flex-col gap-l w-full px-m pb-xl xl:flex-row">
          <div className="flex flex-col gap-l xl:w-1/2">
            <h2
              className={`text-h2 font-semibold leading-tight text-center xl:text-left ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
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
          <div className="w-full overflow-hidden xl:w-1/2">
            <SnippetRenderer
              snippets={weeloSnippets}
              project="weelo"
              style={"portrait:h-[600px] h-[320px] portrait:md:h-[800px] xl:h-[670px]"}
            />
          </div>
        </div>

        {/* Challenges section */}
        <div className="flex flex-col gap-l w-full px-m pb-xl">
          <h2
            className={`text-h2 font-semibold leading-tight text-center ${
              isDarkTheme ? "text-tertiary" : "text-secondary"
            }`}
          >
            {t("challengeTitle")}
          </h2>
          <ul className="list-disc pl-l">
            {t.rich("challengeContent", {
              li: (chunks) => (
                <li className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
                  {chunks}
                </li>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </ul>
        </div>

        {/* Outcome section */}
        <div
          className={`relative bg-cover pt-xl pb-[15rem] px-m bg-top bg-no-repeat max-w-screen
            md:pt-[7rem] md:pb-[10rem] portrait:md:pb-[20rem] portrait:md:mb-[10rem] lg:px-l xl:pb-[15rem] xl:mb-[8rem] 2xl:!pb-[17rem] 2xl:!mb-[5rem]
            bg-[url('https://res.cloudinary.com/disbunv6l/image/upload/v1741568494/weelo/bg-primary-bottom.png')]`}
        >
          <div className="flex flex-col gap-l md:w-4/6 portrait:md:w-full xl:w-full">
            <h2 className={`text-h2 font-semibold leading-tight text-center text-weelo-secondary md:text-left`}>
              {t("outcomeTitle")}
            </h2>
            {t.rich("outcomeContent", {
              part: (chunks) => (
                <p
                  className={`text-body leading-loose text-tertiary md:last:w-3/5 xl:nth-3:w-4/6 xl:last:w-1/3 2xl:nth-2:w-2/3 2xl:nth-3:!w-3/5`}
                >
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </div>
          <AnimatedImage
            containerStyle={
              "absolute w-full h-fit right-0 top-[70%] md:w-fit md:top-[35%] portrait:md:top-[50%] portrait:md:right-[5%] xl:top-[35%] xl:right-l 2xl:!top-[25%]"
            }
            imageStyle={
              "absolute md:static h-max object-contain max-w-none right-0 w-[540px] md:w-[800px] portrait:md:w-[900px] lg:w-[800px] xl:w-[1000px]"
            }
            image={"weelo/weelo-records"}
            alt={"weelo report"}
            imageWidth={963}
            imageHeight={769}
          />
        </div>
      </section>
    </SectionContainer>
  );
};

export default Weelo;
