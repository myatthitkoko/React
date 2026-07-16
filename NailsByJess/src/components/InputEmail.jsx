import styles from "../styleSheets/Booking.module.css"

function validateIncompleteEmail(email) {
    if (!email) return ""

    //specific error messages
    if (email.includes("..")) return "Email cannot contain consecutive periods (.)";

    if ((email.match(/@/g) || []).length > 1) return "Email cannot contain more than one arobase (@)";

    const charRegex = /^[A-Za-z0-9._+\-@]+$/;
    if (!charRegex.test(email)) return "Email contains invalid characters";

    return ""
}

function validateFullEmail(email) {
    //structure regex from https://emailregex.com/index.html
    const structureRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    if (!structureRegex.test(email)) return "Email is in illegal format";
    
    return ""
}

export default function InputEmail({
    email,
    setEmail,
    emailWarning,
    setEmailWarning}) 
    
{
    return (
        <>
            {emailWarning &&  <p className={styles.warning}>{emailWarning}</p>}
            <input 
                className="glass"
                value={email}
                id='Email'
                onChange={(f)=> {
                    setEmail(f.target.value);
                    setEmailWarning(validateIncompleteEmail(f.target.value));
                }}
                onBlur={(f)=> {
                    if (!emailWarning && f.target.value !== "") {
                        setEmailWarning(validateFullEmail(f.target.value));
                    }
                }}
                type="email"
                required
            />
        </>
    )
}