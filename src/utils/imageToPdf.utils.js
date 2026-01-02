import { PDFDocument } from "pdf-lib";
import fs, { readFileSync } from "fs";

export async function imageToPdf(imagesPath, outputPathPdf) {
    try {
        // Creamos pdf en blanco en memoria donde almacenar la imagen
        const pdfDoc = await PDFDocument.create();

        // Leemos el array de imagenes
        for(const imagePath of imagesPath) {
            // Extraemos la extensión de la imagen
            const exstension = imagePath.split(".").pop().toLowerCase();
            let imageNew;

            // Verfifcamos la extension de la imagen
            if(['jpg', 'jpeg'].includes(exstension)) {
                imageNew = await pdfDoc.embedJpg(readFileSync(imagePath));
            } else if(imagePath === 'png') {
                imageNew = await pdfDoc.embedPng(readFileSync(imagePath));
            }

            // Creamos la pagina al tamaño de la imagen
            const page = pdfDoc.addPage([imageNew.width, imageNew.height]);

            // Colocamos la imagen en la pagina
            page.drawImage(imageNew, {
                x: 0,
                y: 0,
                width: imageNew.width,
                height: imageNew.height
            });

            // Guardar el PDF en memoria y escribirlo a disco:
            const pdfBytes = await pdfDoc.save();
            fs.writeFileSync(outputPathPdf, pdfBytes);
        }
    } catch (error) { throw error; }
}


