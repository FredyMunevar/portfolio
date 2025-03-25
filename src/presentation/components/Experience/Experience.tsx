import React from "react";

/**
 * Props interface for Experience component
 */
interface ExperienceProps {
  /** Job title or position */
  title: string;
  /** Detailed description of the experience */
  description: string;
  /** Role or company name */
  role: string;
  /** Time period of the experience */
  date: string;
}

/**
 * Styles for the date element's before pseudo-element
 * Creates a horizontal line across the timeline
 */
const dateBeforeStyles =
  "before:w-full before:absolute before:-z-10 before:border-t-2 before:top-[50%] before:left-0 before:border-border-light";

/**
 * Styles for the date element's after pseudo-element
 * Creates a circular marker on the timeline
 */
const dateAfterStyles =
  "after:w-m after:h-m after:border-2 after:rounded-lg after:bg-tertiary after:border-border-light after:absolute after:left-0 after:top-[50%] after:-translate-y-[50%] after:-translate-x-[50%]";

/**
 * Experience component that displays a single work experience entry
 * in a timeline format with date, role, title, and description.
 */
const Experience: React.FC<ExperienceProps> = ({ role, date, title, description }) => {
  return (
    <div className="flex flex-col border-l-2 border-l-border-light py-l">
      <div className="flex justify-end relative">
        <span
          className={`bg-border-light shrink grow-0 py-xs px-m italic text-secondary ${dateBeforeStyles} ${dateAfterStyles}`}
        >
          {date}
        </span>
      </div>
      <div className="text-left p-l pr-0 flex flex-col gap-l">
        <h2 className="font-semibold text-h2 leading-snug text-primary">{role}</h2>
        <h3 className="text-h3 font-semibold">{title}</h3>
        <p className="text-body">{description}</p>
      </div>
    </div>
  );
};

export default Experience;
