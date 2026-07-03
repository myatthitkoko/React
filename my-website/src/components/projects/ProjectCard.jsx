import styles from "../../styles/Projects.module.css"
import projectList from "../../data/projects.json"
import LanguageTags from "./LanguageTags.jsx";

export default function ProjectCard({ project }) {
    return (
        <div className={`${styles.project} glass enlarge`}>
            <a href={project.link}>
            <img
                src={project.imgURL}
                alt={project.alt}
            />
            <figcaption>{project.name}</figcaption>
            <p>{project.description}</p>
                <div className={styles.languages}>
                    <LanguageTags
                        languages={project.languages}
                    />
                </div>
            </a>
        </div>
    );
}