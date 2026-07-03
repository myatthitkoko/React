import styles from "../../styles/Projects.module.css"
import labs from "../../data/labs.json"

export default function LabGrid() {
  return (
    <>
      <ul className="nullifyList">
      {labs.map((paper, i) => (
        <li className={`glass enlarge shine ${styles.item}`} key={i}>
          <a href={paper.labURL}>
            <span>{paper.name}</span>
          </a>
          <span>{paper.course}</span>
        </li>
      ))}
        <br />
        <li className={styles.item} style={{ gridTemplateColumns: "1fr" }}>
          Progress comes from correcting assumptions. These labs were not always
          straightforward. See an example below.
        </li>
        <li className={`glass enlarge shine ${styles.item}`}>
          <a href="https://www.loom.com/share/2660a2779bd54824a976c4c4d83e8b07">
            <span>Team Communication - Angle Correction in Lab 10</span>
          </a>
        </li>
      </ul>
    </>
  )
}