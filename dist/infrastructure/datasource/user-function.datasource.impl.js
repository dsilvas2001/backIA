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
exports.UserFunctionDatasourceImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_function_model_1 = require("../../data/mongodb/models/user-function.model");
const custom_error_1 = require("../errors/custom.error");
const user_function_mapper_1 = require("../mappers/user-function.mapper");
//
class UserFunctionDatasourceImpl {
    register(userFunctionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, functionId } = userFunctionDto;
            try {
                const userFunction = yield user_function_model_1.UserFunctionModel.create({
                    userId: userId,
                    functionId: functionId,
                });
                yield userFunction.save();
                // guardar
                return user_function_mapper_1.UserFunctionMapper.userEntityFromObject(userFunction);
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
                const userFunctions = yield user_function_model_1.UserFunctionModel.find()
                    .populate("userId", "rolName") // Esto agrega el campo 'rolName' del modelo Rol
                    .populate("functionId", "functionName"); // Esto agrega el campo 'functName' del modelo Function
                if (!userFunctions.length) {
                    throw custom_error_1.CustomError.badRequest("No userFunction found");
                }
                return userFunctions.map((userFunction) => user_function_mapper_1.UserFunctionMapper.userEntityFromObject(userFunction));
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
exports.UserFunctionDatasourceImpl = UserFunctionDatasourceImpl;
//# sourceMappingURL=user-function.datasource.impl.js.map