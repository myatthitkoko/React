import styles from '../styleSheets/Booking.module.css';
import { FormProvider } from "../components/FormProvider";
import FormBefore from "../components/FormBefore";

export default function ( {open, slot, selected, date, onClose}) {
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
                        selected = {selected}
                        slot = {slot}
                        />
                        <p>After clicking the button, the page will be redirected to a third party payment system where you could make a $20 deposit to complete your reservation.</p>
                    </div>
                </FormProvider>
            </div>
        </div> 
    );
}