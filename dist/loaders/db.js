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
// 필요한 모듈들
const pg_1 = require("pg");
const dayjs_1 = __importDefault(require("dayjs"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// DB Config (유저, 호스트, DB 이름, 패스워드)를 로딩해줍시다.
const index_1 = __importDefault(require("../config/index"));
// NODE_ENV라는 글로벌 환경변수를 사용해서, 현재 환경이 어떤 '모드'인지 판별해줍시다.
const devMode = process.env.NODE_ENV === 'development';
// 서버가 실행되면 현재 환경이 개발 모드(로컬)인지 프로덕션 모드(배포)인지 콘솔에 찍어줍시다.
console.log(`[🔥DB] ${process.env.NODE_ENV}`);
// 커넥션 풀을 생성해줍니다.
const pool = new pg_1.Pool(Object.assign(Object.assign({}, index_1.default), { port: 5432, connectionTimeoutMillis: 60 * 1000, idleTimeoutMillis: 60 * 1000 }));
// 위에서 생성한 커넥션 풀에서 커넥션을 빌려오는 함수를 정의합니다.
// 기본적으로 제공되는 pool.connect()와 pool.connect().release() 함수에 디버깅용 메시지를 추가하는 작업입니다.
const connect = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, dayjs_1.default)();
    const string = !!req && !!req.method
        ? `[${req.method}] ${req.user ? `${req.user.id}` : ``} ${req.originalUrl}\n ${!!req.query && `query: ${JSON.stringify(req.query)}`} ${!!req.body && `body: ${JSON.stringify(req.body)}`} ${!!req.params && `params ${JSON.stringify(req.params)}`}`
        : `request 없음`;
    const callStack = new Error().stack;
    const client = yield pool.connect();
    const query = client.query;
    const release = client.release;
    const releaseChecker = setTimeout(() => {
        console.error('[ERROR] client connection이 15초 동안 릴리즈되지 않았습니다.', { callStack });
    }, 15 * 1000);
    client.release = () => {
        clearTimeout(releaseChecker);
        const time = (0, dayjs_1.default)().diff(now, 'millisecond');
        if (time > 4000) {
            const message = `[RELEASE] in ${time} | ${string}`;
            devMode && console.log(message);
        }
        client.query = query;
        client.release = release;
        return release.apply(client);
    };
    return client;
});
exports.default = {
    connect,
};
//# sourceMappingURL=db.js.map