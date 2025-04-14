import { Metadata } from "next";
import { notFound } from "next/navigation";
import About from "../sections/about";
import Toolbox from "../sections/toolbox";
import Contact from "../sections/contact";
import Projects from "../sections/projects";

type Props = {
  params: Promise<{
    section: string;
  }>;
};

export async function generateMetadata({ params }: { params: { locale: string; section: string } }): Promise<Metadata> {
  return {
    title: `Fredy Munevar | ${params.section}`,
    description: `Fredy Munevar | ${params.section}`,
  };
}

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
