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
exports.CourseDatasourceImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const custom_error_1 = require("../errors/custom.error");
const curso_model_1 = require("../../data/mongodb/models/curso.model");
const curso_mapper_1 = require("../mappers/curso.mapper");
class CourseDatasourceImpl {
    register(courseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { courseName } = courseDto;
            try {
                // verificar si el correo existes
                const exists = yield curso_model_1.CourseModel.findOne({ courseName });
                if (exists)
                    throw custom_error_1.CustomError.badRequest("Course already exists");
                const course = yield curso_model_1.CourseModel.create({
                    courseName: courseName,
                });
                yield course.save();
                // guardar
                return curso_mapper_1.CourseMapper.userEntityFromObject(course);
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
                const courses = yield curso_model_1.CourseModel.find();
                if (!courses.length) {
                    throw custom_error_1.CustomError.badRequest("No courses found");
                }
                return courses.map((course) => curso_mapper_1.CourseMapper.userEntityFromObject(course));
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
exports.CourseDatasourceImpl = CourseDatasourceImpl;
//# sourceMappingURL=course.datasource.impl.js.map