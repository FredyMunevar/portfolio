"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import SectionContainer from "@/presentation/components/SectionContainer/SectionContainer";
import { useTranslations } from "next-intl";
import CharactersMobile from "@/presentation/components/Branch/CharactersMobile";
import { CldImage } from "next-cloudinary";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import CharactersDesktop from "@/presentation/components/Branch/CharactersDesktop";
import Logos from "@/presentation/components/Logos/Logos";
import Video from "@/presentation/components/Video/Video";

const designLogos = ["xd", "illustrator", "photoshop", "affinity", "marvel"];
const devLogos = ["typescript", "html", "react", "wordpress", "vue", "sass"];

/**
 * Branch project page component that displays detailed information about the Branch project.
 * Features multiple sections including project info, design process, development stack, and outcomes.
 *
 * @description
 * Layout sections:
 * - Project information (role and type)
 * - Introduction with animated characters
 * - Project purpose and challenges
 * - Research and design process
 * - Design tools and wireframes
 * - Development stack
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
const Branch = () => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("branch");

  return (
    <SectionContainer paddingLess>
      <section className="flex flex-col">
        <div className="flex flex-col gap-l md:flex-row md:gap-[1.5rem] mb-xl px-m">
          <div className="flex flex-col gap-xs md:text-center md:w-1/2 xl:text-left xl:w-1/3">
            <h4 className={`text-type font-semibold ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
              {t("roleTitle")}
            </h4>
            <h5 className={`text-desc font-light ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
              {t("roleContent")}
            </h5>
          </div>
          <div className="flex flex-col gap-xs md:text-center md:w-1/2 xl:text-left xl:w-1/3">
            <h4 className={`text-type font-semibold ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
              {t("typeTitle")}
            </h4>
            <h5 className={`text-desc font-light ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
              {t("typeContent")}
            </h5>
          </div>
        </div>
        {/* intro section */}
        <div className="relative overflow-hidden pb-xl px-m mt-l">
          <div className="flex flex-col gap-l">
            <h2
              className={`text-h1 font-semibold leading-none text-center xl:text-left xl:w-2/3 ${
                isDarkTheme ? "text-branchSecondary" : "text-branchPrimary"
              }`}
            >
              {t("title")}
            </h2>
            <CharactersMobile />
            {t.rich("intro", {
              part: (chunks) => (
                <p
                  className={`text-body leading-loose text-center xl:text-left xl:w-5/12 ${
                    isDarkTheme ? "text-tertiary" : "text-secondary"
                  }`}
                >
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </div>
          <CharactersDesktop />
        </div>
        {/* description section */}
        <div className="bg-branchPrimary py-xl px-m grid grid-cols-1 xl:grid-cols-2 gap-l xl:flex-row">
          <div className="flex flex-col gap-l">
            <h2 className="text-h2 font-semibold leading-none text-center text-branchSecondary">{t("purposeTitle")}</h2>
            {t.rich("purposeContent", {
              part: (chunks) => <p className={`text-body leading-loose text-branchSecondary`}>{chunks}</p>,
            })}
            <ol className="list-decimal pl-l">
              {t.rich("purposeList", {
                li: (chunks) => <li className={`text-body leading-loose text-branchSecondary`}>{chunks}</li>,
              })}
            </ol>
          </div>
          <div className="flex flex-col gap-l">
            <h2 className="text-h2 font-semibold leading-none text-center text-branchSecondary">
              {t("challengeTitle")}
            </h2>
            <p className="text-body leading-loose text-branchSecondary">{t("challengeContent")}</p>
          </div>
        </div>
        {/* research section */}
        <div className="flex flex-col gap-l py-xl px-m">
          <h2
            className={`text-h2 font-semibold leading-tight text-center text-branchSecondary ${
              isDarkTheme ? "text-tertiary" : "text-secondary"
            }`}
          >
            {t("researchTitle")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-l items-center">
            {t.rich("researchContent", {
              part: (chunks) => (
                <p
                  className={`text-body leading-loose even:order-3 lg:even:order-4 odd:order-1 ${
                    isDarkTheme ? "text-tertiary" : "text-secondary"
                  }`}
                >
                  {chunks}
                </p>
              ),
            })}
            <CldImage
              width="849"
              height="550"
              src={`${servicesUrls.cloudinary}branch/canvas`}
              alt={"canvas"}
              className="w-full order-2"
            />
            <CldImage
              width="605"
              height="391"
              src={`${servicesUrls.cloudinary}branch/logo-board`}
              alt={"branch logo board"}
              className="w-full order-4 lg:order-3"
            />
          </div>
        </div>
        {/* image section */}
        <div className="mb-xl">
          <CldImage
            width="1199"
            height="799"
            src={`${servicesUrls.cloudinary}branch/branch-brochure`}
            alt={"branch brochure"}
            className="w-full"
          />
        </div>
        {/* design section */}
        <div className="flex flex-col gap-l px-m lg:flex-row lg:items-center">
          <div className="flex flex-col gap-l lg:w-3/5 xl:w-4/6 ">
            <h2
              className={`text-h2 font-semibold leading-tight text-center text-branchSecondary md:text-left ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("designTitle")}
            </h2>
            {t.rich("designContent", {
              part: (chunks) => (
                <p
                  className={`text-body leading-loose text-center md:text-left ${
                    isDarkTheme ? "text-tertiary" : "text-secondary"
                  }`}
                >
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
            <Logos logos={designLogos} />
          </div>
          <Video style={"w-full h-auto md:w-3/5 md:mx-auto lg:w-2/5 xl:w-2/6 "} video={"branch/branch-uses"} />
        </div>
        {/* wireframes section */}
        <div className="w-full h-[900px] overflow-hidden px-m mb-xl">
          <iframe
            src="https://marvelapp.com/j178ga9?emb=1&iosapp=true&frameless=false\"
            width="452"
            height="881"
            className="w-full h-full"
          ></iframe>
        </div>
        {/* development section */}
        <div className="flex flex-col gap-l w-full px-m pb-xl">
          <h2
            className={`text-h2 font-semibold leading-tight text-center text-branchSecondary ${
              isDarkTheme ? "text-tertiary" : "text-secondary"
            }`}
          >
            {t("devTitle")}
          </h2>
          {t.rich("devContent", {
            part: (chunks) => (
              <p
                className={`text-body leading-loose text-center md:text-left ${
                  isDarkTheme ? "text-tertiary" : "text-secondary"
                }`}
              >
                {chunks}
              </p>
            ),
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
          <Logos logos={devLogos} />
        </div>
        {/* outcome section */}
        <div className="flex flex-col gap-l relative overflow-x-clip px-m md:mb-xxl 2xl:overflow-visible">
          <div className="flex flex-col gap-l">
            <h2
              className={`text-h2 font-semibold leading-tight text-center text-branchSecondary md:text-left ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("outcomeTitle")}
            </h2>
            {t.rich("outcomeContent", {
              part: (chunks) => (
                <p
                  className={`text-body leading-loose text-center md:text-left md:odd:w-3/5 lg:odd:w-2/5 lg:even:w-3/5 xl:odd:w-3/5 ${
                    isDarkTheme ? "text-tertiary" : "text-secondary"
                  }`}
                >
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
            <CldImage
              width="855"
              height="714"
              src={`${servicesUrls.cloudinary}branch/crm`}
              className={
                "object-contain w-[534px] h-auto md:absolute top-[50%] -right-[5%] md:-right-[10%] lg:-right-[5%] lg:w-[734px] lg:top-0"
              }
              alt={"branch crm"}
            />
          </div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default Branch;
