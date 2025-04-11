import React from "react";
import styles from "./ThemeSwitch.module.css";
import MuneIcon from "../MuneIcon/MuneIcon";
import { useTheme } from "@/context/ThemeContext";

/**
 * ThemeSwitch component that allows users to toggle between light and dark themes.
 */
const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button onClick={toggleTheme}>
      <div className="border-2 border-tertiary bg-secondary relative p-xxs">
        <div className="flex justify-between items-center gap-s relative z-10">
          <div className={`${styles.switchSize}`}>
            <MuneIcon color={`${!isDark ? "var(--gray)" : "var(--primary)"}`} name={"icon-light"} size={14} />
          </div>
          <div className={`${styles.switchSize}`}>
            <MuneIcon color={`${isDark ? "var(--gray)" : "var(--primary)"}`} name={"icon-dark"} size={12} />
          </div>
        </div>
        <div
          className={`transition-all bg-tertiary absolute z-0 top-xxs ${styles.switchSize} ${
            isDark ? styles.leftLight : styles.leftDark
          }`}
        ></div>
      </div>
    </button>
  );
};

export default ThemeSwitch;
