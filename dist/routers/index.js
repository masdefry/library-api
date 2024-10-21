"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_router_1 = __importDefault(require("./sample.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const members_router_1 = __importDefault(require("./members.router"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use('/sample', sample_router_1.default);
router.use('/auth', auth_router_1.default);
router.use('/members', members_router_1.default);
exports.default = router;
