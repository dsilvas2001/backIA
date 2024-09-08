"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFunctionRoutes = void 0;
const express_1 = require("express");
const infrastructure_1 = require("../../infrastructure");
const userFunctionController_1 = require("./userFunctionController");
class UserFunctionRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasourceI = new infrastructure_1.UserFunctionDatasourceImpl();
        const functionRepositoryI = new infrastructure_1.UserFunctionRepositoryImpl(datasourceI);
        const controller = new userFunctionController_1.UserFunctionController(functionRepositoryI);
        router.post("/register", controller.registerUserFunction);
        router.get("/", controller.getAllUserFunction);
        return router;
    }
}
exports.UserFunctionRoutes = UserFunctionRoutes;
