"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import { useTranslations } from "next-intl";
import SectionContainer from "@/presentation/components/SectionContainer/SectionContainer";
import ProjectInfo from "@/presentation/components/ProjectInfo/ProjectInfo";
import Logos from "@/presentation/components/Logos/Logos";
import AnimatedImage from "@/presentation/components/AnimatedImage/AnimatedImage";
import { useProjectAssets } from "@/hooks/useProjectAssets";

/**
 * Precision project page component that displays detailed information about the Precision project.
 * Features multiple sections including project info, design process, development stack, challenges, and outcomes.
 *
 * @component
 * @example
 * ```tsx
 * <Precision />
 * ```
 *
 * @description
 * Layout sections:
 * - Project information (role and type)
 * - Introduction with animated poster
 * - Project purpose and target audience
 * - Research and design process
 * - Design tools and wireframes
 * - Development stack
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
const Precision = () => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("precision");

  /** Fetch project assets such as logos and slides */
  const { designLogos, devLogos } = useProjectAssets("precision");

  return (
    <SectionContainer paddingLess>
      <section className="flex flex-col gap-l">
        {/* Intro section */}
        <ProjectInfo
          isDarkTheme={isDarkTheme}
          roleTitle={t("roleTitle")}
          roleContent={t("roleContent")}
          typeTitle={t("typeTitle")}
          typeContent={t("typeContent")}
        />
        <div
          className={`relative pt-xl pb-[10rem] bg-cover bg-center px-m md:pt-xxl md:pb-[12rem]
            bg-[url('https://res.cloudinary.com/disbunv6l/image/upload/v1741568494/precision/precision-poster-bg-svg.svg')]`}
        >
          <div className="relative h-fit w-full flex justify-end">
            <AnimatedImage
              containerStyle={
                "w-fit absolute top-[18%] -left-[10rem] md:top-0 md:-left-xxl portrait:md:-top-xl portrait:md:-left-[16rem] portrait:lg:-left-xxl xl:-left-xl xl:-top-l"
              }
              imageStyle={"object-contain h-auto w-[350px] md:w-[700px]"}
              image={"precision/precision-poster"}
              alt={"precision poster"}
              imageWidth={923}
              imageHeight={564}
            />
            <h2 className={"text-h1 font-semibold leading-tight text-tertiary text-right md:w-4/6"}>{t("title")}</h2>
          </div>
        </div>
        {t.rich("intro", {
          part: (chunks) => (
            <p
              className={`text-body leading-loose text-center px-m ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}
            >
              {chunks}
            </p>
          ),
          strong: (chunks) => <strong>{chunks}</strong>,
        })}

        {/* Description section */}
        <div className={"flex flex-col px-m py-l gap-l md:flex-row"}>
          <AnimatedImage
            containerStyle={"w-full flex justify-center items-center md:w-3/6"}
            imageStyle={"object-contain max-w-none max-h-none h-auto w-full md:h-full md:w-auto md:mt-xxl lg:h-[130%]"}
            image={"precision/precision-mobile-facebook"}
            alt={"precision facebook"}
            imageWidth={597}
            imageHeight={852}
          />
          <div className={"flex flex-col gap-l w-full md:w-3/6"}>
            <h2
              className={`text-h2 font-semibold leading-none text-center md:text-left ${
                isDarkTheme ? "text-precision-primary" : "text-precision-secondary"
              }`}
            >
              {t("purposeTitle")}
            </h2>
            {t.rich("purposeContent", {
              part: (chunks) => (
                <p className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
            <h2
              className={`text-h2 font-semibold leading-none text-center md:text-left ${
                isDarkTheme ? "text-precision-primary" : "text-precision-secondary"
              }`}
            >
              {t("targetTitle")}
            </h2>
            <p
              className={`text-body leading-loose text-million-primary ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("targetContent")}
            </p>
          </div>
        </div>
        <AnimatedImage
          containerStyle={"w-full md:my-l"}
          imageStyle={"h-max object-contain max-w-none w-full"}
          image={"precision/precision-mockup"}
          alt={"precision mockup"}
          imageWidth={2458}
          imageHeight={1538}
        />

        {/* Design section */}
        <div className={"flex flex-col px-m py-l gap-l md:flex-row"}>
          <div className={"flex flex-col gap-l w-full md:w-3/6"}>
            <h2
              className={`text-h2 font-semibold leading-none text-center md:text-left ${
                isDarkTheme ? "text-precision-primary" : "text-precision-secondary"
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
          <AnimatedImage
            containerStyle={"w-full flex justify-center items-center md:w-3/6"}
            imageStyle={
              "object-contain max-w-none max-h-none h-auto w-full md:h-full md:max-h-[807px] md:w-auto md:mt-xxl lg:h-[130%]"
            }
            image={"precision/precision-mobile-instagram"}
            alt={"precision mockup"}
            imageWidth={897}
            imageHeight={1083}
          />
        </div>
        <div className="flex flex-col gap-l p-m md:flex-row md:mt-xl">
          <AnimatedImage
            containerStyle={"w-full"}
            imageStyle={"h-max object-contain max-w-none w-full"}
            image={"precision/precision-colors"}
            alt={"precision colors"}
            imageWidth={571}
            imageHeight={571}
          />
          <AnimatedImage
            containerStyle={"w-full"}
            imageStyle={"h-max object-contain max-w-none w-full"}
            image={"precision/precision-typography"}
            alt={"precision typography"}
            imageWidth={571}
            imageHeight={571}
          />
        </div>

        {/* Development section */}
        <div className={"flex flex-col px-m py-l gap-l md:flex-row mt-l"}>
          <AnimatedImage
            containerStyle={"w-full flex justify-center items-center md:w-3/6"}
            imageStyle={
              "object-contain max-w-none max-h-none h-auto w-full md:h-[120%] md:max-h-[807px] md:w-auto md:mt-xxl lg:h-[130%]"
            }
            image={"precision/precision-mobile-web"}
            alt={"precision mockup"}
            imageWidth={897}
            imageHeight={1083}
          />
          <div className={"flex flex-col gap-l w-full md:w-3/6"}>
            <h2
              className={`text-h2 font-semibold leading-none text-center md:text-left ${
                isDarkTheme ? "text-precision-primary" : "text-precision-secondary"
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

        {/* Outcome section */}
        <div
          className={`relative pt-[12rem] pb-xxl -mb-xxl -mt-l bg-cover bg-center px-m flex flex-col gap-l md:-mb-xl xl:-mt-xl
            bg-[url('https://res.cloudinary.com/disbunv6l/image/upload/v1741568494/precision/precision-outcome-svg.svg')]`}
        >
          <h2 className={"text-h1 font-semibold leading-tight text-precision-secondary text-center"}>
            {t("outcomeTitle")}
          </h2>
          {t.rich("outcomeContent", {
            part: (chunks) => <p className={`text-body leading-loose text-tertiary`}>{chunks}</p>,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
          <div className="relative h-fit w-full flex justify-end"></div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default Precision;
