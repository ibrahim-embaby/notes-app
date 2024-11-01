import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";

export default function AccountActivated() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function sendReq() {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/auth/verify-email",
        {
          token: token,
        }
      );

      if (data) {
        if (data.success) {
          if (user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
          }
          setLoading(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    }
    sendReq();
  }, [token]);
  return loading ? <div>loading....</div> : <Navigate to="/" />;
}
