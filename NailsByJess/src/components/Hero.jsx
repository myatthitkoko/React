import styles from '../styleSheets/Home.module.css'
import { useEffect, useRef } from "react";

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
                </div>
            </div>
        </>
    )
}