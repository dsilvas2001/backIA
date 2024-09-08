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
exports.UserSubjectImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_subject_model_1 = require("../../data/mongodb/models/user-subject.model");
const custom_error_1 = require("../errors/custom.error");
const user_subject_mapper_1 = require("../mappers/user-subject.mapper");
class UserSubjectImpl {
    register(userSubjectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, subjectId } = userSubjectDto;
            try {
                const userSubject = yield user_subject_model_1.userSubjectModel.create({
                    userId: userId,
                    functionId: subjectId,
                });
                yield userSubject.save();
                // guardar
                return user_subject_mapper_1.UserSubjectMapper.userEntityFromObject(userSubject);
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
                const userSubject = yield user_subject_model_1.userSubjectModel.find();
                if (!userSubject.length) {
                    throw custom_error_1.CustomError.badRequest("No  userSubject found");
                }
                return userSubject.map((userSubject) => user_subject_mapper_1.UserSubjectMapper.userEntityFromObject(userSubject));
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
exports.UserSubjectImpl = UserSubjectImpl;
