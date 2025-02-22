// client/src/services/socket.js
import { io } from "socket.io-client";

// TODO-1: Initialize Socket.IO client with proper configuration
const socket = io("http://localhost:3001", { reconnectionDelayMax: 10000 });
socket.io.on("connect", () => {
  console.log("connected to server", socket.id);
});
// TODO-2: Add connection error handling
socket.io.on("connect_error", (error) => {
  console.error("Connection error:", error.message);
});
// TODO-3: Add reconnection logic
socket.on("reconnect_attempt", (attempt) => {
  console.log(`Reconnection attempt #${attempt}`);
});
socket.io.on("reconnect", (attempt) => {
  console.log(`Successfully reconnected on attempt #${attempt}`);
});
export default socket;
