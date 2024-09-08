"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolRoutes = void 0;
const express_1 = require("express");
const infrastructure_1 = require("../../infrastructure");
const rolController_1 = require("./rolController");
class RolRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasourceI = new infrastructure_1.RolDatasourceImpl();
        const rolRepositoryI = new infrastructure_1.RolRepositoryImpl(datasourceI);
        const controller = new rolController_1.RolController(rolRepositoryI);
        router.post("/register", controller.registerRol);
        router.get("/", controller.getAllRol);
        return router;
    }
}
exports.RolRoutes = RolRoutes;
//# sourceMappingURL=rolRoutes.js.map