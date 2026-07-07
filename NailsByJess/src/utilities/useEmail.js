import { useState } from "react";

export function useEmail() {
    const [email, setEmail] = useState("");
    const [emailWarning, setEmailWarning] = useState("");

    return { email, setEmail, emailWarning, setEmailWarning}
}