import { RolDto, RolRepository } from "../../domain";
import { CustomError } from "../../infrastructure";
import { Request, Response } from "express";

export class RolController {
  constructor(private readonly rolRepository: RolRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerRol = async (req: Request, res: Response) => {
    try {
      const [error, rolDto] = RolDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }
      const rol = await this.rolRepository.register(rolDto!);

      res.status(201).json(rol);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllRol = async (req: Request, res: Response) => {
    try {
      const rol = await this.rolRepository.findAll();

      res.status(200).json(rol);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
