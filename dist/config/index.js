"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Set the NODE_ENV to 'DEVelopment' by default
process.env.NODE_ENV = process.env.NODE_ENV || "DEVelopment";
// const envFound = dotenv.config();
// if (envFound.error) {
//   // This error should crash whole process
//   throw new Error("⚠️  Couldn't find .env file  ⚠️");
// }
exports.default = {
    /**
     * environment
     */
    env: process.env.NODE_ENV,
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),
    user: process.env.DEV_DB_USER,
    host: process.env.DEV_DB_HOST,
    database: process.env.DEV_DB_DB,
    password: process.env.DEV_DB_PASSWORD,
    /**
     * jwt_secret
     */
    jwtSecret: process.env.JWT_SECRET,
    /**
     * AWS
     */
    awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    /**
     * naver image api
     */
    naverClientId: process.env.NAVER_CLIENT_ID,
    naverClientSecret: process.env.NAVER_CLIENT_SECRET
};
//# sourceMappingURL=index.js.map