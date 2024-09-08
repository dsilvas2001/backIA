import { env } from "process";
import { MongoDatabase } from "./data";
import { envs } from "./config";
import { Server } from "./presentation";
import { AppRoutes } from "./presentation/routes";

// (async () => {
//   await main();
// })();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoURL: envs.MONGO_URL,
  });

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}

main();
