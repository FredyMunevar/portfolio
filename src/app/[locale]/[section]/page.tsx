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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}): Promise<Metadata> {
  const { locale, section } = await params;
  const capFirstLetter = section[0].toUpperCase();
  const restOfSection = section.slice(1);
  const sectionCapitalized = capFirstLetter + restOfSection;

  return {
    title: `Fredy Munevar - ${locale === "en" ? "Portfolio" : "Portafolio"} | ${sectionCapitalized}`,
    description: `Fredy Munevar - ${
      locale === "en" ? "Portfolio | Project:" : "Portafolio | Proyecto:"
    } ${sectionCapitalized}`,
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
