"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utility_1 = __importDefault(require("../controllers/utility"));
const router = (0, express_1.Router)();
// base route is /api
router.get("/healthcheck", utility_1.default.healthCheck);
exports.default = router;
