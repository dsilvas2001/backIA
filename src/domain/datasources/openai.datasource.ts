import { OpenAIDto } from "../dtos/openai.dto";
import { OpenAIEntity } from "../entities/openai.entity";

export abstract class OpenAIDatasource {
  abstract generateText(openIADto: OpenAIDto): Promise<OpenAIEntity>;
}
