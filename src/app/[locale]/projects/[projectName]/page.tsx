import dynamic from "next/dynamic";

type Props = {
  params: Promise<{
    locale: string;
    projectName: string;
  }>;
};

export default async function ProjectPage({ params }: Props) {
  // Await the params if it's a Promise
  const { projectName } = await params;

  // Dynamically import the project component
  const ProjectComponent = dynamic(() => import(`../${projectName}.tsx`));

  return <ProjectComponent />;
}
