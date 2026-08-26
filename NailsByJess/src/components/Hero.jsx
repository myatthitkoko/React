import styles from '../styleSheets/Home.module.css'
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        if (video) video.play()
    }, []);

    return (
        <>
            <div className={styles.Hero}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className={styles.myVideo}
                >
                    <source src="/NailVid1.mp4" type="video/mp4" />
                </video>
                <div className={styles.overlay}>
                    <h2 className={styles.title}>Luxury at your fingertips</h2>
                    <div className={styles.Summary}>
                        <div className={styles.buttons}>
                            <Link to="/services" className={`${styles.button} secondary`}>
                                View Services
                            </Link>

                            <Link to="/booking" className={`${styles.button} primary`}>
                                Schedule an Appointment →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}