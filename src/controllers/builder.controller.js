import { imageToPdf } from '../utils/imageToPdf.utils.js';
import responses from '../utils/response.utils.js';

class BuilderController {
    constructor(){}

    // Función para convertir una imagen en PDF
    imageToPdf = async (req, res) => {
        try {
            /*
                - imagesPath: Array de rutas de las imágenes a convertir
                - outputPathPdf: Ruta donde guardar el PDF resultante + Nombre del PDF y extension

                Ejemplo del JSON que se recibe desde el cliente:
                {
                    "imagesPath" : ["C:\\Users\\Jesus Cortez\\Pictures\\WhatsApp Image 2026-01-01 at 12.33.35 AM.jpeg"],
                    "outputPathPdf" : "C:\\Users\\Jesus Cortez\\Documents\\Michi.pdf"
                }
            */
            const { imagesPath, outputPathPdf } = req.body;
            await imageToPdf(imagesPath, outputPathPdf);
            responses.responseSuccess(res, 'Image converted to PDF in path: ' + outputPathPdf);

        } catch (error) {
            console.log(error.message);
            responses.responseError(res, error.message);
        }
    }
}

export default new BuilderController();