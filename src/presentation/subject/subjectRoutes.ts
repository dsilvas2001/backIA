import { Router } from "express";
import {
  SubjectDatasourceImpl,
  SubjectRepositoryImpl,
} from "../../infrastructure";
import { SubjectController } from "./subjectController";

export class SubjectRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new SubjectDatasourceImpl();
    const rolRepositoryI = new SubjectRepositoryImpl(datasourceI);
    const controller = new SubjectController(rolRepositoryI);

    router.post("/register", controller.registerSuject);

    router.get("/", controller.getAllSubject);

    return router;
  }
}
