import projectList from "../../data/projects.json"
import ProjectCard from "./ProjectCard.jsx"

export default function ProjectGrid({featured}) {
  const featuredProjects = projectList.filter(i => i.featured);
  return (
    <>
      {(featured ? featuredProjects : projectList
      ).map((project) => (
        <ProjectCard
            key={project.name}
            project={project}
        />
    ))}
    </>
  );
}