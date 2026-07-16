import styles from "../styleSheets/Booking.module.css"
import CalendarSection from "../components/CalendarSection";
import { useEffect, useState } from "react";

export default function Booking() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/hello")
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <div className={styles.main}>
                <h1>{message}</h1>
                <CalendarSection />
            </div>
        </>
    )
}