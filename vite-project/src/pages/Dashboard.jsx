import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from "react-toastify";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    async function sendReq(retry = false, token = user.token) {
      try {
        console.log(user.token);
        const { data } = await axios.get("http://localhost:8000/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(data.notes);
      } catch (error) {
        if (error.response.status === 401 && !retry) {
          const { data } = await axios.get(
            "http://localhost:8000/auth/refresh-token",
            {
              withCredentials: true,
            }
          );
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log(data.user);
          setUser(data.user);
          sendReq(true, data.user.token);
        } else {
          console.log(error);
          toast.error("somthing went wrong");
        }
      }
    }
    sendReq();
  }, []);

  async function deleteNote(id, retry = false, token = user.token) {
    try {
      const { data } = await axios.delete(`http://localhost:8000/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success === true) {
        const newNotes = notes.filter(
          (note) => note._id !== data.deletedNote._id
        );
        setNotes(newNotes);
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
        deleteNote(id, true, data.user.token);
      }
    }
  }

  const singoutFn = () => {
    localStorage.removeItem("user");
    setUser(JSON.parse(localStorage.getItem("user")));
  };
  return (
    <div>
      <button onClick={singoutFn}>Signout</button>
      {notes.map((note) => (
        <div key={note._id}>
          <Link to={`/notes/${note._id}`}>
            <div
              style={{
                border: "1px solid #ddd",
                margin: "10px",
                padding: "10px",
              }}
            >
              <p>{note.userId.name}</p>
              <p>{note.title}</p>
              <p>{note.content}</p>
            </div>
          </Link>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}

      <Link to={"/add-note"}>Add Note</Link>
    </div>
  );
}

export default Dashboard;
