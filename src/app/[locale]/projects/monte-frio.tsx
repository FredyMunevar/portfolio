"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import { useTranslations } from "next-intl";
import SectionContainer from "@/presentation/components/SectionContainer/SectionContainer";
import ProjectInfo from "@/presentation/components/ProjectInfo/ProjectInfo";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import { CldImage } from "next-cloudinary";
import { motion } from "motion/react";
import Logos from "@/presentation/components/Logos/Logos";
import Video from "@/presentation/components/Video/Video";
import SnippetRenderer from "@/presentation/components/SnippetRenderer/SnippetRenderer";
import { LogosType } from "@/presentation/components/Logos/interface/iLogos";
import { EmblaOptionsType } from "embla-carousel";
import Carousel from "@/presentation/components/Carousel/Carousel";
import { millionSnippets } from "@/snippets/million/millionSnippets";

const designLogos: LogosType[] = ["illustrator", "photoshop"];
const OPTIONS: EmblaOptionsType = { align: "start" };
const SKETCH_SLIDES = [
  {
    id: 1,
    src: `${servicesUrls.cloudinary}monte-frio/monte-frio-sketch-1`,
  },
  {
    id: 2,
    src: `${servicesUrls.cloudinary}monte-frio/monte-frio-sketch-2`,
  },
  {
    id: 3,
    src: `${servicesUrls.cloudinary}monte-frio/monte-frio-sketch-3`,
  },
];
const MARIA_SLIDES = [
  {
    id: 1,
    src: `${servicesUrls.cloudinary}monte-frio/monte-frio-maria-1`,
  },
  {
    id: 2,
    src: `${servicesUrls.cloudinary}monte-frio/monte-frio-maria-2`,
  },
  {
    id: 3,
    src: `${servicesUrls.cloudinary}monte-frio/monte-frio-maria-3`,
  },
];
const SOCIAL_SLIDES = [
  {
    id: 1,
    src: `${servicesUrls.cloudinary}monte-frio/monte-frio-instagram`,
  },
  {
    id: 2,
    src: `${servicesUrls.cloudinary}monte-frio/monte-frio-pop-external`,
  },
  {
    id: 3,
    src: `${servicesUrls.cloudinary}monte-frio/monte-frio-car`,
  },
];
const MonteFrio = () => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("monteFrio");

  return (
    <SectionContainer paddingLess>
      <section className="flex flex-col gap-l">
        {/* intro section */}
        <div className={"flex flex-col gap-l"}>
          <ProjectInfo
            isDarkTheme={isDarkTheme}
            roleTitle={t("roleTitle")}
            roleContent={t("roleContent")}
            typeTitle={t("typeTitle")}
            typeContent={t("typeContent")}
          />
          {/* <div className="relative pt-[16rem] md:pt-0"> */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            className="relative mt-[10rem] w-full h-[24rem] flex justify-center items-center md:mt-0 md:h-[40rem] portrait:md:h-[45rem] lg:h-[43rem]"
          >
            <div
              className="absolute w-full h-[30rem] -top-[12rem] bg-cover bg-left
              md:w-8/12 md:h-[60rem] md:right-0 md:bg-left md:-top-[14rem]
              lg:w-9/12 lg:h-[55rem] lg:-top-[16rem]
            bg-[url('https://res.cloudinary.com/disbunv6l/image/upload/v1741568494/monte-frio/monte-frio-splash.png')]"
            ></div>
            <h2
              className={
                "absolute text-h1 font-semibold leading-tight tracking-tight text-montefrio-secondary text-right right-m -top-xl md:top-l md:w-9/12 lg:w-8/12 lg:top-m lg:right-l"
              }
            >
              {t("title")}
            </h2>
            <CldImage
              width="2000"
              height="1119"
              src={`${servicesUrls.cloudinary}monte-frio/monte-frio-hero-short`}
              className={"object-cover h-full w-auto"}
              alt={"monte frío hero"}
            />
          </motion.div>
          {/* </div> */}
          {t.rich("intro", {
            part: (chunks) => (
              <p
                className={`text-body leading-loose text-center px-m ${
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
        <div className={"flex flex-col gap-l py-l md:flex-row"}>
          <div className="w-full md:w-2/6">
            <CldImage
              width="1140"
              height="757"
              src={`${servicesUrls.cloudinary}monte-frio/monte-frio-cards`}
              className={"object-cover h-full w-auto"}
              alt={"monte frío hero"}
            />
          </div>
          <div className="w-full flex flex-col gap-l px-m md:w-4/6">
            <h2
              className={`text-h2 font-semibold leading-none text-center ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("purposeTitle")}
            </h2>
            {t.rich("purposeContent", {
              part: (chunks) => (
                <p
                  className={`text-body leading-loose text-million-primary ${
                    isDarkTheme ? "text-tertiary" : "text-secondary"
                  }`}
                >
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
            <h2
              className={`text-h2 font-semibold leading-none text-center ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
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
            <h2
              className={`text-h2 font-semibold leading-none text-center ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("constraintsTitle")}
            </h2>
            <p
              className={`text-body leading-loose text-million-primary ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("constraintsContent")}
            </p>
          </div>
        </div>
        {/* design section */}
        <div className="flex flex-col items-center gap-l px-m py-l">
          <h2
            className={`text-h2 font-semibold leading-tight text-center ${
              isDarkTheme ? "text-tertiary" : "text-secondary"
            }`}
          >
            {t("designTitle")}
          </h2>
          <Logos logos={designLogos} />
          <h3
            className={`text-h3 font-semibold leading-tight text-center ${
              isDarkTheme ? "text-tertiary" : "text-secondary"
            }`}
          >
            {t("sketchingTitle")}
          </h3>
          <p
            className={`text-body leading-loose text-million-primary ${
              isDarkTheme ? "text-tertiary" : "text-secondary"
            }`}
          >
            {t("targetContent")}
          </p>
          <Carousel slides={SKETCH_SLIDES} options={OPTIONS} />
          <div className="flex flex-col gap-l w-full my-l md:flex-row">
            <div className="flex flex-col gap-l md:w-1/2">
              <h3
                className={`text-h3 font-semibold leading-tight text-center ${
                  isDarkTheme ? "text-tertiary" : "text-secondary"
                }`}
              >
                {t("digitalTitle")}
              </h3>
              <p
                className={`text-body leading-loose text-million-primary ${
                  isDarkTheme ? "text-tertiary" : "text-secondary"
                }`}
              >
                {t("digitalContent")}
              </p>
            </div>
            <div className="flex flex-col gap-l md:w-1/2">
              <h3
                className={`text-h3 font-semibold leading-tight text-center ${
                  isDarkTheme ? "text-tertiary" : "text-secondary"
                }`}
              >
                {t("mariaTitle")}
              </h3>
              <p
                className={`text-body leading-loose text-million-primary ${
                  isDarkTheme ? "text-tertiary" : "text-secondary"
                }`}
              >
                {t("mariaContent")}
              </p>
            </div>
          </div>
          <Carousel slides={MARIA_SLIDES} options={OPTIONS} />
        </div>
        {/* challenges section */}
        <div className="flex flex-col items-center gap-l px-m py-l">
          <h2
            className={`text-h2 font-semibold leading-tight text-center ${
              isDarkTheme ? "text-tertiary" : "text-secondary"
            }`}
          >
            {t("challengeTitle")}
          </h2>
          <div className="flex flex-col gap-l w-full my-l md:flex-row">
            <div className="flex flex-col gap-l md:w-1/2">
              <h3
                className={`text-h3 font-semibold leading-tight text-center ${
                  isDarkTheme ? "text-tertiary" : "text-secondary"
                }`}
              >
                {t("maintainingTitle")}
              </h3>
              <p
                className={`text-body leading-loose text-million-primary ${
                  isDarkTheme ? "text-tertiary" : "text-secondary"
                }`}
              >
                {t("maintainingContent")}
              </p>
            </div>
            <div className="flex flex-col gap-l md:w-1/2">
              <h3
                className={`text-h3 font-semibold leading-tight text-center ${
                  isDarkTheme ? "text-tertiary" : "text-secondary"
                }`}
              >
                {t("expandingTitle")}
              </h3>
              <p
                className={`text-body leading-loose text-million-primary ${
                  isDarkTheme ? "text-tertiary" : "text-secondary"
                }`}
              >
                {t("expandingContent")}
              </p>
            </div>
          </div>
          <Carousel slides={SOCIAL_SLIDES} options={OPTIONS} />
        </div>
        {/* outcome section */}
        <div className={"flex flex-col gap-l -mb-[8.5rem]"}>
          <div className="flex flex-col gap-l px-m py-l">
            <h2
              className={`text-h2 font-semibold leading-tight text-center md:text-left  ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("outcomeTitle")}
            </h2>
            <p
              className={`text-body leading-loose text-million-primary ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("outcomeContent")}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            className="w-full"
          >
            <CldImage
              width="1231"
              height="1189"
              src={`${servicesUrls.cloudinary}monte-frio/monte-frio-outcome`}
              className={"h-max object-contain max-w-none w-full"}
              alt={"monte frío outcome"}
            />
          </motion.div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default MonteFrio;
