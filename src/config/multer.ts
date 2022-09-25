import s3 from "./s3Config";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "finddict",
    key: (req: Express.Request, file: Express.MulterS3.File, callback: any) => {
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write"
  })
});

export default imageUploader;
