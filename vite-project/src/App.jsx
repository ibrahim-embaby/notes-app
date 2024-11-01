import { createContext, useEffect, useState } from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddNote from "./pages/AddNote";
import Note from "./pages/Note";
import UpdateNote from "./pages/UpdateNote";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountActivated from "./pages/AccountActivated";
import ActivateAccount from "./pages/ActivateAccount";

export const UserContext = createContext(
  JSON.parse(localStorage.getItem("user"))
);

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route
            path="/signup"
            element={user ? <Navigate to={"/dashboard"} /> : <SignUp />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to={"/dashboard"} /> : <Login />}
          />

          <Route
            path="/"
            element={
              user ? (
                user.isActivated ? (
                  <Navigate to={"/dashboard"} />
                ) : (
                  <ActivateAccount />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                user.isActivated ? (
                  <Dashboard />
                ) : (
                  <ActivateAccount />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/add-note"
            element={user ? <AddNote /> : <Navigate to={"/login"} />}
          />

          <Route path="/notes/:id" element={<Note />} />
          <Route path="/notes/:id/edit" element={<UpdateNote />} />

          <Route
            path="/account/activate/:token"
            element={<AccountActivated />}
          />
          <Route path="/activate-account" element={<ActivateAccount />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
