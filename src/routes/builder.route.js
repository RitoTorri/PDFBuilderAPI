import JsonToPdfController from '../controllers/jsonToPdf.controller.js';
import ImageToPdfController from '../controllers/imageToPdf.controller.js';
import { Router } from 'express';

const router = Router();
const jsonToPdfController = new JsonToPdfController();
const imageToPdfController = new ImageToPdfController();

// Importar validadores
import validatorsToImage from '../validators/imageToPdf.validators.js';

router.post('/image/to/pdf',
    validatorsToImage,
    imageToPdfController.ImageToPdf
);

router.post('/json/to/pdf',
    jsonToPdfController.JsonToPdf
);

export default router;