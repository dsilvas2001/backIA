import { Request, Response } from "express";
import { CustomError } from "../../infrastructure";
import { UserFunctionDto, UserFunctionRepository } from "../../domain";

export class UserFunctionController {
  constructor(
    private readonly userFunctionRepository: UserFunctionRepository
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUserFunction = async (req: Request, res: Response) => {
    try {
      const [error, userFunctionDto] = UserFunctionDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }
      const userFunction = await this.userFunctionRepository.register(
        userFunctionDto!
      );

      res.status(201).json(userFunction);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllUserFunction = async (req: Request, res: Response) => {
    try {
      const userFunction = await this.userFunctionRepository.findAll();

      res.status(200).json(userFunction);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
