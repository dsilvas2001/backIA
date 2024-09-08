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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionDatasourceImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const custom_error_1 = require("../errors/custom.error");
const function_model_1 = require("../../data/mongodb/models/function.model");
const function_mapper_1 = require("../mappers/function.mapper");
class FunctionDatasourceImpl {
    register(functionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { functionName } = functionDto;
            try {
                // verificar si el correo existes
                const exists = yield function_model_1.FunctionModel.findOne({ functionName });
                if (exists)
                    throw custom_error_1.CustomError.badRequest("functions already exists");
                const functions = yield function_model_1.FunctionModel.create({
                    functionName: functionName,
                });
                yield functions.save();
                // guardar
                return function_mapper_1.FunctionMapper.userEntityFromObject(functions);
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
            }
            throw custom_error_1.CustomError.internalServer();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const functions = yield function_model_1.FunctionModel.find();
                if (!functions.length) {
                    throw custom_error_1.CustomError.badRequest("No functions found");
                }
                return functions.map((func) => function_mapper_1.FunctionMapper.userEntityFromObject(func));
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                else if (error instanceof mongoose_1.default.Error) {
                    throw custom_error_1.CustomError.serverUnavailable(error.message);
                }
                else {
                    throw custom_error_1.CustomError.internalServer();
                }
            }
        });
    }
}
exports.FunctionDatasourceImpl = FunctionDatasourceImpl;
//# sourceMappingURL=function.datasource.impl.js.map