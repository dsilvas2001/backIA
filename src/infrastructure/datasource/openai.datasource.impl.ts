import { envs } from "../../config";
import { model } from "mongoose";
import { OpenAIDatasource } from "../../domain/datasources/openai.datasource";
import { OpenAIMapper } from "../mappers/openai.mapper";
import { CustomError } from "../errors/custom.error";
import { OpenAIDto, OpenAIEntity } from "../../domain";
import OpenAI from "openai";

export class OpenAIDatasourceImpl implements OpenAIDatasource {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: envs.OPENAI_API_KEY,
    });
  }

  async generateText(openAIDto: OpenAIDto): Promise<OpenAIEntity> {
    const { numOptions, numQuestions, subject, topic } = openAIDto;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini", // Verifica que el modelo sea válido
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant designed to generate quizzes in a specific JSON format. Please only display the JSON output without any additional explanations or comments.",
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

      const responseContent = completion.choices[0].message?.content;

      console.log("Raw Response Content:", responseContent);

      // Manejo de respuesta en texto plano
      if (!responseContent || typeof responseContent !== "string") {
        throw new Error(
          "Invalid response from OpenAI API: Content is missing or not a string."
        );
      }

      // Intenta analizar el contenido JSON
      let parsedContent;
      try {
        parsedContent = JSON.parse(responseContent);
      } catch (jsonError) {
        throw new Error("Failhed to parse JSON response: " + jsonError);
      }

      console.log("Parsed Content:", parsedContent);

      return OpenAIMapper.openAIEntityFromObject(parsedContent);
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
