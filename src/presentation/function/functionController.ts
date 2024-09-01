import { FunctionDto, FunctionRepository } from "../../domain";
import { CustomError } from "../../infrastructure";
import { Request, Response } from "express";

export class FunctionController {
  constructor(private readonly functionRepository: FunctionRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerFunction = async (req: Request, res: Response) => {
    try {
      const [error, courseDto] = FunctionDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }
      const course = await this.functionRepository.register(courseDto!);

      res.status(201).json(course);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllFunction = async (req: Request, res: Response) => {
    try {
      const course = await this.functionRepository.findAll();

      res.status(200).json(course);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
