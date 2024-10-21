import { findMembers, createMember, findMember } from "../controllers/members.controller";
import { Router } from "express";
const router = Router();

router.get('/', findMembers)
router.post('/', createMember)
router.get('/search', findMember)

export default router;