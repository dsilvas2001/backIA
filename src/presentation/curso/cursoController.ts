import { CourseDto, CourseRepository } from "../../domain";
import { CustomError } from "../../infrastructure";
import { Request, Response } from "express";

export class CourseController {
  constructor(private readonly courseRepository: CourseRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerCourse = async (req: Request, res: Response) => {
    try {
      const [error, courseDto] = CourseDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }
      const course = await this.courseRepository.register(courseDto!);

      res.status(201).json(course);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllCourse = async (req: Request, res: Response) => {
    try {
      const course = await this.courseRepository.findAll();

      res.status(200).json(course);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getCountCourse = async (req: Request, res: Response) => {
    try {
      // Obtener todos los cursos
      const courses = await this.courseRepository.findAll();

      // Contar el número de cursos
      const count = courses.length;

      // Enviar la cantidad de cursos como respuesta
      res.status(200).json({ count });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
