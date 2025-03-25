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

const designLogos: LogosType[] = ["figma", "illustrator", "photoshop"];
const devLogos: LogosType[] = [
  "typescript",
  "react",
  "git",
  "webpack",
  "eslint",
  "prettier",
  "css",
  "html",
  "sass",
  "next",
];
const OPTIONS: EmblaOptionsType = { align: "start" };
const SLIDES = [
  {
    id: 1,
    src: `${servicesUrls.cloudinary}million/million-website`,
    logo: `${servicesUrls.cloudinary}million/million-white.svg`,
    link: "https://www.millionluxury.com/?ui-culture=en",
  },
  {
    id: 2,
    src: `${servicesUrls.cloudinary}million/million-rivage`,
    logo: `${servicesUrls.cloudinary}million/rivage.svg`,
    link: "https://www.rivageinbalharbour.com/",
  },
  {
    id: 3,
    src: `${servicesUrls.cloudinary}million/million-57ocean`,
    logo: `${servicesUrls.cloudinary}million/57ocean.svg`,
    link: "https://www.57oceancondomiami.com/",
  },
];
const Million = () => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("million");

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
          <div className="relative h-fit md:flex md:justify-end md:-mt-xxl portrait:md:justify-center portrait:lg:justify-end">
            <motion.div
              initial={{ opacity: 0, transform: "translateY(20px)" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              className="w-fit absolute top-0 -z-1 md:z-1 portrait:md:-z-1 portrait:md:top-xxl lg:top-0 portrait:lg:z-1 portrait:lg:top-0"
            >
              <CldImage
                width="430"
                height="759"
                src={`${servicesUrls.cloudinary}million/million-poster`}
                className={
                  "object-contain h-auto w-[534px] md:w-[400px] portrait:md:w-[600px] lg:w-[430px] portrait:lg:!w-[500px] xl:w-[540px]"
                }
                alt={"million poster"}
              />
            </motion.div>
            <div className="bg-million-primary px-m py-l mt-[24rem] mb-xl md:mt-xxl md:mb-l portrait:md:mt-[16rem] portrait:md:mb-[36rem] portrait:lg:mt-xxl portrait:lg:mb-l xl:p-l">
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
                className={`text-body leading-loose text-center px-m md:text-left md:w-4/7 md:last:w-full portrait:md:w-full portrait:md:text-center portrait:lg:text-left portrait:lg:w-1/2 xl:w-7/12 xl:last:w-7/12 xl:!pl-l ${
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
          className={`bg-cover relative p-m bg-no-repeat flex justify-start md:mt-xl xl:p-l xl:mt-xxl bg-[url('https://res.cloudinary.com/disbunv6l/image/upload/v1741568494/million/million-website')]`}
        >
          <div className="w-full flex flex-col gap-l px-m py-l bg-million-secondary rounded-lg md:p-l lg:max-w-7/12">
            <div className="flex flex-col gap-l">
              <h2 className={"text-h2 font-semibold leading-none text-center text-million-primary"}>
                {t("purposeTitle")}
              </h2>
              {t.rich("purposeContent", {
                part: (chunks) => <p className={"text-body leading-loose text-million-primary"}>{chunks}</p>,
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
              <ol className="list-decimal pl-l">
                {t.rich("purposeList", {
                  li: (chunks) => <li className={"text-body leading-loose text-million-primary"}>{chunks}</li>,
                })}
              </ol>
            </div>
            <div className="flex flex-col gap-l">
              <h2 className={"text-h2 font-semibold leading-none text-center text-million-primary"}>
                {t("targetTitle")}
              </h2>
              <p className={"text-body leading-loose text-million-primary"}>{t("targetContent")}</p>
            </div>
          </div>
        </div>
        {/* design section */}
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
            video={"million/app-flow"}
          />
        </div>
        {/* design System */}
        <div className="flex flex-col gap-l px-m lg:px-l">
          <h2
            className={`text-h2 font-semibold leading-tight text-center md:text-left portrait:md:text-center ${
              isDarkTheme ? "text-tertiary" : "text-secondary"
            }`}
          >
            {t("desSystem")}
          </h2>
          <div className="w-full h-[20rem] overflow-hidden mb-xl md:h-[40rem] xl:h-[46rem]">
            <iframe
              width="800"
              height="450"
              src={`https://embed.figma.com/proto/pWXd3N2vpWndUoQfB4M5U5/Design-system?page-id=0%3A1&node-id=2-20461&p=f&theme=${
                isDarkTheme ? "dark" : "light"
              }&viewport=-13887%2C-521%2C0.56&scaling=scale-down&content-scaling=fixed&embed-host=share`}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* design carousel */}
        <div className="flex flex-col gap-l px-m lg:px-l">
          <h2
            className={`text-h2 font-semibold leading-tight text-center md:text-left portrait:md:text-center ${
              isDarkTheme ? "text-tertiary" : "text-secondary"
            }`}
          >
            {t("websites")}
          </h2>
          <Carousel slides={SLIDES} options={OPTIONS} />
        </div>
        {/* development section */}
        <div className="flex flex-col gap-l w-full px-m pb-xl mt-xl lg:px-l xl:flex-row">
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
              snippets={millionSnippets}
              project="million"
              style={"portrait:h-[600px] h-[320px] portrait:md:h-[800px] xl:h-[670px]"}
            />
          </div>
        </div>
        {/* challenges section */}
        <div className="flex flex-col gap-l w-full px-m lg:px-l">
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
          <Video style={"w-full"} video={"million/crm-flow"} />
        </div>
        {/* outcome section */}
        <div
          className={`relative px-m max-w-screen pb-[10rem] mb-xl md:mb-s md:pb-[5rem] lg:px-l portrait:lg:pb-[11rem] lg:pb-xxl lg:mb-m landscape:2xl:pb-[12rem]`}
        >
          <div className="flex flex-col gap-l md:w-8/12 portrait:md:w-7/12 portrait:lg:w-7/12 xl:w-8/12">
            <h2
              className={`text-h2 font-semibold leading-tight text-center md:text-left  ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("outcomeTitle")}
            </h2>
            {t.rich("outcomeContent", {
              part: (chunks) => (
                <p className={`text-body leading-loose ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </div>
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            className="flex justify-center w-full absolute md:justify-end md:top-[38%] portrait:md:top-[53%] portrait:lg:top-[33%] lg:top-[20%] xl:top-[17%]"
          >
            <CldImage
              width="968"
              height="610"
              src={`${servicesUrls.cloudinary}million/million-devices`}
              className={"absolute h-max object-contain max-w-none w-[640px] -left-[35%] md:static lg:w-[800px]"}
              alt={"million devices"}
            />
          </motion.div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default Million;
