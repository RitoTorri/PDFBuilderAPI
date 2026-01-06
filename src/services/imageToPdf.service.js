class ImageToPdfService {
    constructor(imageToPdf) { 
        this.imageToPdf = imageToPdf;
    }

    async convertImageToPdf(imagesPath, outputPathPdf) {
        try {
            return await this.imageToPdf(imagesPath, outputPathPdf);
        } catch (error) { throw error; }
    }
}

export default ImageToPdfService;