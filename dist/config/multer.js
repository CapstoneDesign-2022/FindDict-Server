"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s3Config_1 = __importDefault(require("./s3Config"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = __importDefault(require("path"));
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];
const imageUploader = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3Config_1.default,
        bucket: "finddict",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        key: (req, file, callback) => {
            var _a;
            const uploadDirectory = (_a = req.query.directory) !== null && _a !== void 0 ? _a : "";
            const extension = path_1.default.extname(file.originalname);
            if (!allowedExtensions.includes(extension)) {
                return callback(new Error("wrong extension"));
            }
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
        },
        acl: "public-read"
    })
});
exports.default = imageUploader;
//# sourceMappingURL=multer.js.map