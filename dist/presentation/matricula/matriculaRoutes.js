"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentEnrollmentRoutes = void 0;
const express_1 = require("express");
const infrastructure_1 = require("../../infrastructure");
const matriculaController_1 = require("./matriculaController");
class StudentEnrollmentRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasourceI = new infrastructure_1.StudentEnrollmentDatasourceImpl();
        const studentEnrollmentRepositoryI = new infrastructure_1.StudentEnrollmentRepositoryImpl(datasourceI);
        const controller = new matriculaController_1.StudentEnrollmentController(studentEnrollmentRepositoryI);
        router.post("/register", controller.registerStudentEnrollment);
        router.get("/", controller.getAllStudentEnrollment);
        return router;
    }
}
exports.StudentEnrollmentRoutes = StudentEnrollmentRoutes;
//# sourceMappingURL=matriculaRoutes.js.map