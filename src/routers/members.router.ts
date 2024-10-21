import { findMembers, createMember } from "../controllers/members.controller";
import { Router } from "express";
const router = Router();

router.get('/', findMembers)
router.post('/', createMember)

export default router;