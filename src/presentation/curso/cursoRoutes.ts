import { Router } from "express";
import {
  CourseDatasourceImpl,
  CourseRepositoryImpl,
} from "../../infrastructure";
import { CourseController } from "./cursoController";

export class CourseRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new CourseDatasourceImpl();
    const courseRepositoryI = new CourseRepositoryImpl(datasourceI);
    const controller = new CourseController(courseRepositoryI);

    router.post("/register", controller.registerCourse);

    router.get("/", controller.getAllCourse);
    router.get("/count/", controller.getCountCourse);

    // router.put("/update/:id", controller.updateClient);

    // router.delete("/:id", controller.deleteClient);

    return router;
  }
}
