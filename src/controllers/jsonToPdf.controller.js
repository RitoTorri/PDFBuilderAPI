import responses from '../utils/response.utils.js';

class JsonToPdfController {
    constructor(pdfService) {
        this.pdfService = pdfService;
    }

    JsonToPdf = async (req, res) => {
        try {
            const { pdfBuilder } = req.body;
            const pdfBuffer = await this.pdfService.convertJsonToPdf(pdfBuilder);
            responses.responsePdf(res, pdfBuffer);

        } catch (error) {
            console.error('Error al generar el reporte:', error);
            responses.responseError(res, "Error al generar el reporte");
        }
    }
}

export default JsonToPdfController;