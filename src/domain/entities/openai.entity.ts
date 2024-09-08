// export class OpenAIEntity {
//   constructor(public id: string, public prompt: string) {}
// }

export class OpenAIEntity {
  constructor(
    public subject: string,
    public topic: string,
    public numQuestions: number,
    public questions: { question: string; options: string[] }[]
  ) {}
}
