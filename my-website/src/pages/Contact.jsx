import { useState } from "react";
import FormBefore from "../components/contact/FormBefore.jsx";
import ContactBanner from "../components/contact/ContactBanner.jsx";
import FormAfter from "../components/contact/FormAfter.jsx";
import { FormProvider } from "../components/contact/FormProvider.jsx";

export default function Contact() {

    const [submitted, setSubmitted] = useState(false)
    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
    }

    return ( 
        <FormProvider>
            <ContactBanner />
            {submitted ? (
                <>
                    <FormAfter />
                </>
            ) : (
            <>
                <form onSubmit={handleSubmit}>
                    <FormBefore />
                </form>
            </>
            )}
        </FormProvider>
    );
}