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

export default router;
