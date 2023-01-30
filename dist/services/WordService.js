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
const request = require('request');
const config_1 = __importDefault(require("../config"));
const createWord = (client, userId, imageURL, wordCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!wordCreateDto.english)
            return 'word_missing';
        yield client.query(`
          INSERT INTO "word" (user_id, english, image_url, is_trap)
          VALUES ($1, $2, $3, $4)
          `, [userId, wordCreateDto.english, imageURL, false]);
        return 'successfully_stored';
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getWords = (client, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: words } = yield client.query(`
        SELECT w.english
        FROM "word" as w
        WHERE w.user_id = $1 and w.is_trap = $2
        ORDER BY w.created_at DESC
          `, [userId, false]);
        const english = words.map((word) => word.english);
        const data = {
            english: english,
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getWordDetails = (client, userId, word) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: urls } = yield client.query(`
        SELECT w.image_url
        FROM "word" as w
        WHERE w.user_id = $1 and w.english = $2
        ORDER BY w.created_at DESC
      `, [userId, word]);
        if (!urls[0]) {
            return 'word_not_stored';
        }
        const data = {
            urls: urls,
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getImage = (word) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client_id = config_1.default.naverClientId;
        const client_secret = config_1.default.naverClientSecret;
        const option = {
            query: word,
            start: 1,
            display: 4,
            sort: 'sim',
            filter: 'small',
        };
        const options = {
            uri: 'https://openapi.naver.com/v1/search/image',
            qs: option,
            headers: {
                'X-Naver-Client-Id': client_id,
                'X-Naver-Client-Secret': client_secret,
            },
        };
        return new Promise((resolve, reject) => {
            request.get(options, (error, response, body) => {
                if (error)
                    reject(error);
                const images = JSON.parse(body);
                if (!images.items || images.items.length < 4) {
                    resolve('no_images');
                }
                else {
                    const data = images.items.map((image) => {
                        return image.link;
                    });
                    resolve({
                        images: data
                    });
                }
            });
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    createWord,
    getWords,
    getWordDetails,
    getImage,
};
//# sourceMappingURL=WordService.js.map