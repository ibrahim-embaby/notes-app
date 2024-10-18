import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";

function Note() {
  const params = useParams();

  const [note, setNote] = useState({});
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function sendReq() {
      const { data } = await axios.get(
        `http://localhost:8000/notes/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setNote(data.note);
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
