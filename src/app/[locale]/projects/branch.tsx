"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import SectionContainer from "@/presentation/components/SectionContainer/SectionContainer";
import { useTranslations } from "next-intl";
import ProjectInfo from "@/presentation/components/ProjectInfo/ProjectInfo";
import CharactersMobile from "@/presentation/components/Branch/CharactersMobile";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import CharactersDesktop from "@/presentation/components/Branch/CharactersDesktop";

/**
 * Toolbox section component that displays technical skills and tools.
 * Features an accordion layout with categorized tools and an illustration.
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
        <ProjectInfo
          isDarkTheme={isDarkTheme}
          roleTitle={t("roleTitle")}
          roleContent={t("roleContent")}
          typeTitle={t("typeTitle")}
          typeContent={t("typeContent")}
        />
        <div className="relative overflow-hidden pb-l px-m">
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
        <div className="flex flex-col gap-l py-l px-m">
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
              src={`${servicesUrls.cloudynary}branch/canvas`}
              alt={"canvas"}
              className="w-full order-2"
            />
            <CldImage
              width="605"
              height="391"
              src={`${servicesUrls.cloudynary}branch/logo-board`}
              alt={"branch logo board"}
              className="w-full order-4 lg:order-3"
            />
          </div>
        </div>
        <div className="mb-l">
          <CldImage
            width="1199"
            height="799"
            src={`${servicesUrls.cloudynary}branch/branch-brochure`}
            alt={"branch brochure"}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-l">
          <div className="flex flex-col gap-l">
            <h2
              className={`text-h2 font-semibold leading-tight text-center text-branchSecondary ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("designTitle")}
            </h2>
            {t.rich("designContent", {
              part: (chunks) => (
                <p
                  className={`text-body leading-loose text-center xl:text-left ${
                    isDarkTheme ? "text-tertiary" : "text-secondary"
                  }`}
                >
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
            <div>logos</div>
          </div>
          <div className="relative w-full h-[500px]">
            {/* <CldVideoPlayer
              id="branch-uses"
              className="w-full h-auto"
              width="640"
              height="1080"
              src={`${servicesUrls.cloudynary}branch/branch-uses-dark`}
              autoPlay
              loop
              transformation={{
                width: 640,
                height: 1080,
                crop: "fill",
                gravity: "auto",
              }}
            /> */}
            {/* <iframe
              src={`${servicesUrls.cloudynaryVideo}branch/branch-uses-dark`}
              width="100%"
              height="60%"
              style={{ border: "0" }}
              allowFullScreen
            ></iframe> */}
            <video
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              controls
              autoPlay
              loop
            >
              <source src={`${servicesUrls.cloudynaryVideo}branch/branch-uses-dark`} type="video/mp4" />
              <source src={`${servicesUrls.cloudynaryVideo}branch/branch-uses-dark`} type="video/webm" />
              <source src={`${servicesUrls.cloudynaryVideo}branch/branch-uses-dark`} type="video/ogv" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        {/* <div className="w-full h-[900px] overflow-hidden">
          <iframe
            src="https://marvelapp.com/j178ga9?emb=1&iosapp=false&frameless=false\"
            width="452"
            height="881"
            className="w-full h-full"
          ></iframe>
        </div> */}
        {/* <div className="flex flex-col gap-l">
          <div className="flex flex-col gap-l">
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
                  className={`text-body leading-loose text-center xl:text-left ${
                    isDarkTheme ? "text-tertiary" : "text-secondary"
                  }`}
                >
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
            <div>logos</div>
          </div>
        </div> */}
        {/* <div className="flex flex-col gap-l">
          <div className="flex flex-col gap-l">
            <h2
              className={`text-h2 font-semibold leading-tight text-center text-branchSecondary ${
                isDarkTheme ? "text-tertiary" : "text-secondary"
              }`}
            >
              {t("outcomeTitle")}
            </h2>
            {t.rich("outcomeContent", {
              part: (chunks) => (
                <p
                  className={`text-body leading-loose text-center xl:text-left ${
                    isDarkTheme ? "text-tertiary" : "text-secondary"
                  }`}
                >
                  {chunks}
                </p>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </div>
          <div>imagen</div>
        </div> */}
      </section>
    </SectionContainer>
  );
};

export default Branch;
