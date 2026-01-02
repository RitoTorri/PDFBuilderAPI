import { Router } from 'express';
import builderController from '../controllers/builder.controller.js';
const router = Router();

// Ruta para convertir una imagen en PDF
router.post('/image/to/pdf', builderController.imageToPdf);

export default router;