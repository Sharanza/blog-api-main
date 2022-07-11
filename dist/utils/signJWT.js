"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("./logger"));
const signJWT = (user, callback) => {
    const { username, password } = user;
    logger_1.default.info(`Attempting to sign token for ${username}`);
    try {
        jsonwebtoken_1.default.sign({ username }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: "HS256",
            expiresIn: "1d",
        }, (error, token) => {
            if (error) {
                {
                    callback(error, null);
                }
            }
            else if (token) {
                {
                    callback(null, token);
                }
            }
        });
    }
    catch (error) {
        logger_1.default.error(error.message, error);
        callback(error, null);
    }
};
exports.default = signJWT;
