import React from "react";
import styles from "./Button.module.css";
import { IButton } from "./interface/iButton";
import { Link } from "@/i18n/routing";
import { useTheme } from "@/context/ThemeContext";
import { trackEvent } from "@/infrastructure/analytics/track";

/**
 * Button component that renders either a link or a button element based on the presence of the `link` prop.
 *
 * @param {Object} props - The properties object.
 * @param {function} props.onClick - The click handler function for the button.
 * @param {string} [props.link] - The URL to navigate to if the button is rendered as a link.
 * @param {string} [props.buttonType="primary"] - The type of the button, either "primary" or "secondary".
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {boolean} [props.largeButton] - Flag to determine if the button should be rendered in a larger size.
 * @param {Object} [props.props] - Additional properties to be passed to the button or link element.
 * @param {AnalyticsEvent} [props.analyticsEvent] - Analytics event sent when the button or link is clicked.
 */
const Button = ({
  onClick,
  link,
  buttonType = "primary",
  children,
  className,
  largeButton,
  target,
  analyticsEvent,
}: IButton) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const isPrimary = buttonType === "primary";
  const isSecondary = buttonType === "secondary";

  const defaultStyles = "xl:duration-300 xl:ease-in-out font-p";
  const primaryStyles = `bg-primary border border-primary xl:hover:bg-tertiary xl:hover:text-primary ${
    isDarkTheme ? "text-secondary" : "text-tertiary"
  }`;
  const secondaryStyles = `border border-primary text-primary ${
    isDarkTheme
      ? "xl:hover:border-tertiary xl:hover:text-tertiary"
      : "xl:hover:border-secondary xl:hover:text-secondary"
  }`;

  return link !== undefined ? (
    <Link
      className={`${largeButton ? styles.buttonLarge : styles.button} ${isPrimary && primaryStyles} ${
        isSecondary && secondaryStyles
      } ${defaultStyles} ${className}`}
      href={link}
      onClick={() => analyticsEvent && trackEvent(analyticsEvent)}
      target={target}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`${largeButton ? styles.buttonLarge : styles.button} ${isPrimary && primaryStyles} ${
        isSecondary && secondaryStyles
      } ${defaultStyles} ${className}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
        if (analyticsEvent) {
          trackEvent(analyticsEvent);
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;
