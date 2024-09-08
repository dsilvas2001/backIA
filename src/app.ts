import { env } from "process";
import { MongoDatabase } from "./data";
import { envs } from "./config";
import { Server } from "./presentation";
import { AppRoutes } from "./presentation/routes";
import express from "express";
import cors from "cors";

// (async () => {
//   await main();
// })();

const app = express();

MongoDatabase.connect({
  dbName: envs.MONGO_DB_NAME,
  mongoURL: envs.MONGO_URL,
});

// const server = new Server({
//   port: envs.PORT,
//   routes: AppRoutes.routes,
// });

// server.start();

app.use(cors());
app.use(express.json());
app.use(AppRoutes.routes);

app.listen(envs.PORT, () => {
  console.log(`Listen port: ${envs.PORT}`);
});
