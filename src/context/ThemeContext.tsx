"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * ThemeProvider component that provides theme context to its children.
 *
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The content to be wrapped by the ThemeProvider.
 *
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  /**
   * State to manage the current theme.
   */
  const [theme, setTheme] = useState("dark");

  /**
   * Effect to load the saved theme from localStorage or set it based on the user's system preference.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  /**
   * Effect to save the current theme to localStorage and update the document's class.
   */
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  /**
   * Function to toggle the theme between light and dark.
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

/**
 * Custom hook to use the theme context.
 *
 * @returns {ThemeContextProps} The theme context value.
 */
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
