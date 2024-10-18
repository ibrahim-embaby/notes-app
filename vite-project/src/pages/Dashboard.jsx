import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    async function sendReq() {
      const { data } = await axios.get("http://localhost:8000/notes", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setNotes(data.notes);
    }
    sendReq();
  }, []);

  async function deleteNote(id) {
    const { data } = await axios.delete(`http://localhost:8000/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (data.success === true) {
      const newNotes = notes.filter(
        (note) => note._id !== data.deletedNote._id
      );
      setNotes(newNotes);
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
