import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";

function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitForm = async (retry = false, token = user.token) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/notes",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.message === "success") {
        toast.success(data.message, {
          style: {
            color: "blue",
          },
        });

        navigate("/dashboard");
      } else {
        console.log(data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        const { data } = await axios.get(
          "http://localhost:8000/auth/refresh-token",
          {
            withCredentials: true,
          }
        );

        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        submitForm((retry = true), data.user.token);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label htmlFor="">title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="">content</label>
      <textarea
        name=""
        id=""
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>

      <button onClick={submitForm}>Add</button>
    </div>
  );
}

export default AddNote;
