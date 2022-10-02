import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator";
import auth from "../middlewares/auth";
const router = Router();

router.post(
  "/signUp",
  [
    body("email").notEmpty(),
    body("age").notEmpty(),
    body("password").notEmpty()
  ],
  UserController.createUser
);

router.get(
  "/signIn",
  [body("email").notEmpty(), body("password").notEmpty()],
  UserController.signInUser
);

export default router;
