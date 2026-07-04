import styles from "../../styles/Contact.module.css"

export default function ContactBanner() {
    return (
        <>
            <div className={styles.Banner}>
                    <img src="./soCal.jpeg"/>
                    <div className={`glass ${styles.circle}`}>
                        <h2>I want your contact!</h2>
                    </div>
                    <p className={`justified ${styles.text}`}>Thanks for visiting.</p>
            </div>
        </>
    )
}