"use strict";
// export class OpenAIEntity {
//   constructor(public id: string, public prompt: string) {}
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIEntity = void 0;
class OpenAIEntity {
    constructor(subject, topic, numQuestions, questions) {
        this.subject = subject;
        this.topic = topic;
        this.numQuestions = numQuestions;
        this.questions = questions;
    }
}
exports.OpenAIEntity = OpenAIEntity;
