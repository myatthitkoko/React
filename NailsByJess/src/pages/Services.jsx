import styles from '../styleSheets/Services.module.css'
import InstagramEmbed from '../components/InstagramEmbed.jsx'

const nails = [
    "Press Ons", "Gel Manicure", "Acrylic Illusions", "Cursive Writing", "Short Nails"
]

const featured = [
    "featured1.png", "featured2.png", "featured3.png"
]

const pressed = [
    "press1.png", "press2.png", "press3.png"
]

export default function Services() {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <h2 className="title">Services</h2>
                <section className={styles.nailGroup}>
                    <div className={styles.banners}>
                        {nails.map((nail, i) => (
                            <button className={`${styles.nails} ${styles[`nail${i}`]}`} key={nail}>{nail}</button>
                        ))}
                    </div>
                    <div className={styles.text}>
                        <p>A curated blend of artistry and technique as well as everything from effortless at‑home sets to sculpted enhancements and delicate hand‑painted details are offered to my clients. Whether you prefer the simplicity of short nails or the drama of acrylic designs, each service is crafted with intention, precision, and a signature touch that makes every set feel uniquely yours.</p>
                    </div>
                </section>
                <h2 className="title">Featured Works</h2>
                <div className={styles.posts}>
                    {featured.map((photo) => (
                            <img key={photo} src={photo} />
                    ))}
                </div>
                <h2 className="title">Press Ons</h2>
                <div className={styles.posts}>
                    {pressed.map((photo) => (
                            <img key={photo} src={photo} />
                    ))}
                </div>
                <h2 className="title">Follow My Instagram Gallery</h2>
                <div className={styles.posts}>
                    <InstagramEmbed URL="https://www.instagram.com/p/DFqDiHfvO5i/?img_index=3"/>
                    <InstagramEmbed URL="https://www.instagram.com/p/DaQS34BFKeO/"/>
                    <InstagramEmbed URL="https://www.instagram.com/p/DaTcJVbkqCo/"/>
                    <InstagramEmbed URL="https://www.instagram.com/p/DY4-t-1mstp/"/>
                    <InstagramEmbed URL="https://www.instagram.com/p/DZvMohcGdxZ/"/>
                </div>
            </div>
        </div>
    )
}