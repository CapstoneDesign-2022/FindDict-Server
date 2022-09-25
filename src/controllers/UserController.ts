import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { Request, Response } from "express";
import message from "../modules/responseMessage";
import db from "../loaders/db";
import { UserCreateDto, UserUpdateDto } from "../interfaces/IUser";
import { UserService } from "../services";
import { validationResult } from "express-validator";

/**
 *  @route POST /user/
 *  @desc create user
 *  @access public
 **/

const createUser = async (req: Request, res: Response) => {
  let client;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }
  // const userId = req.body.user.id;
  try {
    client = await db.connect(req);
    const userCreateDto: UserCreateDto = req.body;
    const data = await UserService.createUser(client, userCreateDto);
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.CREATE_USER_SUCCESS, data));
  } catch (error) {
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

const updateUser = async (req: Request, res: Response) => {
  let client;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }
  // const userId = req.body.user.id;
  try {
    client = await db.connect(req);
    const userUpdateDto: UserUpdateDto = req.body;
    console.log("req.body", req.body);
    const userId = req.body.user.id;
    const data = await UserService.updateUser(client, userUpdateDto, userId);
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.UPDATE_USER_SUCCESS, data));
  } catch (error) {
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

export default {
  createUser,
  updateUser
};
