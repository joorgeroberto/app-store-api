import { Router } from 'express';
import { AppController } from './controllers/AppController';
import multer from 'multer'
import { optionsImage } from './middlewares/multer';

const router = Router();

const appController = new AppController();

router.get("/apps", appController.find);
router.post("/apps-create", appController.create);
router.post("/apps/:id/create-screenshots", multer(optionsImage).array("file", 3), appController.createScreenshots);
router.post("/apps/:id/create-icon", multer(optionsImage).single("file"), appController.createIcon);

export { router };