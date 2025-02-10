"use client";
import React from "react";
import { CldImage } from "next-cloudinary";
import { Link } from "@/i18n/routing";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import MuneIcon from "../MuneIcon/MuneIcon";
import { useTranslations } from "next-intl";

const currentYear = new Date().getFullYear();

/**
 * Footer component that displays the footer section of the website.
 */
const Footer = () => {
  const t = useTranslations("nav");
  return (
    <footer className="px-m py-xl bg-secondary flex flex-col items-center gap-l lg:px-xl">
      <div className="w-full flex flex-col items-center gap-l md:flex-row md:justify-between md:gap-[unset]">
        <CldImage
          width="194"
          height="35"
          src={`${servicesUrls.cloudynary}common/fredy-munevar-full.svg`}
          alt="Fredy Munevar UX/UI Engineer and Designer"
          format="svg"
        />
        <nav className="w-full flex flex-col gap-l md:w-auto">
          <ul className="flex flex-row justify-between md:gap-l">
            <li>
              <Link className="font-light text-footer text-primary" href="/">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link className="font-light text-footer text-primary" href="/about">
                {t("about")}
              </Link>
            </li>
            <li>
              <Link className="font-light text-footer text-primary" href="/projects">
                {t("projects")}
              </Link>
            </li>
            <li>
              <Link className="font-light text-footer text-primary" href="/toolbox">
                {t("toolbox")}
              </Link>
            </li>
            <li>
              <Link className="font-light text-footer text-primary" href="/contact">
                {t("contact")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full flex flex-col items-center gap-l md:flex-row md:justify-between">
        <ul className="flex flex-row justify-center gap-m">
          <li>
            <Link href={servicesUrls.linkedin} target="_blank">
              <MuneIcon name={"icon-linkedin"} size={28} color="var(--primary)" />
            </Link>
          </li>
          <li>
            <Link href={servicesUrls.instagram} target="_blank">
              <MuneIcon name={"icon-intagram"} size={28} color="var(--primary)" />
            </Link>
          </li>
          <li>
            <Link href={servicesUrls.github} target="_blank">
              <MuneIcon name={"icon-github"} size={28} color="var(--primary)" />
            </Link>
          </li>
        </ul>
        <Link className="text-primary text-footer text-center" href={servicesUrls.cvDownload} target="_blank">
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
