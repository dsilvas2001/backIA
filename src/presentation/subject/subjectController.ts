import { SubjectDto, SubjectRepository } from "../../domain";
import { CustomError } from "../../infrastructure";
import { Request, Response } from "express";

export class SubjectController {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerSuject = async (req: Request, res: Response) => {
    try {
      const [error, subjectDto] = SubjectDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }
      const subject = await this.subjectRepository.register(subjectDto!);

      res.status(201).json(subject);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllSubject = async (req: Request, res: Response) => {
    try {
      const subject = await this.subjectRepository.findAll();

      res.status(200).json(subject);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
