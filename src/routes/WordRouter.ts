import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator";
import auth from "../middlewares/auth";
import imageUploader from "../config/multer";
const router = Router();

router.post("/test/image", (req, res) => {
  res.send("goood!");
});

export default router;
