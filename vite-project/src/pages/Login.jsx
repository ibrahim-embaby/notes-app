import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const submitForm = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      if (data.message === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(JSON.parse(localStorage.getItem("user")));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <label htmlFor="">email</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="">password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={submitForm}>login</button>
      <Link to={"/signup"}>signup</Link>
    </div>
  );
}

export default Login;
