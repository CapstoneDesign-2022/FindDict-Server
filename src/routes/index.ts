//router index file
import { Router } from "express";
import UserRouter from "./UserRouter";
import WordRouter from "./WordRouter";
const router = Router();

router.use("/auth", UserRouter);

router.use("/word", WordRouter);
export default router;
