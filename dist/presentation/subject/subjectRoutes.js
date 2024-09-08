"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectRoutes = void 0;
const express_1 = require("express");
const infrastructure_1 = require("../../infrastructure");
const subjectController_1 = require("./subjectController");
class SubjectRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasourceI = new infrastructure_1.SubjectDatasourceImpl();
        const rolRepositoryI = new infrastructure_1.SubjectRepositoryImpl(datasourceI);
        const controller = new subjectController_1.SubjectController(rolRepositoryI);
        router.post("/register", controller.registerSuject);
        router.get("/", controller.getAllSubject);
        return router;
    }
}
exports.SubjectRoutes = SubjectRoutes;
//# sourceMappingURL=subjectRoutes.js.map