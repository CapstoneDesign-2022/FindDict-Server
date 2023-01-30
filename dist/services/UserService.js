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
const jwtHandler_1 = __importDefault(require("../modules/jwtHandler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signUpUser = (client, userSignUpDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const encryptedPassword = yield bcryptjs_1.default.hash(userSignUpDto.password, salt);
        const { rows: user } = yield client.query(`
            INSERT INTO "user" (user_id, age, password)
            VALUES ($1, $2, $3)
            RETURNING id
            `, [userSignUpDto.user_id, userSignUpDto.age, encryptedPassword]);
        const accessToken = jwtHandler_1.default.getToken(user[0].id);
        const data = {
            accessToken: accessToken,
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const signInUser = (client, userSignInDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: user } = yield client.query(`
        SELECT *
        FROM "user" as u
        WHERE u.user_id = $1
      `, [userSignInDto.user_id]);
        if (!user[0]) {
            return 'login_failed';
        }
        const isMatch = yield bcryptjs_1.default.compare(userSignInDto.password, user[0].password);
        if (!isMatch) {
            return 'login_failed';
        }
        const accessToken = jwtHandler_1.default.getToken(user[0].id);
        const data = {
            accessToken: accessToken,
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const confirmUserId = (client, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: user } = yield client.query(`
        SELECT *
        FROM "user" as u
        WHERE u.user_id = $1
      `, [userId]);
        if (user[0]) {
            return 'already_exist';
        }
        else {
            return 'available_Id';
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    signUpUser,
    signInUser,
    confirmUserId,
};
//# sourceMappingURL=UserService.js.map