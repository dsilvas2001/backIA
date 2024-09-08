"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const cursoRoutes_1 = require("./curso/cursoRoutes");
const matriculaRoutes_1 = require("./matricula/matriculaRoutes");
const functionRoutes_1 = require("./function/functionRoutes");
const userRoutes_1 = require("./user/userRoutes");
const rolRoutes_1 = require("./rol/rolRoutes");
const userFunctionRoutes_1 = require("./user-function/userFunctionRoutes");
const subjectRoutes_1 = require("./subject/subjectRoutes");
const openaiRoutes_1 = require("./openAI/openaiRoutes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/function", functionRoutes_1.FunctionRoutes.routes);
        router.use("/user-function", userFunctionRoutes_1.UserFunctionRoutes.routes);
        router.use("/rol", rolRoutes_1.RolRoutes.routes);
        /** */
        router.use("/curso", cursoRoutes_1.CourseRoutes.routes);
        router.use("/materia", subjectRoutes_1.SubjectRoutes.routes); //materia vea curso
        router.use("/matricula", matriculaRoutes_1.StudentEnrollmentRoutes.routes); //materia-user
        router.use("/user", userRoutes_1.UserRoutes.routes);
        /**
         *
         */
        router.use("/openAI", openaiRoutes_1.OpenAIRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=routes.js.map