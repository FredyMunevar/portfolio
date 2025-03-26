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
import { LogosType } from "@/presentation/components/Logos/interface/iLogos";

const designLogos: LogosType[] = ["illustrator", "xd", "photoshop"];
const devLogos: LogosType[] = ["css", "html", "wordpress"];
const Precision = () => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("precision");

  return (
    <SectionContainer paddingLess>
      <section className="flex flex-col gap-l">
        {/* intro section */}
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
            <motion.div
              initial={{ opacity: 0, transform: "translateY(20px)" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              className="w-fit absolute top-[18%] -left-[10rem] md:top-0 md:-left-xxl portrait:md:-top-xl portrait:md:-left-[16rem] portrait:lg:-left-xxl xl:-left-xl xl:-top-l"
            >
              <CldImage
                width="923"
                height="564"
                src={`${servicesUrls.cloudinary}precision/precision-poster`}
                className={"object-contain h-auto w-[350px] md:w-[700px]"}
                alt={"precision poster"}
              />
            </motion.div>
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
        {/* description section */}
        <div className={"flex flex-col px-m py-l gap-l md:flex-row"}>
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            className="w-full flex justify-center items-center md:w-3/6"
          >
            <CldImage
              width="597"
              height="852"
              src={`${servicesUrls.cloudinary}precision/precision-mobile-facebook`}
              className={"object-contain max-w-none max-h-none h-auto w-full md:h-full md:w-auto md:mt-xxl lg:h-[130%]"}
              alt={"precision facebook"}
            />
          </motion.div>
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
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          className="w-full md:my-l"
        >
          <CldImage
            width="2458"
            height="1538"
            src={`${servicesUrls.cloudinary}precision/precision-mockup`}
            className={"h-max object-contain max-w-none w-full"}
            alt={"precision mockup"}
          />
        </motion.div>
        {/* design section */}
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
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            className="w-full flex justify-center items-center md:w-3/6"
          >
            <CldImage
              width="897"
              height="1083"
              src={`${servicesUrls.cloudinary}precision/precision-mobile-instagram`}
              className={
                "object-contain max-w-none max-h-none h-auto w-full md:h-full md:max-h-[807px] md:w-auto md:mt-xxl lg:h-[130%]"
              }
              alt={"precision mockup"}
            />
          </motion.div>
        </div>
        <div className="flex flex-col gap-l p-m md:flex-row md:mt-xl">
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            className="w-full"
          >
            <CldImage
              width="571"
              height="571"
              src={`${servicesUrls.cloudinary}precision/precision-colors`}
              className={"h-max object-contain max-w-none w-full"}
              alt={"precision colors"}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            className="w-full"
          >
            <CldImage
              width="571"
              height="571"
              src={`${servicesUrls.cloudinary}precision/precision-typography`}
              className={"h-max object-contain max-w-none w-full"}
              alt={"precision typography"}
            />
          </motion.div>
        </div>
        {/* development section */}
        <div className={"flex flex-col px-m py-l gap-l md:flex-row mt-l"}>
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            className="w-full flex justify-center items-center md:w-3/6"
          >
            <CldImage
              width="897"
              height="1083"
              src={`${servicesUrls.cloudinary}precision/precision-mobile-web`}
              className={
                "object-contain max-w-none max-h-none h-auto w-full md:h-[120%] md:max-h-[807px] md:w-auto md:mt-xxl lg:h-[130%]"
              }
              alt={"precision mockup"}
            />
          </motion.div>
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
        {/* outcome section */}
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
