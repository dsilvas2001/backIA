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
exports.UserDatasourceImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../../data/mongodb/models/user.model");
const domain_1 = require("../../domain");
const bcrypts_1 = require("../adapters/bcrypts");
const custom_error_1 = require("../errors/custom.error");
const user_mapper_1 = require("../mappers/user.mapper");
const curso_model_1 = require("../../data/mongodb/models/curso.model");
const user_subject_model_1 = require("../../data/mongodb/models/user-subject.model");
const rol_model_1 = require("../../data/mongodb/models/rol.model");
class UserDatasourceImpl {
    constructor(hashPassword = bcrypts_1.BcryptAdapter.hash, comparePassword = bcrypts_1.BcryptAdapter.compare) {
        this.hashPassword = hashPassword;
        this.comparePassword = comparePassword;
    }
    /**
     *
     * @param userDto
     * @returns
     */
    register(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, roles, courseName } = userDto;
            try {
                // Verificar si el correo existe
                const exists = yield user_model_1.UserModel.findOne({ email });
                if (exists)
                    throw custom_error_1.CustomError.badRequest("email already exists");
                // Buscar el rol basado en el nombre del rol
                const role = yield rol_model_1.RolModel.findOne({ rolName: roles });
                if (!role)
                    throw custom_error_1.CustomError.badRequest("Role not found");
                // Buscar el ID del curso basado en el nombre del curso
                const course = yield curso_model_1.CourseModel.findOne({ courseName: courseName });
                if (!course)
                    throw custom_error_1.CustomError.badRequest("Course not found");
                console.log(course.courseName);
                console.log(course.id);
                // Crear el nuevo usuario con el rol y el curso
                const user = yield user_model_1.UserModel.create({
                    name: name,
                    email: email,
                    password: this.hashPassword(password),
                    roles: role._id, // Asignar el ID del rol encontrado
                });
                // Asociar el usuario con el curso en la tabla userCourse
                yield user_subject_model_1.userSubjectModel.create({
                    userId: user._id,
                    courseId: course._id, // Asignar el ID del curso encontrado
                });
                const userWithCourse = Object.assign(Object.assign({}, user.toObject()), { courseName: course.courseName });
                //
                // Devolver la entidad de usuario creada
                return user_mapper_1.UserMapper.userEntityFromObject(userWithCourse);
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalServer();
            }
        });
    }
    /**
     *
     * @returns
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Encuentra todos los documentos en la colección userSubject
                const userSubjects = yield user_subject_model_1.userSubjectModel
                    .find()
                    .populate({
                    path: "userId", // Referencia al modelo de usuario
                    select: "name email password roles status", // Selecciona los campos necesarios
                    populate: { path: "roles", select: "rolName" }, // Poblamos el rol relacionado
                })
                    .populate({
                    path: "courseId", // Referencia al modelo de curso
                    select: "courseName", // Selecciona el campo 'courseName'
                });
                if (!userSubjects.length) {
                    throw custom_error_1.CustomError.badRequest("No user subjects found");
                }
                return userSubjects.map((userSubject) => {
                    const user = userSubject.userId; // Cast a 'any' to access properties
                    const course = userSubject.courseId; // Cast a 'any' to access properties
                    // Asegúrate de que 'roles' es un objeto que tiene 'rolName'
                    const roleName = user.roles ? user.roles.rolName : "";
                    // Construye la entidad de usuario con la información relacionada
                    return new domain_1.UserEntity(user._id.toString(), user.name, user.email, user.password, roleName, course.courseName, user.status);
                });
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
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userSubject = yield user_subject_model_1.userSubjectModel
                    .findOne({ userId }) // Busca por userId
                    .populate({
                    path: "userId", // Referencia al modelo de usuario
                    select: "name email password roles status", // Selecciona los campos necesarios
                    populate: { path: "roles", select: "rolName" }, // Poblamos el rol relacionado
                })
                    .populate({
                    path: "courseId", // Referencia al modelo de curso
                    select: "courseName", // Selecciona el campo 'courseName'
                });
                if (!userSubject) {
                    throw custom_error_1.CustomError.badRequest("User subject not found");
                }
                const user = userSubject.userId; // Cast a 'any' para acceder a las propiedades
                const course = userSubject.courseId; // Cast a 'any' para acceder a las propiedades
                // Asegúrate de que 'roles' es un objeto que tiene 'rolName'
                const roleName = user.roles ? user.roles.rolName : "";
                // Construye la entidad de usuario con la información relacionada
                return new domain_1.UserEntity(user._id.toString(), user.name, user.email, user.password, roleName, course.courseName, user.status);
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
    /**
     *
     * @param email
     * @param password
     * @returns
     */
    findByCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar al usuario por el correo electrónico
                const user = yield user_model_1.UserModel.findOne({ email });
                if (!user) {
                    throw custom_error_1.CustomError.badRequest("Invalid credentials");
                }
                // Comparar la contraseña proporcionada con la almacenada
                const isPasswordValid = this.comparePassword(password, user.password);
                if (!isPasswordValid) {
                    throw custom_error_1.CustomError.badRequest("Invalid credentials");
                }
                // Si las credenciales son válidas, devolver el usuario
                return user_mapper_1.UserMapper.userAuthEntityFromObject(user);
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                else {
                    throw custom_error_1.CustomError.internalServer();
                }
            }
        });
    }
    update(userId, updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, courseName } = updateDto;
            try {
                // Buscar el usuario por ID
                const user = yield user_model_1.UserModel.findById(userId);
                if (!user)
                    throw custom_error_1.CustomError.badRequest("User not found");
                // Actualizar los campos del usuario
                if (name)
                    user.name = name;
                if (email)
                    user.email = email;
                // Guardar los cambios en la base de datos
                yield user.save();
                // Aquí puedes realizar otras acciones, como actualizar el curso asociado
                // Obtener el usuario actualizado y la asociación con el curso
                const updatedUser = yield user_model_1.UserModel.findById(userId).populate({
                    path: "roles",
                    select: "rolName",
                });
                // Aquí obtienes la información del curso asociado al usuario y lo devuelves
                // ...
                return user_mapper_1.UserMapper.userUpdateEntityFromObject(updatedUser.toObject());
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalServer();
            }
        });
    }
}
exports.UserDatasourceImpl = UserDatasourceImpl;
