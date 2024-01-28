import express, { Response, Request } from "express";
import { createServer } from "node:http";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import authRoute from "./routers/auth.route";
import profileRoute from "./routers/profile.route";
import userRoute from "./routers/user.route";
import messageRoute from "./routers/message.route";
import MessageModel from "./models/message.schema";
require("dotenv").config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/chats";

interface PayloadMessage {
  message: string;
  sender: string;
  receiver: string;
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/auth", authRoute);
app.use("/messages", messageRoute);
app.use("/users", userRoute);

server.listen(PORT, () => {
  console.log("server started ", PORT);
});

io.on("connection", (socket) => {
  console.log("client connect");

  socket.on("chat message", async (msg: PayloadMessage) => {
    console.log("message: " + msg.sender,msg.receiver);
    const saveMessage = await MessageModel.create({
      sender: msg.sender,
      text: msg.message,
      recipient: msg.receiver,
    });
    io.emit("chat message", saveMessage);
  });
});

try {
  mongoose.connect(MONGO_URL).then((_) => {
    console.log("mongoose connection success");
  });
} catch (error) {
  console.log("mongoose not connection success");
}
