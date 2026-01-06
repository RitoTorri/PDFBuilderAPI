import responses from '../utils/response.utils.js';

class ImageToPdfController {
    constructor(ImageToPdfService) {
        this.ImageToPdfService = ImageToPdfService;
    }

    ImageToPdf = async (req, res) => {
        try {
            const { imagesPath, outputPathPdf } = req.body;
            await this.ImageToPdfService.convertImageToPdf(imagesPath, outputPathPdf);
            responses.responseSuccess(res, 'Image converted to PDF in path: ' + outputPathPdf);

        } catch (error) {
            return error.message.includes('ENOENT')
                ? responses.responseNotFound(res, error.message)
                : responses.responseErrorInternal(res, error.message);
        }
    }
}

export default ImageToPdfController