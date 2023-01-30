"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const getToken = (userId) => {
    const payload = {
        user: {
            id: userId
        }
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, {
        expiresIn: "14d"
    });
    return accessToken;
};
const verifyToken = (token) => {
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        return decoded;
    }
    catch (error) {
        console.log(error);
        if (error.message === "jwt expired") {
            return "expired_token";
        }
        else {
            return "invalid_token";
        }
    }
};
exports.default = { getToken, verifyToken };
//# sourceMappingURL=jwtHandler.js.map