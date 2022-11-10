import statusCode from '../modules/statusCode';
import util from '../modules/util';
import { Request, Response } from 'express';
import message from '../modules/responseMessage';
import db from '../loaders/db';
import { UserSignUpDto, UserSignInDto, UserConfirmIdDto } from '../interfaces/IUser';
import { UserService } from '../services';
import { validationResult } from 'express-validator';

/**
 *  @route POST /user/
 *  @desc create user
 *  @access public
 **/

const signUpUser = async (req: Request, res: Response) => {
  let client;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  try {
    client = await db.connect(req);
    const userSignUpDto: UserSignUpDto = req.body;
    const data = await UserService.signUpUser(client, userSignUpDto);
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.CREATE_USER_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  } finally {
    if (client !== undefined) client.release();
  }
};

/**
 *  @route POST /user/
 *  @desc sign in user
 *  @access public
 **/

const signInUser = async (req: Request, res: Response) => {
  let client;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  try {
    client = await db.connect(req);
    const userSignInDto: UserSignInDto = req.body;
    const data = await UserService.signInUser(client, userSignInDto);
    if (data === 'login_failed') {
      res
        .status(statusCode.UNAUTHORIZED)
        .send(util.fail(statusCode.UNAUTHORIZED, message.SIGNIN_FAIL));
    } else {
      res.status(statusCode.OK).send(util.success(statusCode.OK, message.SIGNIN_SUCCESS, data));
    }
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  } finally {
    if (client !== undefined) client.release();
  }
};

const confirmUserId = async (req: Request, res: Response) => {
  let client;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
    .status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  try {
    client = await db.connect(req);
    const userConfirmIdDto: UserConfirmIdDto = req.body;
    const data = await UserService.confirmUserId(client, userConfirmIdDto);
    if (data === 'available_Id') {
      res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.AVAILABLE_USER_ID));
    } else {
      res
      .status(statusCode.CONFLICT)
      .send(util.success(statusCode.CONFLICT, message.ID_ALREADY_EXISTS));
    }
  } catch(error) {
    console.log(error);
    res
    .status(statusCode.INTERNAL_SERVER_ERROR)
    .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  } finally {
    if (client !== undefined) client.release();
  }
}

export default {
  signUpUser,
  signInUser,
  confirmUserId
};
