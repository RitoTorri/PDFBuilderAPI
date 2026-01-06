import servicesJsonToPdf from '../services/jsonToPdf.service.js';
import controllerJsonToPdf from '../controllers/jsonToPdf.controller.js';

import { generatorPDF } from '../utils/jsonToPdf.js';
import { templateFromTable } from '../utils/templates/templateFromTable.js';

let utils = {
    generatorPDF,
    templateFromTable
};

const pdfService = new servicesJsonToPdf(utils);
const jsonToPdfController = new controllerJsonToPdf(pdfService);

export { jsonToPdfController };