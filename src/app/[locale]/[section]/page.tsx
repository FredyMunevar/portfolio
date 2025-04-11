import About from "../sections/about";
import Toolbox from "../sections/toolbox";
import Contact from "../sections/contact";
import Projects from "../sections/projects";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    section: string;
  }>;
};

export default async function SectionPage({ params }: Props) {
  // Await the params if it's a Promise
  const { section } = await params;

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
