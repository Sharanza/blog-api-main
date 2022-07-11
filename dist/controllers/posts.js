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
const post_1 = __importDefault(require("../models/post"));
const logger_1 = __importDefault(require("../utils/logger"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find().exec();
        res.status(200).json({ success: true, posts, count: posts.length });
    }
    catch (error) {
        const { message } = error;
        logger_1.default.error(message, error);
        res.json({ success: false, message, error });
    }
});
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.default.findById(req.params).exec();
        res.status(200).json({ success: true, post });
    }
    catch (error) {
        const { message } = error;
        logger_1.default.error(message, error);
        res.json({ success: false, message, error });
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = req.body;
    console.log(newPost);
    try {
        const post = yield post_1.default.create(newPost);
        post.save();
        res.status(200).json({ success: true });
    }
    catch (error) {
        const { message } = error;
        logger_1.default.error(message, error);
        res.json({ success: false, message, error });
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(req.body);
        const updated = yield post_1.default.findByIdAndUpdate(req.params, req.body).exec();
        logger_1.default.info(updated._doc);
        res.status(200).json({ success: true });
    }
    catch (error) {
        const { message } = error;
        logger_1.default.error(message, error);
        res.json({ success: false, message, error });
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield post_1.default.findByIdAndDelete(req.params);
        logger_1.default.info(deleted._doc);
        res.status(200).json({ success: true });
    }
    catch (error) {
        const { message } = error;
        logger_1.default.error(message, error);
        res.status(500).json({ success: false, message, error });
    }
});
const controller = { getPosts, getPost, createPost, updatePost, deletePost };
exports.default = controller;
