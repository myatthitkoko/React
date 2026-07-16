import styles from "../styleSheets/Booking.module.css"
import InputEmail from "./InputEmail.jsx"
import InputPhone from "./InputPhone.jsx"
import { useForm } from "./FormProvider.jsx"

export default function FormBefore() {
    const { name, text, email, phone } = useForm();

    return (
        <div>
            <div className={styles.formSection}>
                <h2 className={styles.title2}>Contact Info <span className="smaller"><span className="red">*</span> indicates required</span></h2>
                <div className={`glass ${styles.formSection} ${styles.credentials}`}>
                    <div className={styles.separator}>
                        <label for='Name'>Name <span className="red">*</span></label>
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
                        <label for='Email'>Email <span className="red">*</span></label>
                        <InputEmail
                            {...email}
                        />
                    </div>
                    <div className={styles.separator}>
                        <label for="Phone">Phone</label>
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
        </div>
    )
}