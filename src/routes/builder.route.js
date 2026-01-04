import { Router } from 'express';
import bui from '../controllers/imageToPdf.controller.js';
import reports from '../controllers/reports.controller.js';
const router = Router();

// importar validadores
import validatorsToImage from '../validators/imageToPdf.validators.js';

// Ruta para convertir una imagen en PDF
router.post('/image/to/pdf', validatorsToImage, bui.ImageToPdf);

router.post('/json/to/pdf', reports.JsonToPdf);

export default router;