import About from "../sections/about";
import Toolbox from "../sections/toolbox";
import Contact from "../sections/contact";
import Projects from "../sections/projects";

const SectionPage = ({ params }: { params: { section: string } }) => {
  const { section } = params;

  // Map routes to their corresponding components
  const sectionComponents: { [key: string]: React.ComponentType } = {
    about: About,
    toolbox: Toolbox,
    contact: Contact,
    projects: Projects,
  };

  // Get the component for the current section
  const SectionComponent = sectionComponents[section];

  if (!SectionComponent) {
    return <div>Page not found!</div>;
  }

  return <SectionComponent />;
};

export default SectionPage;
