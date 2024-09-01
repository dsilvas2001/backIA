import { Router } from "express";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { UserController } from "./userController";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new UserDatasourceImpl();
    const studentEnrollmentRepositoryI = new UserRepositoryImpl(datasourceI);
    const controller = new UserController(studentEnrollmentRepositoryI);

    router.post("/register", controller.registerUser);

    router.get("/", controller.getAllUser);

    router.put("/update/:id", controller.updateUser);

    router.get("/:userId", controller.getUserById);

    router.post("/auth", controller.findByCredentials);

    return router;
  }
}
