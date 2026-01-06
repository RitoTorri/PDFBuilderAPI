import {templateFromTable} from '../utils/templates/templateFromTable.js'
import {generatorPDF} from '../utils/htmlToPdf.js'

class JsonToPdfService {
    constructor() {}

    convertJsonToPdf = async (jsonData) => {
        const HTMLcontenido = templateFromTable(jsonData);
        return await generatorPDF(HTMLcontenido);
    }
}

export default JsonToPdfService;