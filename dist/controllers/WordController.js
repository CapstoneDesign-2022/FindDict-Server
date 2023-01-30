"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const util_1 = __importDefault(require("../modules/util"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const db_1 = __importDefault(require("../loaders/db"));
const services_1 = require("../services");
const express_validator_1 = require("express-validator");
/**
 *  @route POST /word/
 *  @desc create word
 *  @access private
 **/
const createWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode_1.default.BAD_REQUEST)
            .send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NULL_VALUE));
    }
    if (!req.file) {
        return res
            .status(statusCode_1.default.BAD_REQUEST)
            .send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NULL_VALUE));
    }
    const image = req.file;
    const { location } = image;
    try {
        client = yield db_1.default.connect(req);
        const wordCreateDto = req.body;
        const userId = req.body.user.id;
        const data = yield services_1.WordService.createWord(client, userId, location, wordCreateDto);
        if (data === 'word_missing') {
            res
                .status(statusCode_1.default.BAD_REQUEST)
                .send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.CREATE_WORD_FAIL));
        }
        else {
            res
                .status(statusCode_1.default.OK)
                .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.CREATE_WORD_SUCCESS));
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
    finally {
        if (client !== undefined)
            client.release();
    }
});
/**
 *  @route GET /word/
 *  @desc get words
 *  @access private
 **/
const getWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode_1.default.BAD_REQUEST)
            .send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NULL_VALUE));
    }
    try {
        client = yield db_1.default.connect(req);
        const userId = req.body.user.id;
        const data = yield services_1.WordService.getWords(client, userId);
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.GET_WORD_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
    finally {
        if (client !== undefined)
            client.release();
    }
});
const getWordDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    try {
        client = yield db_1.default.connect(req);
        const userId = req.body.user.id;
        const word = JSON.stringify(req.query.word).replace(/\"/gi, '');
        const data = yield services_1.WordService.getWordDetails(client, userId, word);
        if (data === 'word_not_stored') {
            res
                .status(statusCode_1.default.NOT_FOUND)
                .send(util_1.default.fail(statusCode_1.default.NOT_FOUND, responseMessage_1.default.WORD_NOT_FOUND));
        }
        else {
            res
                .status(statusCode_1.default.OK)
                .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.GET_WORD_DETAIL_SUCCESS, data));
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
    finally {
        if (client !== undefined)
            client.release();
    }
});
/**
 *  @route GET /image/?search=
 *  @desc get search image
 *  @access private
 **/
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    const word = req.query.search;
    try {
        client = yield db_1.default.connect(req);
        const data = yield services_1.WordService.getImage(word);
        if (data === 'no_images') {
            return res.status(statusCode_1.default.BAD_REQUEST)
                .send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.GET_HINT_IMAGES_FAIL));
        }
        else {
            return res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.GET_HINT_IMAGES_SUCCESS, data));
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
    finally {
        if (client !== undefined)
            client.release();
    }
});
exports.default = {
    createWord,
    getWords,
    getWordDetails,
    getImage
};
//# sourceMappingURL=WordController.js.map