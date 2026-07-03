import styles from "../styles/Projects.module.css"
import ProjectGrid from "../components/projects/ProjectGrid.jsx"
import LabGrid from "../components/projects/LabGrid.jsx"

export default function Projects() {
  return (
      <>
        <main>
          <div  className={styles.content}>
            <h2 id="Recent">Recent Projects</h2>
            <section className={styles.cards}>
              <ProjectGrid 
                featured={false} 
              />
            </section>
            <h2 id="Featured">Featured Projects</h2>
            <section className={styles.cards}>
              <ProjectGrid 
                featured={true} 
              />
            </section>
            <section id="Labs" className="glass">
              <h3 style={{ marginLeft: 50 }}>Remarkable Physics labs</h3>
              <LabGrid />
            </section>
          </div>
        </main>
      </>
  )
}