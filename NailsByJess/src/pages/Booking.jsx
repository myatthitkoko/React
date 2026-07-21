import styles from "../styleSheets/Booking.module.css"
import CalendarSection from "../components/CalendarSection";
import { useEffect, useState } from "react";

export default function Booking() {
    const [message, setMessage] = useState("");

    return (
        <>
            <div className={styles.main}>
                <CalendarSection />
            </div>
        </>
    )
}