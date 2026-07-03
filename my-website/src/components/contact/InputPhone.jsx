import styles from "../../styles/Contact.module.css"

function validateFullPhone(phone) {
    const patternRegex = /^\+?[0-9\s\-\(\)]{7,16}$/
    if (!patternRegex.test(phone)) return "Phone is in illegal format";

    return ""
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
            <input 
                className="glass"
                value={phone}
                onChange={(g)=>{
                    setPhone(g.target.value);
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