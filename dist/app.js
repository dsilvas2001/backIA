"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const config_1 = require("./config");
const presentation_1 = require("./presentation");
const routes_1 = require("./presentation/routes");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield data_1.MongoDatabase.connect({
            dbName: config_1.envs.MONGO_DB_NAME,
            mongoURL: config_1.envs.MONGO_URL,
        });
        new presentation_1.Server({
            port: config_1.envs.PORT,
            routes: routes_1.AppRoutes.routes,
        }).start();
    });
}
