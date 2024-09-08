import { OpenAIDto, OpenAIRepository } from "../../domain";
import { CustomError } from "../../infrastructure";
import { Request, Response } from "express";

export class OpenAIController {
  constructor(private readonly openAIRepository: OpenAIRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  generateText = async (req: Request, res: Response) => {
    try {
      const [error, openAIDto] = OpenAIDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }
      const course = await this.openAIRepository.generateText(openAIDto!);

      res.status(201).json(course);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
