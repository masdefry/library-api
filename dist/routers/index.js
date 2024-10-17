"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_router_1 = __importDefault(require("./sample.router"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use('/sample', sample_router_1.default);
exports.default = router;
