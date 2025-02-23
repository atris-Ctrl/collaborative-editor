import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = createServer(app);
const connectedUsers = new Map();

const io = new Server(server, {
  cors: {
    origin: /^http:\/\/localhost:\d+$/,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  const cursor = { x: null, y: null };
  const test_user = { id: socket.id, name: ":p" };
  connectedUsers.set(socket.id, test_user, cursor);

  io.emit("userArrive", test_user);
  // Send the list of the connected users to the new client
  socket.emit("yourSocketId", test_user);
  socket.emit("userList", Array.from(connectedUsers.values()));

  socket.on("cursorMove", (data) => {
    console.log("Mouse movement from user:", data);
    socket.broadcast.emit("cursorMove", data);
  });

  socket.on("edit", (content) => {
    // io.emit("edit", content);
    io.emit("updateContent", content);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
    if (connectedUsers.has(socket.id)) {
      const disconnectedUser = connectedUsers.get(socket.id);
      connectedUsers.delete(socket.id);

      // Notify all clients that a user has left
      io.emit("userDisconnect", disconnectedUser.id);
    }
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
