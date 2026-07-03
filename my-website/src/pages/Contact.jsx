import { useState } from "react";
import { useRef } from "react";
import styles from "../styles/Contact.module.css"
import InputEmail from "../components/contact/InputEmail.jsx"
import InputPhone from "../components/contact/InputPhone.jsx";

export default function Contact() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const textRef = useRef(null);
    const [emailWarning, setEmailWarning] = useState("");
    const [phoneWarning, setPhoneWarning] = useState("");
    return (
        <>
            <div className={styles.Banner}>
                <img src="./soCal.jpeg"/>
                <div className={`glass ${styles.circle}`}>
                    <h2>I want your contact!</h2>
                </div>
                <p className={`justified ${styles.text}`}>Thanks for visiting.</p>
            </div>
            <div className={styles.content}>
                <form>
                    <div className={styles.formSection}>
                        <h2 className={styles.title2}>Your Details</h2>
                        <div className={`glass ${styles.formSection} ${styles.credentials}`}>
                            <div className={styles.separator}>
                                <input 
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    placeholder="Name"
                                    type="text"
                                    maxLength={70}
                                    className="glass"
                                    required
                                />
                            </div>
                            <div className={styles.separator}>
                                <InputEmail
                                    email={email}
                                    setEmail={setEmail}
                                    emailWarning={emailWarning}
                                    setEmailWarning={setEmailWarning}
                                />
                            </div>
                            <div className={styles.separator}>
                                <InputPhone
                                    phone={phone}
                                    setPhone={setPhone}
                                    phoneWarning={phoneWarning}
                                    setPhoneWarning={setPhoneWarning}
                                />
                            </div>
                        </div>
                        <textarea
                            ref={textRef}
                            className="glass"
                            rows={5}
                            cols={33}
                            placeholder="Leave a comment!"
                            style={{ padding: 30 }}
                            defaultValue={""}
                        />
                    </div>
                    <button 
                        type="button"
                        onClick={() => alert(name + "\n" + email + "\n" + phone + "\n" + textRef.current.value)}
                        className={styles.button}
                        disabled={emailWarning !== "" || phoneWarning !== ""}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}