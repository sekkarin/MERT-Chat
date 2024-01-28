import express, { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.schema";
import MessageModel from "../models/message.schema";
import { reviver } from "mathjs";

require("dotenv").config();
const route = express.Router();
// sender: msg.sender,
// text: msg.message,
// recipient: msg.receiver,
route.get("/", async (req: Request, res: Response) => {
  const { sender, receiver } = req.query;
  const messages = await MessageModel.find({
    $or: [
      { sender, recipient: receiver },
      { sender: receiver, recipient: sender },
    ],
  }).limit(10);
  res.status(200).json(messages);
});
export default route;
