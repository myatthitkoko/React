import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <>
            <div className={styles.card}>
                <div className={styles.glassWrapper}>
                    <div className={styles.glass1}>
                        <div>
                            <h1>Hi. </h1>
                            <h1>I am a Computer Science student in Los Angeles.</h1>
                        </div>
                        <div className={styles.buttons}>
                            <div className={`${styles.glass2} shine`}>
                                <Link to="/contact">
                                    <button>Contact</button>
                                </Link>
                            </div>
                            <div className={`${styles.glass3} shine`}>
                                <Link to="/projects">
                                    <button>View Projects</button>
                                </Link>
                            </div>
                            <hr className={styles.line} />
                        </div>
                        <div className={`socials ${styles.socials}`}>
                            <a href="https://www.linkedin.com/in/myatthitkoko">
                                <img src="/linkedin.png" alt="LinkedIn icon" />
                            </a>
                            <a href="https://github.com/myatthitkoko">
                                <img src="/github.png" alt="GitHub icon" />
                            </a>
                            <a href="https://www.youtube.com/@myatthitkoko">
                                <img src="/youtube.png" alt="YouTube icon" />
                            </a>
                        </div>
                    </div>
                    <div className="glass">
                        <div className={styles.slideshow}>
                            <a href="/about/#work-experience">
                                <img id="slide" src="/24C.jpeg" width={400} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}