import React, { useEffect, useRef, useState } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import Button from "@/components/Button/Button";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";
import { useTheme } from "@/context/ThemeContext";
import { servicesUrls } from "@/constants/servicesUrls";
import Icon from "@/components/Icon/Icon";
import ThemeTransition from "@/components/ThemeTransition/ThemeTransition";

const darkLogo = `${servicesUrls.cloudynary}common/mune-logo-white.svg`;
const lightLogo = `${servicesUrls.cloudynary}common/mune-logo-black.svg`;

/**
 * Header component that displays the header section of the website.
 */
const Header = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const { theme } = useTheme();
  const [bottomOffset, setBottomOffset] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

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
      <header className="absolute w-full flex justify-between items-start ">
        <div
          ref={headerRef}
          className={`relative lg:flex lg:flex-row lg:gap-m xl:w-[208px] xl:z-20 xl:h-screen xl:flex-col xl:gap-xxl xl:justify-center xl:align-middle xl:fixed xl:transition-all xl:duration-1000 xl:ease-in-out`}
          style={{ bottom: bottomOffset }}
        >
          <h1 className="m-m lg:m-l xl:m-0">
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
          <nav
            className={`bg-primary fixed w-screen h-screen z-20 top-0 flex flex-col justify-end items-start gap-l px-l py-xl transition-[right] duration-1000 ease-in-out
            md:w-2/5
            lg:bg-transparent lg:static lg:w-auto lg:h-auto lg:p-0 lg:align-middle lg:self-center lg:justify-self-start
            ${openMenu ? "right-0" : "-right-full"}`}
          >
            <ul className="flex flex-col gap-l lg:flex-row xl:flex-col">
              <li className="xl:text-center">
                <Link
                  className={`font-light text-menu lg:text-secondary ${theme == "dark" && "xl:text-primary"}`}
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="xl:text-center">
                <Link
                  className={`font-light text-menu lg:text-secondary ${theme == "dark" && "xl:text-primary"}`}
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li className="xl:text-center">
                <Link
                  className={`font-light text-menu lg:text-secondary ${theme == "dark" && "xl:text-primary"}`}
                  href="/projects"
                >
                  Projects
                </Link>
              </li>
              <li className="xl:text-center">
                <Link
                  className={`font-light text-menu lg:text-secondary ${theme == "dark" && "xl:text-primary"}`}
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <ul className="flex flex-row gap-m lg:hidden">
              <li>
                <Link href={servicesUrls.linkedin} target="_blank">
                  <Icon name={"icon-linkedin"} size={28} />
                </Link>
              </li>
              <li>
                <Link href={servicesUrls.instagram} target="_blank">
                  <Icon name={"icon-intagram"} size={28} />
                </Link>
              </li>
              <li>
                <Link href={servicesUrls.github} target="_blank">
                  <Icon name={"icon-github"} size={28} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="absolute right-0 top-0 z-30 flex justify-center gap-m pr-m lg:gap-l lg:pr-l">
          <ThemeSwitch />
          <Button onClick={() => console.log("en")}>
            <span className="font-extralight">En</span>
          </Button>
        </div>
      </header>
      <Button
        className={`fixed bottom-m end-m z-30 transition-all duration-300 ease-in-out lg:hidden ${
          openMenu ? "bg-secondary" : "bg-primary"
        }`}
        buttonType={openMenu ? "secondary" : "primary"}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <Icon name={openMenu ? "icon-less" : "icon-add"} color={openMenu ? "var(--primary)" : "var(--secondary)"} />
      </Button>
    </>
  );
};

export default Header;
