import { useState } from "react";

export function useInputControlled() {
    const [value, setValue] = useState("");

    return {value, setValue};
}