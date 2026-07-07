import styles from '../styleSheets/Home.module.css'
import { Link } from "react-router-dom";

export default function() {
    return (
        <>
            <div className={styles.Summary}>
                <h3>Your Nail Glow-Up Starts Here</h3>
                <p>Hi. My name is Yesenia Gonzalez. I am a home based nail technician in San Pedro, California. Experience a touch of beauty by booking an appointment. </p>
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