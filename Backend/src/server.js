import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { setIo } from "./socket/notification.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

setIo(io);

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("register", (userId) => {
    socket.join(`user:${userId}`);

    console.log(
      `User ${userId} joined room user:${userId}`
    );
  });

  socket.on("disconnect", () => {
    console.log(
      `Disconnected: ${socket.id}`
    );
  });
});

server.listen(PORT, () => {
  console.log(
    `TalentBridge API running on port ${PORT}`
  );
});