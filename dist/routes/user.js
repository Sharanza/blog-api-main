"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const joi_1 = require("../middleware/joi");
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const router = (0, express_1.Router)();
// base route is /api/users
router.get("/", user_1.default.getUsers);
router.get("/validate", extractJWT_1.default, user_1.default.validateToken);
router.get("/:_id", user_1.default.getUser);
router.post("/register", (0, joi_1.ValidateJoi)(joi_1.Schemas.user), user_1.default.register);
router.post("/login", (0, joi_1.ValidateJoi)(joi_1.Schemas.user), user_1.default.login);
exports.default = router;
