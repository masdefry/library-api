import { auth } from "../controllers/auth.controller";
import { Router } from "express";
const router = Router()

router.post('/', auth)

export default router;