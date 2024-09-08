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
exports.StudentEnrollmentDatasourceImpl = void 0;
const matricula_mapper_1 = require("./../mappers/matricula.mapper");
const mongoose_1 = __importDefault(require("mongoose"));
const custom_error_1 = require("../errors/custom.error");
const matricula_model_1 = require("../../data/mongodb/models/matricula.model");
class StudentEnrollmentDatasourceImpl {
    register(studentEnrollmentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId, courseId } = studentEnrollmentDto;
            try {
                const matricula = yield matricula_model_1.studentEnrollmentModel.create({
                    userId: studentId,
                    courseId: courseId,
                });
                yield matricula.save();
                // guardar
                return matricula_mapper_1.StudentEnrollmentMapper.userEntityFromObject(matricula);
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
                const enrollments = yield matricula_model_1.studentEnrollmentModel.find();
                if (!enrollments.length) {
                    throw custom_error_1.CustomError.badRequest("No student enrollments found");
                }
                return enrollments.map((enrollment) => matricula_mapper_1.StudentEnrollmentMapper.userEntityFromObject(enrollment));
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
exports.StudentEnrollmentDatasourceImpl = StudentEnrollmentDatasourceImpl;
