import About from "../sections/about";
import Toolbox from "../sections/toolbox";
import Contact from "../sections/contact";
import Projects from "../sections/projects";
import { notFound } from "next/navigation";

export default async function SectionPage({ params }: { params: { section: string } }) {
  // Await the section parameter
  const section = await Promise.resolve(params).then((p) => p.section);

  // Map routes to their corresponding components
  const sectionComponents: { [key: string]: React.ComponentType } = {
    about: About,
    toolbox: Toolbox,
    contact: Contact,
    projects: Projects,
  };

  const ComponentToRender = sectionComponents[section];

  if (!ComponentToRender) {
    return notFound();
  }

  return <ComponentToRender />;
}
