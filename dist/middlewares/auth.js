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
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const util_1 = __importDefault(require("../modules/util"));
const db_1 = __importDefault(require("../loaders/db"));
const jwtHandler_1 = __importDefault(require("../modules/jwtHandler"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ").reverse()[0];
    if (!token) {
        return res
            .status(statusCode_1.default.UNAUTHORIZED)
            .send(util_1.default.fail(statusCode_1.default.UNAUTHORIZED, responseMessage_1.default.NULL_VALUE_TOKEN));
    }
    let client;
    try {
        client = yield db_1.default.connect(req);
        const decoded = jwtHandler_1.default.verifyToken(token);
        if (decoded === "expired_token")
            return res
                .status(statusCode_1.default.UNAUTHORIZED)
                .send(util_1.default.fail(statusCode_1.default.UNAUTHORIZED, responseMessage_1.default.EXPIRED_TOKEN));
        if (decoded === "invalid_token")
            return res
                .status(statusCode_1.default.UNAUTHORIZED)
                .send(util_1.default.fail(statusCode_1.default.UNAUTHORIZED, responseMessage_1.default.EXPIRED_TOKEN));
        const user = decoded.user;
        req.body.user = user;
        next();
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
//# sourceMappingURL=auth.js.map