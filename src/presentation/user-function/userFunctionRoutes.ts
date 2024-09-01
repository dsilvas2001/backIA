import { Router } from "express";
import {
  UserFunctionDatasourceImpl,
  UserFunctionRepositoryImpl,
} from "../../infrastructure";
import { UserFunctionController } from "./userFunctionController";

export class UserFunctionRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new UserFunctionDatasourceImpl();
    const functionRepositoryI = new UserFunctionRepositoryImpl(datasourceI);
    const controller = new UserFunctionController(functionRepositoryI);

    router.post("/register", controller.registerUserFunction);

    router.get("/", controller.getAllUserFunction);

    return router;
  }
}
