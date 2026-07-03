import projectList from "../../data/projects.json"

export default function LanguageTags({ languages }) {
    return (
        <>
            {languages.map((lang) => (
                <p className="glass" key={lang}>{lang}</p>
            ))}
        </>
    );
}