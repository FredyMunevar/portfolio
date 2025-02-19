import { Link } from "@/i18n/routing";
import MuneIcon from "../MuneIcon/MuneIcon";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";

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
  const buttonStyles = `font-light lg:text-secondary flex gap-m lg:relative lg:flex-col lg:items-center lg:gap-xs xl:gap-s
  lg:[&_span]:after:left-[50%] lg:[&_span]:hover:after:w-full ${isDarkTheme && "lg:text-tertiary"}`;

  /**
   * Styles for the button span element with underline animation
   */
  const buttonSpanStyles = `text-menu lg:text-desc lg:after:w-0 lg:after:h-[1px] lg:after:bg-secondary lg:transition-all lg:duration-500 lg:ease-in-out
  lg:after:transition-all lg:after:duration-500 lg:after:ease-in-out lg:after:absolute lg:after:-bottom-s ${
    isDarkTheme && "lg:after:bg-tertiary"
  }`;

  /**
   * Styles applied when menu item is active
   */
  const activeStyles = "lg:after:w-full lg:after:!left-0 font-semibold";

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
      <Link className={`${buttonStyles}`} href={path} onClick={onClick}>
        <MuneIcon
          color={`${isDarkTheme ? "var(--tertiary)" : "var(--secondary)"}`}
          name={`${addActive() !== undefined ? `icon-${text}-filled` : `icon-${text}`}`}
          size={24}
        />
        <span className={`${buttonSpanStyles} ${addActive()}`}>{t(text)}</span>
      </Link>
    </li>
  );
};
export default MenuItem;
