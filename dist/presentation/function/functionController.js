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
exports.FunctionController = void 0;
const domain_1 = require("../../domain");
const infrastructure_1 = require("../../infrastructure");
class FunctionController {
    constructor(functionRepository) {
        this.functionRepository = functionRepository;
        this.handleError = (error, res) => {
            if (error instanceof infrastructure_1.CustomError) {
                return res.status(error.statuscode).json({ error: error.message });
            }
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error" });
        };
        this.registerFunction = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, courseDto] = domain_1.FunctionDto.create(req.body);
                if (error) {
                    return res.status(400).json({ error });
                }
                const course = yield this.functionRepository.register(courseDto);
                res.status(201).json(course);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        this.getAllFunction = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield this.functionRepository.findAll();
                res.status(200).json(course);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
}
exports.FunctionController = FunctionController;
