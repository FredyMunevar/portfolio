import React, { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "motion/react";

/**
 * ThemeTransition component that animates its children based on the current theme.
 *
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The content to be displayed inside the component.
 * @param {string} [props.className] - Additional CSS classes to apply to the component.
 * @param {boolean} [props.wait] - Flag to determine if the animation should wait for the previous one to complete.
 *
 */
const ThemeTransition = ({
  children,
  className,
  wait,
}: {
  children: ReactNode;
  className?: string;
  wait?: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <AnimatePresence mode={wait ? "wait" : undefined}>
      <motion.div
        key={theme}
        initial={{ clipPath: "circle(0% at 0% 0%)" }}
        animate={{ clipPath: "circle(150% at 0% 0%)" }}
        exit={{ clipPath: "circle(0% at 0% 0%)" }}
        transition={{ duration: 1 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeTransition;
