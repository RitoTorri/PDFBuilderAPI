import { jsonToPdfController } from '../containers/jsonToPdf.container.js';
import { imageToPdfController } from '../containers/imgToPdf.container.js';

import { Router } from 'express';
const router = Router();

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