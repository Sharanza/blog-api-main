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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const user_1 = __importDefault(require("../models/user"));
const signJWT_1 = __importDefault(require("../utils/signJWT"));
const validateToken = (req, res) => {
    logger_1.default.info("Token validated, user authorized");
    return res
        .status(200)
        .json({ success: true, message: "Token validated, user authorized." });
};
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().select("-password");
        return res.status(200).json({ success: true, users, count: users.length });
    }
    catch (error) {
        const { message } = error;
        logger_1.default.error(message, error);
        res.json({ success: false, message, error });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params).select("-password");
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        const { message } = error;
        logger_1.default.error(message, error);
        res.json({ success: false, message, error });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndUpdate(req.params, req.body, {
            new: true,
        }).select("-password");
        res.send(200).json({ success: true, user });
    }
    catch (error) {
        const { message } = error;
        logger_1.default.error(message, error);
        res.status(500).json({ success: false, message, error });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ username }).exec();
        if (user) {
            const isAuth = yield bcrypt_1.default.compare(password, user.password);
            if (isAuth) {
                (0, signJWT_1.default)(user, (error, token) => {
                    if (error)
                        res.json({ success: false, message: "Unauthorized" });
                    if (token)
                        res.status(200).json({ success: true, token });
                });
            }
            else {
                res.json({ success: false, message: "Unauthorized" });
            }
        }
        else {
            res.json({ success: false, message: "User not found." });
        }
    }
    catch (error) {
        const { message } = error;
        logger_1.default.error(message, error);
        res.status(400).json({ success: false, message, error });
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    const exists = yield user_1.default.findOne({ username }).exec();
    if (exists) {
        console.log("user exists");
        return res.json({ success: false, message: "Username already in use." });
    }
    else {
        bcrypt_1.default.hash(password, 10, (hashError, hash) => {
            if (hashError) {
                return res.json({
                    success: false,
                    message: hashError.message,
                    error: hashError,
                });
            }
            const newUser = new user_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                username,
                password: hash,
            });
            return newUser
                .save()
                .then((user) => res.status(201).json({ success: true }))
                .catch((error) => res.json({ success: false, message: error.message, error }));
        });
    }
});
const controller = { getUsers, getUser, register, login, validateToken };
exports.default = controller;
