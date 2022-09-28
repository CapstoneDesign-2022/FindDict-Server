import s3 from "./s3Config";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { Request } from "express";

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "finddict",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req: Request, file: Express.MulterS3.File, callback: any) => {
      const uploadDirectory = req.query.directory ?? "";
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: "public-read"
  })
});

export default imageUploader;
