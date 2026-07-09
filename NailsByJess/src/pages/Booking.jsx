import styles from "../styleSheets/Booking.module.css"
import CalendarSection from "../components/CalendarSection";

export default function Booking() {
    return (
        <>
            <div className={styles.main}>
                <CalendarSection />
            </div>
        </>
    )
}