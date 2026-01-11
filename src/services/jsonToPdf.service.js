import { templateFromHtml } from '../utils/templates/templateFromHtml.js'
import { generatorPDF } from '../utils/pdf-generators/htmlToPdf.js'

class JsonToPdfService {
    constructor() { }

    convertJsonToPdf = async (jsonData) => {
        try {
            let htmlContent;
            switch (jsonData.type_report) {
                case "type_table":
                    htmlContent = await this.#convertToTable(jsonData);
                    break;

                case "type_bar":
                    htmlContent = await this.#convertToGrapics(jsonData);
                    break;

                case "type_pie":
                    htmlContent = await this.#convertToGrapics(jsonData);
                    break;

                default: throw new Error("The type_report writed in the jsonData is not valid");
            }

            return await generatorPDF(htmlContent);

        } catch (error) { throw error; }
    }

    #convertToTable = async (jsonData) => {
        try {
            // si hay filas unicas se hacen sus calculos
            if (jsonData.row_unique && jsonData.row_unique.length > 0) {
                jsonData.row_unique.forEach(unique => {
                    let total = 0;
                    let column_action = unique.column_action;

                    switch (unique.action) {
                        case "sum":
                            jsonData.data.forEach(row => {
                                const value = parseFloat(row[column_action]);
                                if (isNaN(value)) throw new Error("The column_action must be a number");
                                total += value;
                            });
                            unique.result = total;
                            break;

                        case "avg":
                            jsonData.data.forEach(row => {
                                const value = parseFloat(row[column_action]);
                                if (isNaN(value)) throw new Error("The column_action must be a number");
                                total += value;
                            });
                            unique.result = total / jsonData.data.length;
                            break;

                        default: throw new Error("The action writed in the row_unique is not valid");
                    }
                });
            }
            return await templateFromHtml(jsonData);
        } catch (error) { throw error; }
    }

    #convertToGrapics = async (jsonData) => {
        try {
            const labels = jsonData.data.map(data => `${data.title} ${data.number}`);
            const data = jsonData.data.map(data => data.number);
            const type = jsonData.type_report === "type_bar" ? "bar" : "pie";

            return await templateFromHtml(jsonData, {labels, data, type});
        } catch (error) { throw error; }
    }
}

export default JsonToPdfService;