"use client";
import React from "react";
import { CldImage } from "next-cloudinary";
import { Link } from "@/i18n/routing";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import MuneIcon from "../MuneIcon/MuneIcon";
import { useLocale, useTranslations } from "next-intl";
import { trackEvent } from "@/infrastructure/analytics/track";

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
          loading="lazy"
        />
        <nav className="w-full flex flex-col gap-l md:w-auto">
          <ul className="flex flex-row justify-center gap-l flex-wrap items-center">
            <li>
              <Link
                className="font-light text-footer text-primary"
                href="/"
                onClick={() => trackEvent({ name: "navigation_click", params: { section: "home", location: "footer" } })}
              >
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                className="font-light text-footer text-primary"
                href="/about"
                onClick={() => trackEvent({ name: "navigation_click", params: { section: "about", location: "footer" } })}
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                className="font-light text-footer text-primary"
                href="/projects"
                onClick={() => trackEvent({ name: "navigation_click", params: { section: "projects", location: "footer" } })}
              >
                {t("projects")}
              </Link>
            </li>
            <li>
              <Link
                className="font-light text-footer text-primary"
                href="/toolbox"
                onClick={() => trackEvent({ name: "navigation_click", params: { section: "toolbox", location: "footer" } })}
              >
                {t("toolbox")}
              </Link>
            </li>
            <li>
              <Link
                className="font-light text-footer text-primary"
                href="/contact"
                onClick={() => trackEvent({ name: "navigation_click", params: { section: "contact", location: "footer" } })}
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
              onClick={() => trackEvent({ name: "contact_click", params: { method: "linkedin", location: "footer" } })}
            >
              <MuneIcon name={"icon-linkedin-thin"} size={28} color="var(--primary)" />
            </Link>
          </li>
          <li>
            <Link
              href={servicesUrls.instagram}
              target="_blank"
              onClick={() => trackEvent({ name: "contact_click", params: { method: "instagram", location: "footer" } })}
            >
              <MuneIcon name={"icon-instagram-thin"} size={28} color="var(--primary)" />
            </Link>
          </li>
          <li>
            <Link
              href={servicesUrls.github}
              target="_blank"
              onClick={() => trackEvent({ name: "contact_click", params: { method: "github", location: "footer" } })}
            >
              <MuneIcon name={"icon-github-thin"} size={28} color="var(--primary)" />
            </Link>
          </li>
        </ul>
        <Link
          className="text-primary text-footer text-center"
          href={cvDownloadUrl}
          target="_blank"
          onClick={() => trackEvent({ name: "cv_download", params: { language: locale, location: "footer" } })}
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
