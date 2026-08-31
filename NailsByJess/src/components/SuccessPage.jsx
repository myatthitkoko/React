import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../styleSheets/Confirmations.module.css"

export default function SuccessPage() {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();
    const sessionID = searchParams.get("session_id");

    useEffect(() => {

        if (!sessionID) {
            setError("No payment session found. ");
            setLoading(false);
            return;
        }

        async function getBooking() {
            const response = await fetch (
                `https://react-production-bd8a.up.railway.app/api/booking/success?session_id=${encodeURIComponent(sessionID)}`
            );

            const data = await response.json();

            if (!data.success) {
                setError("Unable to find booking.");
                return;
            }

            setBooking(data);
            setLoading(false);
        }

        getBooking();
    }, []);

    if (loading) {
        return (
            <div>
                <p>Loading your booking...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <section className={styles.page}>
            <div className={styles.rectangle}>
                <div className={styles.imgContainer}>
                    <img src="checked-svgrepo-com.svg" alt="checkmark"/>
                </div>
                <h1>Appointment Confirmation</h1>
                <hr/>
                <p>
                    <strong>Booking ID:</strong> {booking.bookingID}
                </p>
                <p>
                    <strong>Name: </strong> {booking.name}
                </p>
                <p>
                    <strong>Email: </strong> {booking.email}
                </p>
                <p>
                    <strong>Date: </strong> 
                    {new Date(booking.dateAndTime).toLocaleString("en-US", {
                        timeZone: "America/Los_Angeles",
                        dateStyle: "long",
                        timeStyle: "short",
                    })}
                </p>

                <h3>A confirmation email has been sent to your inbox. Please check your spam or junk folder if not found.</h3>
            </div>
        </section>
    );
}