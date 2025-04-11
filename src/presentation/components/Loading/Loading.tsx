"use client";
import React from "react";
import * as animationData from "@/presentation/public//animation/loading.json";
import { useLottie } from "lottie-react";
import { motion } from "motion/react";
import { useTheme } from "@/context/ThemeContext";

/**
 * Loading Component
 *
 * This component displays a loading animation using the Lottie library.
 * It adapts its background color based on the current theme (dark or light).
 *
 */
const Loading = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center ${isDarkTheme ? "bg-secondary" : "bg-tertiary"} `}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          when: "beforeChildren",
        },
      }}
      initial={{
        opacity: 0,
        y: 50,
      }}
      exit={{
        opacity: 0,
        y: 50,
        transition: {
          duration: 0.5,
          when: "afterChildren",
        },
      }}
    >
      <div className="w-[160px] h-[214px]">{View}</div>
    </motion.div>
  );
};

export default Loading;
