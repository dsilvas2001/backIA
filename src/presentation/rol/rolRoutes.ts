import { Router } from "express";
import { RolDatasourceImpl, RolRepositoryImpl } from "../../infrastructure";
import { RolController } from "./rolController";

export class RolRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new RolDatasourceImpl();
    const rolRepositoryI = new RolRepositoryImpl(datasourceI);
    const controller = new RolController(rolRepositoryI);

    router.post("/register", controller.registerRol);

    router.get("/", controller.getAllRol);

    return router;
  }
}
