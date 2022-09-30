import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator";
import auth from "../middlewares/auth";
const router = Router();

router.post(
  "/",
  [body("email").notEmpty(), body("age").notEmpty()],
  UserController.createUser
);

router.patch("/", [body("age").notEmpty()], auth, UserController.updateUser);

router.get(
  "/signIn",
  [body("email").notEmpty(), body("password").notEmpty()],
  UserController.signInUser
);

export default router;
