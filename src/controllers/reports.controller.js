/* 
    Importamos la utilidad de generar el reporte en PDF.
    Importamos la utilidad de generar el HTML.
    Importaos responses
*/
import pdfGenerator from '../utils/pdf.generator.js';
import template1 from '../utils/templates/template1.js';
import responses from '../utils/response.utils.js';


class ReportsController {
    constructor() { }

    /*
        Este controlador se utiliza para crear el reporte con la data ya validada y estructurada.
        Se encarga de enviar esa data al HTML para luego rellenarlo con el contenido que se recibio.
    */
    JsonToPdf = async (req, res) => {
        /* Manejamos errores cno try catch */
        try {
            /*
                Destructuramos la data que se envio desde el cliente.
                El pdfBuilder contiene la data que se desea mostrar en el PDF. Ya esta validada y estructurada.
            */
            const { pdfBuilder } = req.body;

            /* 
                Procedemos a enviar esa data al HTML para rellenarlo con el contenido.
            */
            const HTMLcontenido = template1(pdfBuilder);

            /*
                Con el html recibido, se lo mandamos a puppeteer para generar el PDF.
            */
            const pdfBuffer = await pdfGenerator(HTMLcontenido);

            /*
                Enviamos el PDF al cliente.
            */
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="reporte_providers.pdf"');
            res.send(pdfBuffer);

            responses.responseSuccess(res, "Reporte generado exitosamente");

        } catch (error) {
            console.error('Error al generar el reporte:', error);
            responses.responseError(res, "Error al generar el reporte");
        }
    }
}

export default new ReportsController();