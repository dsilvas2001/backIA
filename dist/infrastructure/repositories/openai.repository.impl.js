"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIRepositoryImpl = void 0;
class OpenAIRepositoryImpl {
    constructor(openAIDatasource) {
        this.openAIDatasource = openAIDatasource;
    }
    generateText(openAIDto) {
        return this.openAIDatasource.generateText(openAIDto);
    }
}
exports.OpenAIRepositoryImpl = OpenAIRepositoryImpl;
