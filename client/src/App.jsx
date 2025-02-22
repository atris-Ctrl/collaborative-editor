import { useState, useEffect } from "react";
import "./App.css";
import Editor from "./Editor";
import socket from "./services/socket";
function App() {
  const [users, setUsers] = useState([]);

  useEffect(
    function () {
      socket.on("userArrive", (newUser) => {
        console.log("new user is here");
        setUsers((users) => [...users, newUser]);
      });
      socket.on("userDisconnect", (disconnectedUserID) =>
        setUsers((users) =>
          users.filter((user) => user.id !== disconnectedUserID)
        )
      );
      return () => {
        socket.off("userArrive");
        socket.off("userDisconnect");
      };
    },
    [setUsers]
  );
  return (
    <div className="App">
      {users.map((user) => (
        <User key={user.id} id={user.id} name={user.name}></User>
      ))}
      <Editor />
    </div>
  );
}

function User({ name, id }) {
  console.log(name);
  return (
    <div
      style={{
        borderRadius: "50%",
        border: "1px solid black",
        backgroundColor: "blue",
        padding: "10px",
        display: "inline-block",
      }}
    >
      <p>{name}</p>
      <p>{id}</p>
    </div>
  );
}

export default App;
