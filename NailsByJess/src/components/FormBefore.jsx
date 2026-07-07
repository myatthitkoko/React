import styles from "../styleSheets/Booking.module.css"
import InputEmail from "./InputEmail.jsx"
import InputPhone from "./InputPhone.jsx"
import { useForm } from "./FormProvider.jsx"

export default function FormBefore() {
    const { name, text, email, phone } = useForm();

    return (
        <>
            <div className={styles.formSection}>
                <h2 className={styles.title2}>Contact Info</h2>
                <div className={`glass ${styles.formSection} ${styles.credentials}`}>
                    <div className={styles.separator}>
                        <input 
                            value={name.value}
                            id='Name'
                            onChange={(e)=>name.setValue(e.target.value)}
                            placeholder="Name"
                            type="text"
                            maxLength={70}
                            className="glass"
                            required
                        />
                    </div>
                    <div className={styles.separator}>
                        <InputEmail
                            {...email}
                        />
                    </div>
                    <div className={styles.separator}>
                        <InputPhone
                            {...phone}
                        />
                    </div>
                </div>
                <div className={styles.comment}>
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
                </div>
            </div>
            <button 
                type="submit"
                className={styles.button}
                disabled={email.emailWarning !== "" || phone.phoneWarning !== ""}
            >
                Make a Deposit
            </button>
        </>
    )
}