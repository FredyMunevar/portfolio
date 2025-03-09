import React from "react";

/**
 * ProjectInfo component that displays role and type information for a project.
 * Features responsive layout and theme-aware styling.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isDarkTheme - Flag indicating if dark theme is active
 * @param {string} props.roleTitle - Title for the role section
 * @param {string} props.roleContent - Content describing the role
 * @param {string} props.typeTitle - Title for the project type section
 * @param {string} props.typeContent - Content describing the project type
 *
 */
const ProjectInfo = ({
  isDarkTheme,
  roleTitle,
  roleContent,
  typeTitle,
  typeContent,
}: {
  isDarkTheme: boolean;
  roleTitle: string;
  roleContent: string;
  typeTitle: string;
  typeContent: string;
}) => {
  return (
    <div className="flex flex-col gap-l md:flex-row md:gap-[1.5rem] mb-xl px-m">
      <div className="flex flex-col gap-xs md:text-center md:w-1/2 xl:text-left xl:w-1/3">
        <h4 className={`text-type font-semibold ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>{roleTitle}</h4>
        <h5 className={`text-desc font-light ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>{roleContent}</h5>
      </div>
      <div className="flex flex-col gap-xs md:text-center md:w-1/2 xl:text-left xl:w-1/3">
        <h4 className={`text-type font-semibold ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>{typeTitle}</h4>
        <h5 className={`text-desc font-light ${isDarkTheme ? "text-tertiary" : "text-secondary"}`}>{typeContent}</h5>
      </div>
    </div>
  );
};

export default ProjectInfo;
