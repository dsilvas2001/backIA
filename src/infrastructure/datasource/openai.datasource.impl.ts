import { envs } from "../../config";
import { model } from "mongoose";
import { OpenAIDatasource } from "../../domain/datasources/openai.datasource";
import { OpenAIMapper } from "../mappers/openai.mapper";
import { CustomError } from "../errors/custom.error";
import { OpenAIDto, OpenAIEntity } from "../../domain";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

export class OpenAIDatasourceImpl implements OpenAIDatasource {
  private openai: OpenAI;
  private responseContent: any;

  constructor() {
    this.openai = new OpenAI({
      apiKey: envs.OPENAI_API_KEY,
    });
  }

  async generateText(openAIDto: OpenAIDto): Promise<OpenAIEntity> {
    const { numOptions, numQuestions, subject, topic } = openAIDto;

    try {
      const OptionsEvent = z.object({
        question: z.string(),
        options: z.array(z.string()),
        correct_answer: z.string(),
      });
      const QuizEvent = z.object({
        subject: z.string(),
        topic: z.string(),
        numQuestions: z.string(),
        questions: z.array(OptionsEvent),
      });

      const completion = await this.openai.beta.chat.completions.parse({
        model: "gpt-4o-mini", // Verifica que el modelo sea válido
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant designed to generate quizzes for college students",
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
        response_format: zodResponseFormat(QuizEvent, "responseContent"),
      });

      this.responseContent = completion.choices[0].message.parsed;

      console.log("Raw Response Content:", this.responseContent);

      return OpenAIMapper.openAIEntityFromObject(this.responseContent);
    } catch (error) {
      console.error("Error details:", error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(
        "Failed to generate text from OpenAI API"
      );
    }
  }
}
