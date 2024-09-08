import { OpenAIEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";

// export class OpenAIMapper {
//   static openAIEntityFromObject(object: { [key: string]: any }) {
//     const { _id, prompt } = object;

//     if (!prompt) throw CustomError.badRequest("Missings text");

//     return new OpenAIEntity(_id, prompt);
//   }
// }

export class OpenAIMapper {
  static openAIEntityFromObject(object: { [key: string]: any }) {
    const { subject, topic, numQuestions, questions } = object;

    if (!subject || !topic || !numQuestions || !questions) {
      throw CustomError.badRequest("Missing required fields in JSON response");
    }

    return new OpenAIEntity(subject, topic, numQuestions, questions);
  }
}
