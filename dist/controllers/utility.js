"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const healthCheck = (req, res) => res.sendStatus(200);
const controller = { healthCheck };
exports.default = controller;
