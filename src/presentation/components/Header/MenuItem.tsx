import { Link } from "@/i18n/routing";
import MuneIcon from "../MuneIcon/MuneIcon";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * MenuItem component that renders a navigation menu item with icon and text.
 * Supports theme-based styling and active state indication.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.path - The navigation path for the menu item
 * @param {string} props.text - The text key for translation and icon name
 * @param {string} props.pathname - Current pathname for active state comparison
 * @param {() => void} props.onClick - Click handler function
 */
const MenuItem = ({
  path,
  text,
  pathname,
  onClick,
}: {
  path: string;
  text: string;
  pathname: string;
  onClick: () => void;
}) => {
  /**
   * Get current theme from context
   */
  const { theme } = useTheme();

  /**
   * Get translations for navigation items
   */
  const t = useTranslations("nav");

  /**
   * Flag to check if dark theme is active
   */
  const isDarkTheme = theme === "dark";

  /**
   * Base styles for the button element
   */
  const buttonStyles = `font-light lg:text-secondary flex gap-m xl:relative xl:flex-col xl:items-center xl:gap-s
  lg:[&_span]:after:left-[50%] lg:hover:[&_span]:after:w-full ${isDarkTheme && "xl:text-tertiary"}`;

  /**
   * Styles for the button span element with underline animation
   */
  const buttonSpanStyles = `text-menu xl:text-desc lg:after:w-0 xl:after:h-[1px] xl:after:bg-secondary xl:transition-all xl:duration-500 xl:ease-in-out
  xl:after:transition-all xl:after:duration-500 xl:after:ease-in-out xl:after:absolute xl:after:-bottom-s ${
    isDarkTheme && "xl:after:bg-tertiary"
  }`;

  /**
   * Styles applied when menu item is active
   */
  const activeStyles = "lg:after:w-full lg:after:left-0! font-semibold";

  /**
   * Determines if the current menu item is active based on pathname
   * @returns {string|undefined} Active styles if item is active
   */
  const addActive = (): string | undefined => {
    if (path === "/" && (pathname === "/en" || pathname === "/es")) {
      return activeStyles;
    } else if (path !== "/" && pathname.includes(path)) {
      return activeStyles;
    }
  };

  return (
    <li className="xl:text-center">
      <Link
        className={`${buttonStyles}`}
        href={path}
        onClick={() => {
          if (onClick) {
            onClick();
          }
          sendGAEvent("event", "buttonClicked", { value: `main menu ${text}` });
        }}
        //  onClick={onClick}
      >
        <MuneIcon
          className={`[&_path]:!fill-secondary ${
            isDarkTheme ? "xl:[&_path]:fill-tertiary!" : "xl:[&_path]:fill-secondary!"
          }`}
          name={`${addActive() !== undefined ? `icon-${text}-filled` : `icon-${text}`}`}
          size={24}
        />
        <span className={`${buttonSpanStyles} ${addActive()}`}>{t(text)}</span>
      </Link>
    </li>
  );
};
export default MenuItem;
