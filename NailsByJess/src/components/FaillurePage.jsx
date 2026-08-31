export default function FailurePage() {
    return (
        <section className={styles.redPage}>
            <div className={styles.rectangle}>
                <div className={styles.imgContainer}>
                    <img src="cross-circle-svgrepo-com.svg" alt="crossmark"/>
                </div>
                <h1>Something Went Wrong</h1>

                <h3>Let's try again</h3>
                <p>Your card has not been charged at this time.</p>
            </div>
        </section>
    )
}