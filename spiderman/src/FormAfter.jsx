import styles from './styles.module.css'
import { useForm } from "./FormProvider.jsx"

export default function FormAfter({selectedSeats}) {
    const { name } = useForm();

    function sendInfo(e) {
        e.preventDefault();
        fetch("https://react-production-d69e.up.railway.app/api/reserve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.value,
                seat: selectedSeats
            }),
        })
        .then((res) => res.json())
    }

    return (
        <form onSubmit={sendInfo}>
            <div className={styles.formSection}>
                <h2 className={styles.title2}>Contact Info <span className="smaller"><span className="red">*</span> indicates required</span></h2>
                <div className={`glass ${styles.formSection} ${styles.credentials}`}>
                    <div className={styles.separator}>
                        <label htmlFor='Name'>Name <span className="red">*</span></label>
                        <input 
                            value={name.value}
                            id='Name'
                            onChange={(e)=>name.setValue(e.target.value)}
                            type="text"
                            maxLength={70}
                            className="glass"
                            required
                        />
                    </div>
                </div>
            </div>
            <p>Please fill out your name for the reservation first. Once you press the Reserve button, you will be redirected to Stripe, a secure third-party payment system where you could make a $15 payment to confirm your reservation. Your name will be shown on the list once the reservation is confirmed.</p>
            <button 
                type="submit"
                className={styles.button}
                disabled={name.value === "" || !selectedSeats}
            >
                Reserve Seat G{selectedSeats}
            </button>
        </form>
    )
}