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
exports.UserController = void 0;
const domain_1 = require("../../domain");
const infrastructure_1 = require("../../infrastructure");
const jwt_1 = require("../../infrastructure/adapters/jwt");
class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.handleError = (error, res) => {
            if (error instanceof infrastructure_1.CustomError) {
                return res.status(error.statuscode).json({ error: error.message });
            }
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error" });
        };
        /**
         *
         * @param req
         * @param res
         * @returns
         */
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, userDto] = domain_1.UserDto.create(req.body);
                if (error) {
                    return res.status(400).json({ error });
                }
                const user = yield this.userRepository.register(userDto);
                res.status(201).json(user);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        this.getAllUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findAll();
                res.status(200).json(user);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        this.getCountUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findAll();
                const count = user.length;
                res.status(200).json({ count });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params; // Obtén el ID del usuario desde los parámetros de la URL
                const user = yield this.userRepository.findById(userId);
                // Devuelve la información del usuario con un estado 200 OK
                res.status(200).json(user);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener el ID del usuario de los parámetros de la solicitud
                const userId = req.params.id;
                // Obtener el cuerpo de la solicitud
                const [error, userDto] = domain_1.UserDto.update(req.body);
                if (error) {
                    return res.status(400).json({ error });
                }
                // Actualizar el usuario
                const updatedUser = yield this.userRepository.update(userId, userDto);
                if (!updatedUser) {
                    return res.status(404).json({ error: "User not found" });
                }
                res.status(200).json(updatedUser);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        // Inicio de sesión del usuario
        this.findByCredentials = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userRepository.findByCredentials(email, password);
                if (!user) {
                    return res.status(401).json({ error: "Invalid credentials" });
                }
                // Generar el token JWT
                const token = yield jwt_1.JwtAdapter.generateToken({
                    id: user.id,
                    email: user.email,
                });
                console.log("User Object:", user);
                res.status(200).json({
                    email: user.email,
                    password: user.password,
                    token,
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
}
exports.UserController = UserController;
