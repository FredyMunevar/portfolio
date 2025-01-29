import React from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { servicesUrls } from "@/constants/servicesUrls";
import Icon from "../Icon/Icon";

const currentYear = new Date().getFullYear();

/**
 * Footer component that displays the footer section of the website.
 */
const Footer = () => {
  return (
    <footer className="px-m py-xl bg-secondary flex flex-col items-center gap-l lg:px-xl">
      <div className="w-full flex flex-col items-center gap-l md:flex-row md:justify-between md:gap-[unset]">
        <CldImage
          width="194"
          height="35"
          src={`${servicesUrls.cloudynary}common/fredy-munevar-full.svg`}
          alt="Description of my image"
          format="svg"
        />
        <nav className="w-full flex flex-col gap-l md:w-auto">
          <ul className="flex flex-row justify-between md:gap-l">
            <li>
              <Link className="font-light text-footer text-primary" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="font-light text-footer text-primary" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="font-light text-footer text-primary" href="/projects">
                Projects
              </Link>
            </li>
            <li>
              <Link className="font-light text-footer text-primary" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full flex flex-col items-center gap-l md:flex-row md:justify-between">
        <ul className="flex flex-row justify-center gap-m">
          <li>
            <Link href={servicesUrls.linkedin} target="_blank">
              <Icon name={"icon-linkedin"} size={28} color="var(--primary)" />
            </Link>
          </li>
          <li>
            <Link href={servicesUrls.instagram} target="_blank">
              <Icon name={"icon-intagram"} size={28} color="var(--primary)" />
            </Link>
          </li>
          <li>
            <Link href={servicesUrls.github} target="_blank">
              <Icon name={"icon-github"} size={28} color="var(--primary)" />
            </Link>
          </li>
        </ul>
        <Link className="text-primary text-footer" href={""}>
          Download Resume
        </Link>
        <p className="text-primary text-footer">© {currentYear} Fredy Munevar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
