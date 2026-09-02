import styles from '../styleSheets/Booking.module.css';
import { FormProvider } from "../components/FormProvider";
import FormBefore from "../components/FormBefore";
import { Link, useLocation } from "react-router-dom";

export default function BookingForm( {open, slot, selected, date, onClose, refetchAvailability}) {
    return (
        <div className={`${styles.formWrapper} ${open ? styles.open : styles.closed}`}>
            <button className={styles.exit} onClick={onClose}><img src='doubleDownSign.svg'/></button>
            <div className={styles.form}>
                <FormProvider>
                    <div className={styles.message}>
                        <h2>You are making an appointment for {date.toDateString()} at {new Date(slot).toLocaleTimeString("en-CA", {timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit"})}</h2>
                        <div><p>Need to make a change?</p><button type="button" className={styles.messageExit} onClick={onClose}>Return to Time Slot</button></div>
                    </div>
                    <div className={styles.formContent}>
                        <FormBefore 
                        onClose = {onClose}
                        selected = {selected}
                        slot = {slot}
                        refetchAvailability = {refetchAvailability}
                        />
                        <p>By submitting this form, you acknowledge that your information will be used to process and manage your appointment. View our <Link to='/privacy-policy' style={{textDecoration: "underline"}}>Privacy Policy</Link> for more information.</p>
                        <p>After clicking the button, the page will be redirected to Stripe, a third-party payment system, where you could make a $20 deposit to complete your reservation.</p>
                        <p>During the payment process, your selected slot will remain on hold for 15 minutes. For cancellations and refunds, you must directly reach out to Jess as soon as possible. </p>
                    </div>
                </FormProvider>
            </div>
        </div> 
    );
}