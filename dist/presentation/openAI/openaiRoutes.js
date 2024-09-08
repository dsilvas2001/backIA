"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIRoutes = void 0;
const express_1 = require("express");
const infrastructure_1 = require("../../infrastructure");
const openaiController_1 = require("./openaiController");
class OpenAIRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasourceI = new infrastructure_1.OpenAIDatasourceImpl();
        const openAIRepositoryI = new infrastructure_1.OpenAIRepositoryImpl(datasourceI);
        const controller = new openaiController_1.OpenAIController(openAIRepositoryI);
        router.post("/prompt", controller.generateText);
        return router;
    }
}
exports.OpenAIRoutes = OpenAIRoutes;
