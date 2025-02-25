"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { Link } from "@/i18n/routing";
import Button from "@/presentation/components/Button/Button";
import ThemeSwitch from "@/presentation/components/ThemeSwitch/ThemeSwitch";
import { useTheme } from "@/context/ThemeContext";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";
import MuneIcon from "@/presentation/components/MuneIcon/MuneIcon";
import ThemeTransition from "@/presentation/components/ThemeTransition/ThemeTransition";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { useLocale } from "next-intl";
import MenuItem from "./MenuItem";

const darkLogo = `${servicesUrls.cloudynary}common/mune-logo-white.svg`;
const lightLogo = `${servicesUrls.cloudynary}common/mune-logo-black.svg`;

/**
 * Header component that displays the header section of the website.
 * Provides navigation, theme switching, and language selection functionality.
 */
const Header = () => {
  /**
   * State to control mobile menu visibility
   */
  const [openMenu, setOpenMenu] = React.useState(false);

  /**
   * Get current theme from context
   */
  const { theme } = useTheme();

  /**
   * State to manage vertical offset when scrolling near footer
   */
  const [bottomOffset, setBottomOffset] = useState(0);

  /**
   * Reference to header element for scroll calculations
   */
  const headerRef = useRef<HTMLDivElement>(null);

  /**
   * Get current route path
   */
  const pathname = usePathname();

  /**
   * Get current locale for i18n
   */
  const locale = useLocale();

  /**
   * Menu items configuration
   * @type {readonly {path: string, text: string}[]}
   */
  const menuItems: readonly { path: string; text: string }[] = [
    { path: "/", text: "home" },
    { path: "/about", text: "about" },
    { path: "/projects", text: "projects" },
    { path: "/toolbox", text: "toolbox" },
    { path: "/contact", text: "contact" },
  ] as const;

  /**
   * Effect to handle scroll events and update the bottom offset of the header.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const footer = document.querySelector("footer");
        const footerTop = footer?.getBoundingClientRect().top || 0;
        const windowHeight = window.innerHeight;
        const bottomOffset = (windowHeight - footerTop) / 2;
        if (footerTop <= windowHeight) {
          setBottomOffset(bottomOffset);
        } else {
          setBottomOffset(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className="absolute w-full flex justify-between lg:justify-start">
        <div className="flex justify-between w-full lg:w-auto">
          <h1 className="m-m lg:m-l relative z-[21] left-0">
            <Link href={"/"} className="flex justify-center">
              <ThemeTransition wait className="relative w-xl top-0 lg:w-[80px]">
                <CldImage
                  width="194"
                  height="35"
                  src={theme === "dark" ? darkLogo : lightLogo}
                  alt="Fredy Munevar Logo"
                  format="svg"
                />
              </ThemeTransition>
            </Link>
          </h1>
          <div className="absolute right-0 top-0 z-30 flex justify-center gap-m pr-m lg:gap-l lg:pr-l">
            <ThemeSwitch />
            <LanguageSwitch locale={locale} />
          </div>
        </div>
        <div
          ref={headerRef}
          className={`relative lg:flex lg:flex-row lg:gap-m xl:px-[2.5rem] xl:z-20 xl:h-screen xl:flex-col xl:gap-xl
            xl:justify-center xl:align-middle xl:fixed xl:transition-all xl:duration-1000 xl:ease-in-out`}
          style={{ bottom: bottomOffset }}
        >
          <nav
            className={`bg-primary fixed w-screen h-screen z-30 top-0 flex flex-col justify-end items-start gap-xl px-l py-xl transition-[right] duration-1000 ease-in-out
            md:w-2/5 xl:bg-transparent xl:static xl:w-auto xl:h-auto xl:p-0 xl:align-middle xl:self-center xl:justify-self-start
            xl:[&_span]:opacity-0 xl:[&_span]:hover:opacity-100
            ${openMenu ? "right-0" : "-right-full"}`}
          >
            <ThemeTransition wait>
              <ul className="flex flex-col gap-l lg:gap-[2.5rem] xl:flex-col">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    path={item.path}
                    text={item.text}
                    pathname={pathname}
                    onClick={() => setOpenMenu(false)}
                  />
                ))}
              </ul>
            </ThemeTransition>
            <ul className="flex flex-row gap-m lg:hidden">
              <li>
                <Link href={servicesUrls.linkedin} target="_blank">
                  <MuneIcon name={"icon-linkedin-thin"} size={28} />
                </Link>
              </li>
              <li>
                <Link href={servicesUrls.instagram} target="_blank">
                  <MuneIcon name={"icon-instagram-thin"} size={28} />
                </Link>
              </li>
              <li>
                <Link href={servicesUrls.github} target="_blank">
                  <MuneIcon name={"icon-github-thin"} size={28} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Button
        className={`fixed bottom-m end-m z-30 transition-all duration-300 ease-in-out xl:hidden ${
          openMenu ? "bg-secondary" : "bg-primary"
        }`}
        buttonType={openMenu ? "secondary" : "primary"}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <MuneIcon name={openMenu ? "icon-less" : "icon-add"} color={openMenu ? "var(--primary)" : "var(--secondary)"} />
      </Button>
    </>
  );
};

export default Header;
