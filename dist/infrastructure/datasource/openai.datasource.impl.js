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
class OpenAIDatasourceImpl {
    constructor() {
        this.openai = new openai_1.default({
            apiKey: config_1.envs.OPENAI_API_KEY,
        });
    }
    generateText(openAIDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { numOptions, numQuestions, subject, topic } = openAIDto;
            try {
                const completion = yield this.openai.chat.completions.create({
                    model: "gpt-4o-mini", // Verifica que el modelo sea válido
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant designed to generate quizzes in a specific JSON format. Please only display the JSON output without any additional explanations or comments.",
                        },
                        {
                            role: "user",
                            content: `Please generate a JSON structure for a quiz with the following details:
            - Subject: ${subject}
            - Topic: ${topic}
            - Number of questions: ${numQuestions}
            - Number of options per question: ${numOptions}
  
            The JSON format should be:
            {
              "subject": "subject_name",
              "topic": "topic_name",
              "numQuestions": numQuestions,
              "questions": [
                {
                  "question": "question_text",
                  "options": ["option1", "option2", "option3", "option4"],
                  "correct_answer": "correct_option"

                },
                ...
              ]
            }
  
            Ensure that each question has the specified number of options and is formatted correctly in the JSON response.`,
                        },
                    ],
                });
                const responseContent = (_a = completion.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
                console.log("Raw Response Content:", responseContent);
                // Manejo de respuesta en texto plano
                if (!responseContent || typeof responseContent !== "string") {
                    throw new Error("Invalid response from OpenAI API: Content is missing or not a string.");
                }
                // Intenta analizar el contenido JSON
                let parsedContent;
                try {
                    parsedContent = JSON.parse(responseContent);
                }
                catch (jsonError) {
                    throw new Error("Failhed to parse JSON response: " + jsonError);
                }
                console.log("Parsed Content:", parsedContent);
                return openai_mapper_1.OpenAIMapper.openAIEntityFromObject(parsedContent);
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
