import { Router } from "express";
import {
  StudentEnrollmentDatasourceImpl,
  StudentEnrollmentRepositoryImpl,
} from "../../infrastructure";
import { StudentEnrollmentController } from "./matriculaController";

export class StudentEnrollmentRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new StudentEnrollmentDatasourceImpl();
    const studentEnrollmentRepositoryI = new StudentEnrollmentRepositoryImpl(
      datasourceI
    );
    const controller = new StudentEnrollmentController(
      studentEnrollmentRepositoryI
    );

    router.post("/register", controller.registerStudentEnrollment);

    router.get("/", controller.getAllStudentEnrollment);

    return router;
  }
}
