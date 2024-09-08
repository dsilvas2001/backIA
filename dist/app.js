"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const config_1 = require("./config");
const presentation_1 = require("./presentation");
const routes_1 = require("./presentation/routes");
// (async () => {
//   await main();
// })();
data_1.MongoDatabase.connect({
    dbName: config_1.envs.MONGO_DB_NAME,
    mongoURL: config_1.envs.MONGO_URL,
});
const server = new presentation_1.Server({
    port: config_1.envs.PORT,
    routes: routes_1.AppRoutes.routes,
});
server.start();
// const app = express();
// app.listen(envs.PORT, () => {
//   console.log(`Listen port: ${envs.PORT}`);
// });
