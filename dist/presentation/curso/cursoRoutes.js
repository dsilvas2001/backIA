"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = require("express");
const infrastructure_1 = require("../../infrastructure");
const cursoController_1 = require("./cursoController");
class CourseRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasourceI = new infrastructure_1.CourseDatasourceImpl();
        const courseRepositoryI = new infrastructure_1.CourseRepositoryImpl(datasourceI);
        const controller = new cursoController_1.CourseController(courseRepositoryI);
        router.post("/register", controller.registerCourse);
        router.get("/", controller.getAllCourse);
        router.get("/count/", controller.getCountCourse);
        // router.put("/update/:id", controller.updateClient);
        // router.delete("/:id", controller.deleteClient);
        return router;
    }
}
exports.CourseRoutes = CourseRoutes;
//# sourceMappingURL=cursoRoutes.js.map