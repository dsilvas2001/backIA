"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
// (async () => {
//   await main();
// })();
// function main() {
//   try {
//     MongoDatabase.connect({
//       dbName: envs.MONGO_DB_NAME,
//       mongoURL: envs.MONGO_URL,
//     });
//     const server = new Server({
//       port: envs.PORT,
//       routes: AppRoutes.routes,
//     });
//     server.start();
//   } catch (err) {
//     console.log(err);
//   }
// }
const app = (0, express_1.default)();
app.listen(config_1.envs.PORT, () => {
    console.log(`Listen port: ${config_1.envs.PORT}`);
});
