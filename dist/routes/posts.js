"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = __importDefault(require("../controllers/posts"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const joi_1 = require("../middleware/joi");
const router = (0, express_1.Router)();
// base route is /api/posts
router.get("/", posts_1.default.getPosts);
router.get("/:_id", posts_1.default.getPost);
router.post("/", (0, joi_1.ValidateJoi)(joi_1.Schemas.post), extractJWT_1.default, posts_1.default.createPost);
router.put("/:_id", (0, joi_1.ValidateJoi)(joi_1.Schemas.update), extractJWT_1.default, posts_1.default.updatePost);
router.delete("/:_id", extractJWT_1.default, posts_1.default.deletePost);
exports.default = router;
