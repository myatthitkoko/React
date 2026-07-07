import styles from "../styleSheets/Booking.module.css"
import Vanity from "../utilities/InputPhoneVanity"

function handleAlphabets(value, setPhone) {
    return setPhone(Vanity(value));
}

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
                id='Phone'
                onChange={(g)=>{
                    setPhone(Vanity(g.target.value));
                }}
                placeholder="Phone"
                type="tel"
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