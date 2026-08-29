import styles from "../styleSheets/Booking.module.css"
import InputEmail from "./InputEmail.jsx"
import InputPhone from "./InputPhone.jsx"
import { useForm } from "./FormProvider.jsx"

export default function FormBefore({onClose, selected, slot, refetchAvailability}) {
    const { name, text, email, phone } = useForm();

    async function sendInfo(e) {
        e.preventDefault();
        const response = await fetch("https://react-production-bd8a.up.railway.app/api/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dateAndTime: slot,
                name: name.value,
                email: email.email,
                phone: phone.phone,
                comment: "disabled",
            }),
        })
        
        const data = await response.json();
        window.location.href = data.url;
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
                    <div className={styles.separator}>
                        <label htmlFor='Email'>Email <span className="red">*</span></label>
                        <InputEmail
                            {...email}
                        />
                    </div>
                    <div className={styles.separator}>
                        <label htmlFor="Phone">Phone</label>
                        <InputPhone
                            {...phone}
                        />
                    </div>
                </div>
                {/*<div className={styles.comment}>
                    <textarea
                        value={text.value}
                        onChange={(a)=>text.setValue(a.target.value)}
                        className="glass"
                        rows={5}
                        cols={25}
                        placeholder="Leave a comment!"
                        maxLength={2048}
                        id='Comment'
                    />
                    <p>{`${text.value.length}/2048`}</p>
                </div>*/}
            </div>
            <button 
                type="submit"
                className={`${styles.button} primary`}
                disabled={email.emailWarning !== "" || phone.phoneWarning !== "" || email.email  === "" || name.name === ""}
            >
                Confirm with Deposit
            </button>
        </form>
    )
}