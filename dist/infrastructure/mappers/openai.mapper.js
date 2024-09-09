"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIMapper = void 0;
const domain_1 = require("../../domain");
const custom_error_1 = require("../errors/custom.error");
// export class OpenAIMapper {
//   static openAIEntityFromObject(object: { [key: string]: any }) {
//     const { _id, prompt } = object;
//     if (!prompt) throw CustomError.badRequest("Missings text");
//     return new OpenAIEntity(_id, prompt);
//   }
// }
class OpenAIMapper {
    static openAIEntityFromObject(object) {
        const { subject, topic, numQuestions, questions } = object;
        // Verificar si todos los campos necesarios están presentes
        if (!subject || !topic || !numQuestions || !questions) {
            // Determinar qué campos faltan
            const missingFields = [];
            if (!subject)
                missingFields.push("subject");
            if (!topic)
                missingFields.push("topic");
            if (!numQuestions)
                missingFields.push("numQuestions");
            if (!questions)
                missingFields.push("questions");
            // Lanzar un error con los campos faltantes especificados
            throw custom_error_1.CustomError.badRequest(`Missing required fields in JSON response: ${missingFields.join(", ")}`);
        }
        // Crear una instancia de OpenAIEntity
        return new domain_1.OpenAIEntity(subject, topic, numQuestions, questions);
    }
}
exports.OpenAIMapper = OpenAIMapper;
//# sourceMappingURL=openai.mapper.js.map