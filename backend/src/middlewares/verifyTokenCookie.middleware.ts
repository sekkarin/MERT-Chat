import express, { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
const route = express.Router();

route.use((req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token || undefined;
    jwt.verify(
      token,
      "token-secret",
      (_err: any, decode: string | jwt.JwtPayload | undefined) => {
        if (_err) {
          res.sendStatus(401);
          throw Error("Not have Token from cookie");
        }
        if (typeof decode === "object") {
          req.username = decode?.username;
          req.id = decode?.id;
        }
        next();
      }
    );
  } catch (error) {
    res.sendStatus(500);
  }
});
export default route;
