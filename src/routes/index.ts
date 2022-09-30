//router index file
import { Router } from "express";
import UserRouter from "./UserRouter";

const router = Router();

router.use("/auth", UserRouter);

export default router;
