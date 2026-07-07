import styles from '../styleSheets/Home.module.css'

export default function Hero() {
    return (
        <>
            <div className={styles.Hero}>
                <video
                    src="/NailVid1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.myVideo}
                />
                <div className={styles.overlay}>
                    <h2 className={styles.title}>Luxury at your fingertips</h2>
                </div>
            </div>
        </>
    )
}