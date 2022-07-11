"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const extractJWT = (req, res, next) => {
    var _a;
    logger_1.default.info("Validating Token");
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, (error, decoded) => {
            if (error) {
                const { message } = error;
                return res.json({ success: false, message, error });
            }
            else {
                res.locals.jwt = decoded;
                logger_1.default.info(`Valid Token`);
                next();
            }
        });
    }
    else {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};
exports.default = extractJWT;
