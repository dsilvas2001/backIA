import { env } from "process";
import { MongoDatabase } from "./data";
import { envs } from "./config";
import { Server } from "./presentation";
import { AppRoutes } from "./presentation/routes";

// (async () => {
//   await main();
// })();

async function main() {
  try {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoURL: envs.MONGO_URL,
    });

    const server = new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
    });

    server.start();
  } catch (err) {
    console.log(err);
  }
}

main();
