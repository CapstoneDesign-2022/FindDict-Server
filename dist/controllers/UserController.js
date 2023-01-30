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
 *  @route POST /user/
 *  @desc create user
 *  @access public
 **/
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode_1.default.BAD_REQUEST)
            .send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NULL_VALUE));
    }
    try {
        client = yield db_1.default.connect(req);
        const userSignUpDto = req.body;
        const data = yield services_1.UserService.signUpUser(client, userSignUpDto);
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.CREATE_USER_SUCCESS, data));
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
 *  @route POST /user/
 *  @desc sign in user
 *  @access public
 **/
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode_1.default.BAD_REQUEST)
            .send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NULL_VALUE));
    }
    try {
        client = yield db_1.default.connect(req);
        const userSignInDto = req.body;
        const data = yield services_1.UserService.signInUser(client, userSignInDto);
        if (data === 'login_failed') {
            res
                .status(statusCode_1.default.UNAUTHORIZED)
                .send(util_1.default.fail(statusCode_1.default.UNAUTHORIZED, responseMessage_1.default.SIGNIN_FAIL));
        }
        else {
            res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.SIGNIN_SUCCESS, data));
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
const confirmUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    try {
        client = yield db_1.default.connect(req);
        const userId = JSON.stringify(req.query.user_id).replace(/\"/gi, '');
        const data = yield services_1.UserService.confirmUserId(client, userId);
        if (data === 'available_Id') {
            res
                .status(statusCode_1.default.OK)
                .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.AVAILABLE_USER_ID));
        }
        else {
            res
                .status(statusCode_1.default.CONFLICT)
                .send(util_1.default.success(statusCode_1.default.CONFLICT, responseMessage_1.default.ID_ALREADY_EXISTS));
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
    signUpUser,
    signInUser,
    confirmUserId
};
//# sourceMappingURL=UserController.js.map