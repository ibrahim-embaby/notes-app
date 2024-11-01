import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../App";
import { toast } from "react-toastify";

export default function ActivateAccount() {
  const { user } = useContext(UserContext);
  const sendAnotherEmail = async () => {
    const { data } = await axios.post(
      "http://localhost:8000/auth/send-verification-email",
      {
        email: user.email,
      }
    );
    if (data) {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };
  return (
    <div>
      activate your account
      <button onClick={sendAnotherEmail}>send another email</button>
    </div>
  );
}
