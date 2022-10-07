import statusCode from '../modules/statusCode';
import util from '../modules/util';
import { Request, Response } from 'express';
import message from '../modules/responseMessage';
import db from '../loaders/db';
import { WordCreateDto } from '../interfaces/IWord';
import { WordService } from '../services';
import { validationResult } from 'express-validator';

/**
 *  @route POST /word/
 *  @desc create words
 *  @access private
 **/

const createWords = async (req: Request, res: Response) => {
  let client;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }
  if (!req.file) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }
  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const { location } = image;
  try {
    client = await db.connect(req);
    const wordCreateDto: WordCreateDto = req.body;
    wordCreateDto.words = JSON.parse(req.body.words);
    const userId = req.body.user.id;
    const data = await WordService.createWords(client, userId, location, wordCreateDto);
    if (data === 'word_missing') {
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.success(statusCode.BAD_REQUEST, message.CREATE_WORD_FAIL, data));
    } else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.CREATE_WORD_SUCCESS, data));
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

export default {
  createWords,
};
