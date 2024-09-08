"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIDto = void 0;
class OpenAIDto {
    constructor(numOptions, numQuestions, subject, topic) {
        this.numOptions = numOptions;
        this.numQuestions = numQuestions;
        this.subject = subject;
        this.topic = topic;
    }
    static create(object) {
        const { numOptions, numQuestions, subject, topic } = object;
        // Validaciones básicas
        if (!numOptions)
            return ["Missing numOptions"];
        if (!numQuestions)
            return ["Missing numQuestions"];
        if (!subject)
            return ["Missing subject"];
        if (!topic)
            return ["Missing topic"];
        return [undefined, new OpenAIDto(numOptions, numQuestions, subject, topic)];
    }
}
exports.OpenAIDto = OpenAIDto;
