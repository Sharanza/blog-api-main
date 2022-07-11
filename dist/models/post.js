"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    author: String,
    title: String,
    body: String,
    published: Boolean,
    date: Number,
});
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
