import { Router } from "express";
import {
  FunctionDatasourceImpl,
  FunctionRepositoryImpl,
} from "../../infrastructure";
import { FunctionController } from "./functionController";

export class FunctionRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new FunctionDatasourceImpl();
    const functionRepositoryI = new FunctionRepositoryImpl(datasourceI);
    const controller = new FunctionController(functionRepositoryI);

    router.post("/register", controller.registerFunction);

    router.get("/", controller.getAllFunction);

    return router;
  }
}
