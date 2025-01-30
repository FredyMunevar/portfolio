import dynamic from "next/dynamic";

const ProjectPage = ({ params }: { params: { projectName: string } }) => {
  const { projectName } = params;

  // Dynamically import the project component
  const ProjectComponent = dynamic(() => import(`../${projectName}.tsx`));

  return <ProjectComponent />;
};

export default ProjectPage;
