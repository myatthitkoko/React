import styles from './styles.module.css'
import { useForm } from "./FormProvider.jsx"
import { useNavigate } from "react-router-dom";

export default function FormBefore({selectedTimes}) {
    const { name, text, email, phone } = useForm();
    const navigate = useNavigate();

    function sendInfo(e) {
        e.preventDefault();
        fetch("https://react-production-d69e.up.railway.app/api/rsvp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.value,
                comment: text.value,
                datetimes: selectedTimes
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Your response has been recorded");
        })
        navigate("/thanks");
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
                <div className={styles.comment}>
                    <textarea
                        value={text.value}
                        onChange={(a)=>text.setValue(a.target.value)}
                        className="glass"
                        rows={5}
                        cols={25}
                        placeholder="Any comments?"
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
                Send Availability
            </button>
        </form>
    )
}