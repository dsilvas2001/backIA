import {
  CourseDto,
  CourseRepository,
  FunctionDto,
  FunctionRepository,
  StudentEnrollmentDto,
} from "../../domain";
import { CustomError } from "../../infrastructure";
import { Request, Response } from "express";
import { StudentEnrollmentRepository } from "../../domain/repositories/matricula.repository";

export class StudentEnrollmentController {
  constructor(
    private readonly studentEnrollmentRepository: StudentEnrollmentRepository
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerStudentEnrollment = async (req: Request, res: Response) => {
    try {
      const [error, studentEnrollmentDto] = StudentEnrollmentDto.create(
        req.body
      );

      if (error) {
        return res.status(400).json({ error });
      }
      const course = await this.studentEnrollmentRepository.register(
        studentEnrollmentDto!
      );

      res.status(201).json(course);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllStudentEnrollment = async (req: Request, res: Response) => {
    try {
      const course = await this.studentEnrollmentRepository.findAll();

      res.status(200).json(course);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
