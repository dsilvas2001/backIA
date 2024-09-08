import { OpenAIDto } from "../dtos/openai.dto";
import { OpenAIEntity } from "../entities/openai.entity";

export abstract class OpenAIRepository {
  abstract generateText(openIADto: OpenAIDto): Promise<OpenAIEntity>;
}
