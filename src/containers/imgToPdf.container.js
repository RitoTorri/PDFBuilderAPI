import controllerImageToPdf from '../controllers/imageToPdf.controller.js';
import servicesImageToPdf from '../services/imageToPdf.service.js';

import { imageToPdf } from '../utils/imageToPdf.utils.js';

const pdfService = new servicesImageToPdf(imageToPdf);
const imageToPdfController = new controllerImageToPdf(pdfService);

export { imageToPdfController };