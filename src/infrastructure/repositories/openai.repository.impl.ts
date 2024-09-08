import {
  OpenAIDatasource,
  OpenAIDto,
  OpenAIEntity,
  OpenAIRepository,
} from "../../domain";

export class OpenAIRepositoryImpl implements OpenAIRepository {
  constructor(private readonly openAIDatasource: OpenAIDatasource) {}

  generateText(openAIDto: OpenAIDto): Promise<OpenAIEntity> {
    return this.openAIDatasource.generateText(openAIDto);
  }
}
