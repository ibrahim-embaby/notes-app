import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async () => {
    const { data } = await axios.post("http://localhost:8000/auth/signup", {
      name,
      email,
      password,
    });
    if (data.message === "success") {
      navigate("/login");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>sign up</h1>
      <label htmlFor="">name</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />

      <label htmlFor="">email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="">password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button onClick={submitForm}>signup</button>
    </div>
  );
}
