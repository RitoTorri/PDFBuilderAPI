import responses from '../utils/response.utils.js';
import ImageToPdfService from '../services/imageToPdf.service.js';

const imageToPdfService = new ImageToPdfService();

class ImageToPdfController {
    constructor() { }

    ImageToPdf = async (req, res) => {
        try {
            const { imagesPath, outputPathPdf } = req.body;
            await imageToPdfService.convertImageToPdf(imagesPath, outputPathPdf);
            responses.responseSuccess(res, 'Image converted to PDF in path: ' + outputPathPdf);

        } catch (error) {
            return error.message.includes('ENOENT')
                ? responses.responseNotFound(res, error.message)
                : responses.responseErrorInternal(res, error.message);
        }
    }
}

export default ImageToPdfController