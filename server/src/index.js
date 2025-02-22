// server/src/index.js

import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: /^http:\/\/localhost:\d+$/,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  io.emit("userArrive", { id: socket.id, name: ":p" });

  socket.on("mouseMovement", (data) => {
    console.log("Mouse movement from user:", data);
    io.emit("mouseMovement", { user: ":P", pos: data });
  });

  socket.on("edit", (content) => {
    io.emit("edit", content);
    io.emit("updateContent", content);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
    io.emit("userDisconnect", socket.id);
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
