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
  static openAIEntityFromObject(object: { [key: string]: any }): OpenAIEntity {
    const { subject, topic, numQuestions, questions } = object;

    // Verificar si todos los campos necesarios están presentes
    if (!subject || !topic || !numQuestions || !questions) {
      // Determinar qué campos faltan
      const missingFields = [];
      if (!subject) missingFields.push("subject");
      if (!topic) missingFields.push("topic");
      if (!numQuestions) missingFields.push("numQuestions");
      if (!questions) missingFields.push("questions");

      // Lanzar un error con los campos faltantes especificados
      throw CustomError.badRequest(
        `Missing required fields in JSON response: ${missingFields.join(", ")}`
      );
    }

    // Crear una instancia de OpenAIEntity
    return new OpenAIEntity(subject, topic, numQuestions, questions);
  }
}
