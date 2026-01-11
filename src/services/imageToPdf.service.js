import { imageToPdf } from '../utils/pdf-generators/imageToPdf.js'

class ImageToPdfService {
    constructor() { }

    async convertImageToPdf(imagesPath, outputPathPdf) {
        try {
            return await imageToPdf(imagesPath, outputPathPdf);
        } catch (error) { throw error; }
    }
}

export default ImageToPdfService;