class JsonToPdfService {
    constructor(utils = {}) {
        this.utils = utils;
    }

    convertJsonToPdf = async (jsonData) => {
        const HTMLcontenido = this.utils.templateFromTable(jsonData);
        return await this.utils.generatorPDF(HTMLcontenido);
    }
}

export default JsonToPdfService;