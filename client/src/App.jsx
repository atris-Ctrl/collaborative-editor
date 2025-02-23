import { useState, useEffect, useRef } from "react";
import "./App.css";
import Editor from "./Editor";
import UserList from "./services/component/UserList";
import Loader from "./services/component/Loader";
import socket from "./services/socket";
function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const lastPacketTime = useRef(0);
  const packetInterval = 500;
  const currentUsersLength = users.length;
  useEffect(() => {
    const handleYourSocketId = (user) => {
      setUser(user);
      setIsLoading(false);
    };
    const handleUserArrive = (newUser) =>
      setUsers((prevUsers) => [...prevUsers, newUser]);
    const handleUserList = (userList) => {
      const sortedUsers = [...userList];
      if (user) {
        sortedUsers.sort((a, b) =>
          a.id === user.id ? -1 : b.id === user.id ? 1 : 0
        );
      }
      setUsers(sortedUsers);
    };
    const handleUserDisconnect = (disconnectedUserID) =>
      setUsers((users) =>
        users.filter((user) => user.id !== disconnectedUserID)
      );

    const handleCursorMove = (data) => {
      console.log("Handle CursorMovement:", data);
      setUsers((prevUsers) =>
        prevUsers.map((other) =>
          other.id === data.user.id ? { ...other, cursor: data.cursor } : other
        )
      );
    };
    socket.on("yourSocketId", handleYourSocketId);
    socket.on("userArrive", handleUserArrive);
    socket.on("userList", handleUserList);
    socket.on("userDisconnect", handleUserDisconnect);
    socket.on("cursorMove", handleCursorMove);
    return () => {
      socket.off("yourSocketId", handleYourSocketId);
      socket.off("userArrive", handleUserArrive);
      socket.off("userList", handleUserList);
      socket.off("userDisconnect", handleUserDisconnect);
      socket.off("cursorMove", handleCursorMove);
    };
  }, [user]);
  // sending it cursor position
  useEffect(() => {
    if (!user) return;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now < lastPacketTime.current + packetInterval) return;
      const cursor = { x: e.clientX, y: e.clientY };
      socket.emit("cursorMove", { user, cursor });
      lastPacketTime.current = now;
    };
    window.addEventListener("mousemove", handleMouseMove, handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [user]);
  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Hello {user?.name}!</h2>

          <UserList users={users} user={user}>
            There are {currentUsersLength} users online...
          </UserList>
          <Editor />
        </>
      )}
    </div>
  );
}

export default App;
