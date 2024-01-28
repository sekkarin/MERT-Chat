import express, { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.schema";

require("dotenv").config();
const route = express.Router();

route.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username: username,
      passwordHash,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});
route.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ username });
    if (!findUser) return res.status(404).json({ message: "not found user" });
    const passwordCompare = await bcrypt.compare(
      password,
      findUser.passwordHash
    );

    if (!passwordCompare) return res.status(403).json({ message: "Forbidden" });
    const token = jwt.sign(
      {
        username: findUser.username,
        id: findUser.id,
      },
      "token-secret"
    );
    // res.cookie("token", token, {
    //   secure: true,
    //   httpOnly: true,
    //   sameSite: "strict",
    // });
    res.status(200).json({
      id: findUser.id,
      token,
    });
  } catch (error) {
    res.sendStatus(500);
  }
});
route.get("/logout", async (req: Request, res: Response) => {
  res.status(200).json({
    msg: "ok Jaa",
  });
});

export default route;
