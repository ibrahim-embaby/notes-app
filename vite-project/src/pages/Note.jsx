import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";

function Note() {
  const params = useParams();

  const [note, setNote] = useState({});
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
        setNote(data.note);
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

  return (
    <div>
      <p>title: {note.title}</p>
      <p>content: {note.content}</p>
      <p>created at : {new Date().toUTCString(note?.createdAt)}</p>
      <Link to={`/notes/${params.id}/edit`}>Update </Link>
    </div>
  );
}

export default Note;
