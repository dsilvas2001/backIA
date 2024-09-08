export class OpenAIDto {
  private constructor(
    public numOptions: number,
    public numQuestions: number,
    public subject: string,
    public topic: string
  ) {}

  static create(object: { [key: string]: any }): [string?, OpenAIDto?] {
    const { numOptions, numQuestions, subject, topic } = object;

    // Validaciones básicas
    if (!numOptions) return ["Missing numOptions"];
    if (!numQuestions) return ["Missing numQuestions"];
    if (!subject) return ["Missing subject"];
    if (!topic) return ["Missing topic"];

    return [undefined, new OpenAIDto(numOptions, numQuestions, subject, topic)];
  }
}
