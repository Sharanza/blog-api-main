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
exports.Schemas = exports.ValidateJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const logger_1 = __importDefault(require("../utils/logger"));
// regEx string for password
const passReg = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
const ValidateJoi = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body);
            logger_1.default.info(`Validating: ${req.body}`);
            next();
        }
        catch (error) {
            logger_1.default.error(error);
            return res.status(422).json({ error });
        }
    });
};
exports.ValidateJoi = ValidateJoi;
exports.Schemas = {
    user: joi_1.default.object({
        username: joi_1.default.string().alphanum().max(15).required(),
        password: joi_1.default.string().pattern(new RegExp(passReg)).required(),
    }),
    post: joi_1.default.object({
        author: joi_1.default.string().max(15).required(),
        title: joi_1.default.string().max(30).required(),
        body: joi_1.default.string().required(),
        published: joi_1.default.boolean().required(),
        date: joi_1.default.number().required(),
    }),
    update: joi_1.default.object({
        title: joi_1.default.string().max(15).required(),
        body: joi_1.default.string().required(),
        published: joi_1.default.boolean().required(),
    }),
};
