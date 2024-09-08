"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionRoutes = void 0;
const express_1 = require("express");
const infrastructure_1 = require("../../infrastructure");
const functionController_1 = require("./functionController");
class FunctionRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasourceI = new infrastructure_1.FunctionDatasourceImpl();
        const functionRepositoryI = new infrastructure_1.FunctionRepositoryImpl(datasourceI);
        const controller = new functionController_1.FunctionController(functionRepositoryI);
        router.post("/register", controller.registerFunction);
        router.get("/", controller.getAllFunction);
        return router;
    }
}
exports.FunctionRoutes = FunctionRoutes;
//# sourceMappingURL=functionRoutes.js.map