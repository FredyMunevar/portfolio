import React from "react";

interface ExperienceProps {
  title: string;
  description: string;
}

const Experience: React.FC<ExperienceProps> = ({ title, description }) => {
  return (
    <div className="experience">
      <h3 className="text-h3 font-semibold">{title}</h3>
      <p className="text-body">{description}</p>
    </div>
  );
};

export default Experience;
