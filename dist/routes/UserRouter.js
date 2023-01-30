"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/signUp", [
    (0, express_validator_1.body)("user_id").notEmpty(),
    (0, express_validator_1.body)("age").notEmpty(),
    (0, express_validator_1.body)("password").notEmpty()
], controllers_1.UserController.signUpUser);
router.post("/signIn", [
    (0, express_validator_1.body)("user_id").notEmpty(),
    (0, express_validator_1.body)("password").notEmpty()
], controllers_1.UserController.signInUser);
router.get("/confirmId", [(0, express_validator_1.body)("user_id").notEmpty()], controllers_1.UserController.confirmUserId);
exports.default = router;
//# sourceMappingURL=UserRouter.js.map