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
 *  @desc create words
 *  @access private
 **/
const createWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        wordCreateDto.words = JSON.parse(req.body.words);
        const userId = req.body.user.id;
        const data = yield services_1.WordService.createWords(client, userId, location, wordCreateDto);
        if (data === 'word_missing') {
            res
                .status(statusCode_1.default.BAD_REQUEST)
                .send(util_1.default.success(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.CREATE_WORD_FAIL, data));
        }
        else {
            res
                .status(statusCode_1.default.OK)
                .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.CREATE_WORD_SUCCESS, data));
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
exports.default = {
    createWords,
    getWords,
};
//# sourceMappingURL=WordController.js.map