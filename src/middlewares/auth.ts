import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import db from "../loaders/db";
import jwtHandler from "../modules/jwtHandler";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ").reverse()[0];
  if (!token) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .send(util.fail(statusCode.UNAUTHORIZED, message.NULL_VALUE_TOKEN));
  }
  let client;

  try {
    client = await db.connect(req);

    const decoded = jwtHandler.verifyToken(token);
    if (decoded === "expired_token")
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(util.fail(statusCode.UNAUTHORIZED, message.EXPIRED_TOKEN));

    if (decoded === "invalid_token")
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(util.fail(statusCode.UNAUTHORIZED, message.EXPIRED_TOKEN));

    const user = (decoded as any).user;

    req.body.user = user;
    next();
  } catch (error: any) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  } finally {
    if (client !== undefined) client.release();
  }
};
