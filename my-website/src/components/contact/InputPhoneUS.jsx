import styles from "../../styles/Contact.module.css"

function validateFullPhone(phone) {
    const patternRegex = /^\+?[0-9\s\-\(\)]{7,16}$/
    if (!patternRegex.test(phone)) return "Phone is in illegal format";

    return ""
}

function handleChange(g, setPhone) {
    //assuming US phone number
    const rawInput = g.target.value.replace(/\D/g, '');
    let formatted = "";

    const inputType = g.nativeEvent.inputType;

    if (inputType === "deleteContentBackward") {
        setPhone(g.target.value);
        return;
    }

    if (rawInput.length > 0) {
      formatted = `(${rawInput.slice(0, 3)}`;
    }
    if (rawInput.length >= 3) {
      formatted += `) ${rawInput.slice(3, 6)}`;
    }
    if (rawInput.length >= 6) {
      formatted += `-${rawInput.slice(6, 10)}`; 
    }
    setPhone(formatted);
}

export default function InputPhone({
    phone,
    setPhone,
    phoneWarning,
    setPhoneWarning}) 
    
{
    return (
        <>
            {phoneWarning &&  <p className={styles.warning}>{phoneWarning}</p>}
            <span className={styles.phPrefix}>+1</span>
            <input 
                className={`glass ${styles.phInput}`}
                value={phone}
                onChange={(g)=>{
                    handleChange(g, setPhone);
                }}
                placeholder="Phone"
                type="tel"
                required
                onBlur={(g)=>{
                    if (g.target.value.trim() === "") {
                        setPhoneWarning("");
                    } else {
                        setPhoneWarning(validateFullPhone(g.target.value));
                    }
                }}
            />
        </>
    )
}