import { useState } from "react";

export function usePhone() {
  const [phone, setPhone] = useState("");
  const [phoneWarning, setPhoneWarning] = useState("");

  return { phone, setPhone, phoneWarning, setPhoneWarning };
}
