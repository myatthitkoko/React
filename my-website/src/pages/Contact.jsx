import { useState } from "react";
import styles from "../styles/Contact.module.css"

export default function Contact() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
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
                                />
                            </div>
                            <div className={styles.separator}>
                                <input 
                                    value={email}
                                    onChange={(f)=>setEmail(f.target.value)}
                                    placeholder="Email"
                                    type="email"
                                />
                            </div>
                            <div className={styles.separator}>
                                <input 
                                    value={phone}
                                    onChange={(g)=>setPhone(g.target.value)}
                                    placeholder="Phone"
                                    type="tel"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}