"use client";
import React from "react";
import { CldImage } from "next-cloudinary";
import { Link } from "@/i18n/routing";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import MuneIcon from "../MuneIcon/MuneIcon";
import { useLocale, useTranslations } from "next-intl";
import { sendGAEvent } from "@next/third-parties/google";

const currentYear = new Date().getFullYear();

/**
 * Footer component that displays the footer section of the website.
 */
const Footer = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const cvDownloadUrl = locale === "es" ? servicesUrls.cvDownloadES : servicesUrls.cvDownloadEN;

  return (
    <footer className="px-m py-xl bg-secondary flex flex-col items-center gap-l lg:px-xl">
      <div className="w-full flex flex-col items-center gap-l md:flex-row md:justify-between md:gap-[unset]">
        <CldImage
          width="194"
          height="35"
          src={`${servicesUrls.cloudinary}common/fredy-munevar-full.svg`}
          alt="Fredy Munevar UX/UI Engineer and Designer"
          format="svg"
        />
        <nav className="w-full flex flex-col gap-l md:w-auto">
          <ul className="flex flex-row justify-center gap-l flex-wrap items-center">
            <li>
              <Link
                className="font-light text-footer text-primary"
                href="/"
                onClick={() => sendGAEvent("event", "linkClicked", { value: "footer menu home" })}
              >
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                className="font-light text-footer text-primary"
                href="/about"
                onClick={() => sendGAEvent("event", "linkClicked", { value: "footer menu about" })}
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                className="font-light text-footer text-primary"
                href="/projects"
                onClick={() => sendGAEvent("event", "linkClicked", { value: "footer menu projects" })}
              >
                {t("projects")}
              </Link>
            </li>
            <li>
              <Link
                className="font-light text-footer text-primary"
                href="/toolbox"
                onClick={() => sendGAEvent("event", "linkClicked", { value: "footer menu toolbox" })}
              >
                {t("toolbox")}
              </Link>
            </li>
            <li>
              <Link
                className="font-light text-footer text-primary"
                href="/contact"
                onClick={() => sendGAEvent("event", "linkClicked", { value: "footer menu contact" })}
              >
                {t("contact")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full flex flex-col items-center gap-l md:flex-row md:justify-between">
        <ul className="flex flex-row justify-center gap-m">
          <li>
            <Link
              href={servicesUrls.linkedin}
              target="_blank"
              onClick={() => sendGAEvent("event", "linkClicked", { value: "footer menu linkedin" })}
            >
              <MuneIcon name={"icon-linkedin-thin"} size={28} color="var(--primary)" />
            </Link>
          </li>
          <li>
            <Link
              href={servicesUrls.instagram}
              target="_blank"
              onClick={() => sendGAEvent("event", "linkClicked", { value: "footer menu instagram" })}
            >
              <MuneIcon name={"icon-instagram-thin"} size={28} color="var(--primary)" />
            </Link>
          </li>
          <li>
            <Link
              href={servicesUrls.github}
              target="_blank"
              onClick={() => sendGAEvent("event", "linkClicked", { value: "footer menu github" })}
            >
              <MuneIcon name={"icon-github-thin"} size={28} color="var(--primary)" />
            </Link>
          </li>
        </ul>
        <Link
          className="text-primary text-footer text-center"
          href={cvDownloadUrl}
          target="_blank"
          onClick={() => sendGAEvent("event", "linkClicked", { value: "footer download cv" })}
        >
          {t("download")}
        </Link>
        <p className="text-primary text-footer text-center">
          © {currentYear} Fredy Munevar. {t("rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
