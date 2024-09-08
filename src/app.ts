import { env } from "process";
import { MongoDatabase } from "./data";
import { envs } from "./config";
import { Server } from "./presentation";
import { AppRoutes } from "./presentation/routes";
import express from "express";

// (async () => {
//   await main();
// })();

MongoDatabase.connect({
  dbName: envs.MONGO_DB_NAME,
  mongoURL: envs.MONGO_URL,
});

const server = new Server({
  port: envs.PORT,
  routes: AppRoutes.routes,
});

server.start();

// const app = express();
// app.listen(envs.PORT, () => {
//   console.log(`Listen port: ${envs.PORT}`);
// });
