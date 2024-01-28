import express, { Response, Request } from "express";
import jwtVerify from "../middlewares/verifyTokenCookie.middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.schema";

require("dotenv").config();
const route = express.Router();

route.get("", jwtVerify, async (req: Request, res: Response) => {
  try {
    res.status(200).json({ msg: "test" });
  } catch (error) {
    res.sendStatus(500);
  }
});

export default route;
