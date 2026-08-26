import styles from '../styleSheets/Home.module.css'
import InstagramEmbed from '../components/InstagramEmbed.jsx'

export default function Summary() {
    return (
        <>
            <section className={styles.Welcome}>
                <div className={styles.Summary}>
                    <h3><span className="enter">Nail Designs of Your Dreams</span>Beauty & Personal Care</h3>
                    <p>Hello. My name is Yesenia Gonzalez. I operate a home-based nail studio in San Pedro to create personalized, detailed nail sets with attention to every detail. Your appointment is designed to feel relaxing, transformative, and fun. </p>
                </div>
                <div className={styles.posts}>
                    <InstagramEmbed URL="https://www.instagram.com/p/DFqDiHfvO5i/?img_index=3"/>
                </div>
            </section>
        </>
    )
}