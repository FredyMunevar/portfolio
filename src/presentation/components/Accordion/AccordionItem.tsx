import React from "react";
import { IAccordionItem } from "./interface/iAccordion";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "motion/react";
import MuneIcon from "../MuneIcon/MuneIcon";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * AccordionItem component that renders a single expandable/collapsible item.
 * Uses Framer Motion for smooth animations and transitions.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Title text for the accordion item
 * @param {ReactNode} props.toolDescription - Content to be displayed when expanded
 */
const AccordionItem = ({ title, toolDescription }: IAccordionItem) => {
  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  /** State to control expanded/collapsed state */
  const [isOpen, setIsOpen] = React.useState(false);

  /**
   * Toggles the expanded/collapsed state of the accordion item
   */
  const togglediv = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.div layout>
      <div
        className="cursor-pointer h-fit flex items-center justify-between gap-l relative"
        onClick={() => {
          togglediv();
          sendGAEvent("event", "toolboxClicked", { value: `toolbox ${title}` });
        }}
      >
        <motion.h3 layout className={`text-h2 font-semibold ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>
          {title}
        </motion.h3>
        <motion.div layout>
          <MuneIcon
            name={"icon-down"}
            size={24}
            color={isDarkTheme ? "var(--tertiary)" : "var(--secondary)"}
            className={`transition-transform ease-in-out duration-1000 transform ${isOpen ? " rotate-180" : ""}`}
          />
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            layout
            style={{ overflow: "hidden" }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >
            {toolDescription}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AccordionItem;
