import { Router } from 'express';
import { WordController } from '../controllers';
import { body } from 'express-validator';
import auth from '../middlewares/auth';
import imageUploader from '../config/multer';
const router = Router();

router.post(
  '/new',
  imageUploader.single('image'),
  [body('words').notEmpty()],
  auth,
  WordController.createWords,
);

router.get('/list', auth, WordController.getWords);

router.get('/detail', auth, WordController.getWordDetails);

router.get("/", WordController.getImage)

export default router;
