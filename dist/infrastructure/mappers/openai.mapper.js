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
        if (!subject || !topic || !numQuestions || !questions) {
            throw custom_error_1.CustomError.badRequest("Missing required fields in JSON response");
        }
        return new domain_1.OpenAIEntity(subject, topic, numQuestions, questions);
    }
}
exports.OpenAIMapper = OpenAIMapper;
