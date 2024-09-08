"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const infrastructure_1 = require("../../infrastructure");
const userController_1 = require("./userController");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasourceI = new infrastructure_1.UserDatasourceImpl();
        const studentEnrollmentRepositoryI = new infrastructure_1.UserRepositoryImpl(datasourceI);
        const controller = new userController_1.UserController(studentEnrollmentRepositoryI);
        router.post("/register", controller.registerUser);
        router.get("/", controller.getAllUser);
        router.get("/count/", controller.getCountUser);
        router.put("/update/:id", controller.updateUser);
        router.get("/:userId", controller.getUserById);
        router.post("/auth", controller.findByCredentials);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=userRoutes.js.map