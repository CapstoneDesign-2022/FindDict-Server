"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middlewares/auth"));
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
router.post("/new", multer_1.default.single("image"), [(0, express_validator_1.body)("words").notEmpty()], auth_1.default, controllers_1.WordController.createWords);
router.get("/list", auth_1.default, controllers_1.WordController.getWords);
exports.default = router;
//# sourceMappingURL=WordRouter.js.map