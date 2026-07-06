import styles from "../../styles/Contact.module.css"
import InputEmail from "./InputEmail.jsx"
import InputPhone from "./InputPhone.jsx"
import { useForm } from "./FormProvider.jsx"

export default function FormBefore() {
    const { name, text, email, phone } = useForm();

    return (
        <>
            <div className={styles.content}>
                <div className={styles.formSection}>
                    <h2 className={styles.title2}>Your Details</h2>
                    <div className={`glass ${styles.formSection} ${styles.credentials}`}>
                        <div className={styles.separator}>
                            <input 
                                value={name.value}
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
                            cols={33}
                            placeholder="Leave a comment!"
                            style={{ padding: 30 }}
                            maxLength={2048}
                        />
                        <p>{`${text.value.length}/2048`}</p>
                    </div>
                </div>
                <button 
                    type="submit"
                    className={styles.button}
                    disabled={email.emailWarning !== "" || phone.phoneWarning !== ""}
                >
                    Submit
                </button>
            </div>
        </>
    )
}