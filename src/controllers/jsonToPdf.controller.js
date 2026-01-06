import responses from '../utils/response.utils.js';
import JsonToPdfServices from '../services/jsonToPdf.service.js'

const pdfService = new JsonToPdfServices();

class JsonToPdfController {
    constructor() {}

    JsonToPdf = async (req, res) => {
        try {
            const { pdfBuilder } = req.body;
            const pdfBuffer = await pdfService.convertJsonToPdf(pdfBuilder);
            responses.responsePdf(res, pdfBuffer);

        } catch (error) {
            console.error('Error al generar el reporte:', error);
            responses.responseError(res, "Error al generar el reporte");
        }
    }
}

export default JsonToPdfController;