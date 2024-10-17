"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sample_controller_1 = require("../controllers/sample.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', sample_controller_1.findSample);
exports.default = router;
