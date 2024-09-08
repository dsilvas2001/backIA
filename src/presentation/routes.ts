import { Router } from "express";
import { CourseRoutes } from "./curso/cursoRoutes";
import { StudentEnrollmentRoutes } from "./matricula/matriculaRoutes";
import { FunctionRoutes } from "./function/functionRoutes";
import { UserRoutes } from "./user/userRoutes";
import { RolRoutes } from "./rol/rolRoutes";
import { UserFunctionRoutes } from "./user-function/userFunctionRoutes";
import { SubjectRoutes } from "./subject/subjectRoutes";
import { OpenAIRoutes } from "./openAI/openaiRoutes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/function", FunctionRoutes.routes);
    router.use("/user-function", UserFunctionRoutes.routes);
    router.use("/rol", RolRoutes.routes);
    /** */
    router.use("/curso", CourseRoutes.routes);
    router.use("/materia", SubjectRoutes.routes); //materia vea curso
    router.use("/matricula", StudentEnrollmentRoutes.routes); //materia-user
    router.use("/user", UserRoutes.routes);

    //
    router.use("/openAI", OpenAIRoutes.routes);

    return router;
  }
}
