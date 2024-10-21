"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const members_controller_1 = require("../controllers/members.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', members_controller_1.findMembers);
router.post('/', members_controller_1.createMember);
router.get('/search', members_controller_1.findMember);
exports.default = router;
