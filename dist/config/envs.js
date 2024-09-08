"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = __importDefault(require("env-var"));
console.log(process.env.PORT);
console.log(process.env.MONGO_URL);
exports.envs = {
    PORT: env_var_1.default.get("PORT").required().asPortNumber(),
    MONGO_URL: env_var_1.default.get("MONGO_URL").required().asString(),
    MONGO_DB_NAME: env_var_1.default.get("MONGO_DB_NAME").required().asString(),
    MONGO_USER: env_var_1.default.get("MONGO_USER").required().asString(),
    MONGO_PASS: env_var_1.default.get("MONGO_PASS").required().asString(),
    JWT_SEED: env_var_1.default.get("JWT_SEED").required().asString(),
    OPENAI_API_KEY: env_var_1.default.get("OPENAI_API_KEY").required().asString(),
};
//
