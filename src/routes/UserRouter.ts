import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator";

const router = Router();
router.post(
  "/",
  [body("email").notEmpty(), body("age").notEmpty()],
  UserController.createUser
);

export default router;
