import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
    projectName: string;
  }>;
};

const projectTitleMap: Record<string, string> = {
  branch: "Branch",
  hola: "Hola",
  million: "Million",
  "monte-frio": "Monte Frio",
  precision: "Precision",
  weelo: "Weelo",
};

const projectLoaderMap = {
  branch: () => import("../branch"),
  hola: () => import("../hola"),
  million: () => import("../million"),
  "monte-frio": () => import("../monte-frio"),
  precision: () => import("../precision"),
  weelo: () => import("../weelo"),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; projectName: string }>;
}): Promise<Metadata> {
  const { locale, projectName } = await params;
  const projectCapitalized = projectTitleMap[projectName] ?? "Project";

  return {
    title: `Fredy Munevar - ${locale === "en" ? "Portfolio" : "Portafolio"} | ${projectCapitalized}`,
    description: `Fredy Munevar - ${
      locale === "en" ? "Portfolio | Project:" : "Portafolio | Proyecto:"
    } ${projectCapitalized}`,
  };
}

export default async function ProjectPage({ params }: Props) {
  // Await the params if it's a Promise
  const { projectName } = await params;

  const loader = projectLoaderMap[projectName as keyof typeof projectLoaderMap];

  if (!loader) {
    return notFound();
  }

  const ProjectComponent = dynamic(loader);

  return <ProjectComponent />;
}
