import { Metadata } from "next";
import dynamic from "next/dynamic";

type Props = {
  params: Promise<{
    locale: string;
    projectName: string;
  }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; projectName: string }>;
}): Promise<Metadata> {
  const { projectName } = await params;
  const capFirstLetter = projectName[0].toUpperCase();
  const restOfProject = projectName.slice(1);
  const projectCapitalized = capFirstLetter + restOfProject;

  return {
    title: `Fredy Munevar | ${projectCapitalized}`,
    description: `Fredy Munevar | Project: ${projectCapitalized}`,
  };
}

export default async function ProjectPage({ params }: Props) {
  // Await the params if it's a Promise
  const { projectName } = await params;

  // Dynamically import the project component
  const ProjectComponent = dynamic(() => import(`../${projectName}.tsx`));

  return <ProjectComponent />;
}
