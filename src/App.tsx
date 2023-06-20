import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Login from "./components/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged, auth } from "./Fire";
import { setuid } from "process";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user.uid);
      } else {
        navigate("/login");
      }
    });
  }, []);

  const [user, setUser] = useState("");
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        {user ? (
          <Route
            path="/task-board"
            element={<Board user={user} setUser={setUser} />}
          />
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
