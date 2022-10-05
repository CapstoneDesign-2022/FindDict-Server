import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator";
import auth from "../middlewares/auth";
const router = Router();

router.post(
  "/signUp",
  [
    body("user_id").notEmpty(),
    body("age").notEmpty(),
    body("password").notEmpty()
  ],
  UserController.signUpUser
);

router.get(
  "/signIn",
  [body("user_id").notEmpty(), body("password").notEmpty()],
  UserController.signInUser
);

router.get(
  "/confirmId",
  [body("user_id").notEmpty()],
  UserController.confirmUserId
)

export default router;
