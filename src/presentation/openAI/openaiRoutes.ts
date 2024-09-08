import { Router } from "express";
import {
  OpenAIDatasourceImpl,
  OpenAIRepositoryImpl,
} from "../../infrastructure";
import { OpenAIController } from "./openaiController";

export class OpenAIRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new OpenAIDatasourceImpl();
    const openAIRepositoryI = new OpenAIRepositoryImpl(datasourceI);
    const controller = new OpenAIController(openAIRepositoryI);

    router.post("/prompt", controller.generateText);

    return router;
  }
}
