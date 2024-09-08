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
exports.RolController = void 0;
const domain_1 = require("../../domain");
const infrastructure_1 = require("../../infrastructure");
class RolController {
    constructor(rolRepository) {
        this.rolRepository = rolRepository;
        this.handleError = (error, res) => {
            if (error instanceof infrastructure_1.CustomError) {
                return res.status(error.statuscode).json({ error: error.message });
            }
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error" });
        };
        this.registerRol = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, rolDto] = domain_1.RolDto.create(req.body);
                if (error) {
                    return res.status(400).json({ error });
                }
                const rol = yield this.rolRepository.register(rolDto);
                res.status(201).json(rol);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        this.getAllRol = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rol = yield this.rolRepository.findAll();
                res.status(200).json(rol);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
}
exports.RolController = RolController;
