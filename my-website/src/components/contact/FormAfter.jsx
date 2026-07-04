import styles from "../../styles/Contact.module.css"
import { useForm } from "./FormProvider.jsx"

export default function FormAfter() {
    const { name, text, email, phone } = useForm();

    const fields = [
        { id: "name", label: "Name", value: name.value },
        { id: "email", label: "Email", value: email.email },
        { id: "phone", label: "Phone", value: phone.phone },
        { id: "text", label: "Comments", value: text.value}
    ];

    return (
        <>
            <h2 className={styles.title2}>Form Submitted</h2>
            <div className={styles.content}>
                <p className={styles.bigRectangle}>Thank you for submitting the form. Here's what we got from you!</p>
                {fields.filter(i => i.value !== "").map((field)=>(
                    <p key={field.id} className={styles.receivedData}>{`${field.label}: ${field.value}`}</p>
                ))}
            </div>
        </>
    )
}