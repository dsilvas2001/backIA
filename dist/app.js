"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const config_1 = require("./config");
const routes_1 = require("./presentation/routes");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// (async () => {
//   await main();
// })();
const app = (0, express_1.default)();
data_1.MongoDatabase.connect({
    dbName: config_1.envs.MONGO_DB_NAME,
    mongoURL: config_1.envs.MONGO_URL,
});
// const server = new Server({
//   port: envs.PORT,
//   routes: AppRoutes.routes,
// });
// server.start();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.AppRoutes.routes);
app.listen(config_1.envs.PORT, () => {
    console.log(`Listen port: ${config_1.envs.PORT}`);
});
//# sourceMappingURL=app.js.map