import styles from '../styleSheets/Home.module.css'
import { Link } from "react-router-dom";

export default function() {
    return (
        <>
            <div className={styles.Summary}>
                <h3>Your Nail Glow-Up Starts Here</h3>
                <p>Hello. My name is Yesenia Gonzalez. I operate a home-based nail studio in San Pedro to create personalized, detailed nail sets with attention to every detail. Your appointment is designed to feel relaxing, transformative, and fun. </p>
                <div className={styles.buttons}>
                    <Link to="/services" className={`${styles.button} secondary`}>
                        View Services
                    </Link>

                    <Link to="/booking" className={`${styles.button} primary`}>
                        Schedule an Appointment →
                    </Link>
                </div>
            </div>
        </>
    )
}