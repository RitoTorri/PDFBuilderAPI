import responses from '../utils/response.utils.js';

const ImageToPdfValidator = (req, res, next) => {
    const { imagesPath, outputPathPdf } = req.body;
    let message = '';

    if (!imagesPath || !outputPathPdf) message = 'You must provide both imagesPath and outputPathPdf.';

    if (imagesPath.length === 0) message = 'imagesPath cannot be empty.';

    if (outputPathPdf.length === 0) message = 'outputPathPdf cannot be empty.';

    imagesPath.forEach(path => {
        if(!path.endsWith('.jpg') && !path.endsWith('.jpeg') && !path.endsWith('.png'))
            message = 'imagesPath must be a valid image file. Only .jpg, .jpeg and .png extension is allowed.';
    });

    if(!outputPathPdf.endsWith('.pdf'))
         message = 'outputPathPdf must be a valid PDF file. Only .pdf extension is allowed.';

    if (message !== '') return responses.responseError(res, message);
    next();
}

export default { ImageToPdfValidator };
