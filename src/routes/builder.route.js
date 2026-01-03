import { Router } from 'express';
import bui from '../controllers/builder.controller.js';
const router = Router();

// importar validadores
import validators from '../validators/builder.validators.js';

// Ruta para convertir una imagen en PDF
router.post('/image/to/pdf', validators.ImageToPdfValidator, bui.ImageToPdf);

export default router;