"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIDatasourceImpl = void 0;
const config_1 = require("../../config");
const openai_mapper_1 = require("../mappers/openai.mapper");
const custom_error_1 = require("../errors/custom.error");
const openai_1 = __importDefault(require("openai"));
const zod_1 = require("zod");
const zod_2 = require("openai/helpers/zod");
class OpenAIDatasourceImpl {
    constructor() {
        this.openai = new openai_1.default({
            apiKey: config_1.envs.OPENAI_API_KEY,
        });
    }
    generateText(openAIDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numOptions, numQuestions, subject, topic } = openAIDto;
            try {
                const OptionsEvent = zod_1.z.object({
                    question: zod_1.z.string(),
                    options: zod_1.z.array(zod_1.z.string()),
                    correct_answer: zod_1.z.string(),
                });
                const QuizEvent = zod_1.z.object({
                    subject: zod_1.z.string(),
                    topic: zod_1.z.string(),
                    numQuestions: zod_1.z.string(),
                    questions: zod_1.z.array(OptionsEvent),
                });
                const completion = yield this.openai.beta.chat.completions.parse({
                    model: "gpt-4o-mini", // Verifica que el modelo sea válido
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant designed to generate quizzes for college students",
                        },
                        {
                            role: "user",
                            content: `Please generate  a quiz with the following details con su respuesta:
            - Subject: ${subject}
            - Topic: ${topic}
            - Number of questions: ${numQuestions}
            - Number of options per question: ${numOptions}`,
                        },
                    ],
                    response_format: (0, zod_2.zodResponseFormat)(QuizEvent, "responseContent"),
                });
                this.responseContent = completion.choices[0].message.parsed;
                console.log("Raw Response Content:", this.responseContent);
                return openai_mapper_1.OpenAIMapper.openAIEntityFromObject(this.responseContent);
            }
            catch (error) {
                console.error("Error details:", error);
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalServer("Failed to generate text from OpenAI API");
            }
        });
    }
}
exports.OpenAIDatasourceImpl = OpenAIDatasourceImpl;
//# sourceMappingURL=openai.datasource.impl.js.map