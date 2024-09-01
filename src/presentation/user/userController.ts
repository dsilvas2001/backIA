import { Request, Response } from "express";
import { UserDto, UserRepository } from "../../domain";
import { CustomError } from "../../infrastructure";
import { JwtAdapter } from "../../infrastructure/adapters/jwt";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = async (req: Request, res: Response) => {
    try {
      const [error, userDto] = UserDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }
      const user = await this.userRepository.register(userDto!);

      res.status(201).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userRepository.findAll();

      res.status(200).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      // Obtener el ID del usuario de los parámetros de la solicitud
      const userId = req.params.id;

      // Obtener el cuerpo de la solicitud
      const [error, userDto] = UserDto.update(req.body);

      if (error) {
        return res.status(400).json({ error });
      }

      // Actualizar el usuario
      const updatedUser = await this.userRepository.update(userId, userDto!);

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  // Inicio de sesión del usuario
  findByCredentials = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findByCredentials(email, password);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      console.log(user.roles);

      // Generar el token JWT
      const token = await JwtAdapter.generateToken({
        id: user.id,
        roles: user.roles,
      });

      res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
