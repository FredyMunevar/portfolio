"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import "@/presentation/styles/globals.css";
import SectionContainer from "@/presentation/components/SectionContainer/SectionContainer";
import { useTranslations } from "next-intl";
import { CldImage } from "next-cloudinary";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import Experience from "@/presentation/components/Experience/Experience";
import { motion } from "motion/react";

/**
 * About section component that displays personal information and work experience.
 * Features a responsive layout with animated content and scrollable experience timeline.
 */
const About = () => {
  /** Current theme state from context */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** Translation function for localized content */
  const t = useTranslations("about");

  /** State to store the calculated height for the experience section */
  const [height, setHeight] = useState(0);

  /** Array of experience translation keys */
  const experiences = [
    "experiences.million",
    "experiences.branch",
    "experiences.netbangers",
    "experiences.zeta",
    "experiences.navarra",
  ] as const;

  /** Reference to main content container for height calculations */
  const heightRef = useRef<HTMLDivElement>(null);

  /** Reference to scrollable experience container for animation triggers */
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /**
   * Effect to calculate and update the height of the experience section
   * based on the main content height
   */
  useEffect(() => {
    setHeight((heightRef?.current?.clientHeight ?? 0) + 90);
  }, [setHeight]);

  return (
    <SectionContainer>
      <div className="flex flex-col gap-l xl:flex-row xl:gap-xl xl:justify-between xl:overflow-hidden" ref={heightRef}>
        <section className="flex flex-col gap-l lg:gap-xl xl:h-max">
          <div className="flex flex-col items-center gap-l md:flex-row-reverse md:justify-center md:items-center 2xl:justify-end">
            <h2 className="text-h1 font-semibold leading-none text-primary text-center md:text-left md:w-min md:min-w-[20rem] lg:w-auto">
              {t("title")}
            </h2>
            <CldImage
              width="512"
              height="511"
              src={`${servicesUrls.cloudinary}common/profile-picture`}
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
        </section>
        <aside
          className={`flex flex-col gap-m text-body text-center leading-loose xl:h-auto xl:px-l xl:overflow-y-auto ${
            isDarkTheme ? "text-tertiary scrollbar-dark" : "text-secondary scrollbar-light"
          } `}
          style={{ maxHeight: window.innerWidth >= 1280 ? `${height}px` : "none" }}
          ref={scrollRef}
        >
          <div>
            {experiences.map((experience) => (
              <motion.div
                initial={{ opacity: 0, transform: "translateY(20px)" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileInView={{ opacity: 1, transform: "translateY(0)" }}
                viewport={{ root: scrollRef }}
                key={experience}
              >
                <Experience
                  role={t(`${experience}.role`)}
                  title={t(`${experience}.title`)}
                  date={t(`${experience}.date`)}
                  description={t(`${experience}.description`)}
                />
              </motion.div>
            ))}
          </div>

          <p className="xl:text-left">{t("closure")}</p>
        </aside>
      </div>
    </SectionContainer>
  );
};

export default About;
