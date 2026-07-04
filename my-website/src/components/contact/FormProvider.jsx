import { createContext, useContext, useState } from "react";
import { useEmail } from "../../utilities/useEmail.js";
import { usePhone } from "../../utilities/usePhone.js";
import { useInputControlled } from "../../utilities/useInputControlled.js";

const FormContext = createContext();

export function FormProvider({ children }) {
    const name = useInputControlled();
    const text = useInputControlled();
    const email = useEmail();
    const phone = usePhone();

    return (
        <FormContext.Provider
            value={{
                name,
                text,
                email,
                phone
            }}
        >
            {children}
        </FormContext.Provider>
    );
}

export function useForm() {
    return useContext(FormContext);
}