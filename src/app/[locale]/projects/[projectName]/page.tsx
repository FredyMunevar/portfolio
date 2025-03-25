import dynamic from "next/dynamic";

type Props = {
  params: {
    locale: string;
    projectName: string;
  };
};

// Convert to async function
export default async function ProjectPage({ params }: Props) {
  // Destructure params after the async function declaration
  const { projectName } = params;

  // Dynamically import the project component
  const ProjectComponent = dynamic(() => import(`../${projectName}.tsx`));

  return <ProjectComponent />;
}
