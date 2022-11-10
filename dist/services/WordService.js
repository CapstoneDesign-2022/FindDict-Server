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
Object.defineProperty(exports, "__esModule", { value: true });
const createWords = (client, userId, imageURL, wordCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const word of wordCreateDto.words) {
            if (!word.korean || !word.english)
                return 'word_missing';
            yield client.query(`
          INSERT INTO "word" (user_id, korean, english, image_url, is_trap)
          VALUES ($1, $2, $3, $4, $5)
          `, [userId, word.korean, word.english, imageURL, false]);
        }
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
        SELECT w.korean, w.english
        FROM "word" as w
        WHERE w.user_id = $1 and w.is_trap = $2
        ORDER BY w.created_at DESC
          `, [userId, false]);
        const data = {
            words: words,
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    createWords,
    getWords
};
//# sourceMappingURL=WordService.js.map