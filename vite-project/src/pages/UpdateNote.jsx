import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";

function UpdateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function sendReq(retry = false, token = user.token) {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/notes/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTitle(data.note.title);
        setContent(data.note.content);
      } catch (error) {
        if (error.response.status === 401 && !retry) {
          const { data } = await axios.get(
            "http://localhost:8000/auth/refresh-token",
            {
              withCredentials: true,
            }
          );
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
          sendReq(true, data.user.token);
        }
      }
    }
    sendReq();
  }, []);

  const navigate = useNavigate();
  async function submitForm(e, retry = false, token = user.token) {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/notes/${params.id}`,
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
      if (data.success === true) {
        navigate(`/notes/${params.id}`);
      }
    } catch (error) {
      if (error.response.status === 401 && !retry) {
        const { data } = await axios.get(
          "http://localhost:8000/auth/refresh-token",
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        submitForm(e, true, data.user.token);
      }
    }
  }
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

      <button onClick={submitForm}>Edit</button>
    </div>
  );
}

export default UpdateNote;
