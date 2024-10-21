import sampleRouter from './sample.router';
import authRouter from './auth.router'
import membersRouter from './members.router';
import { Router } from 'express';
const router = Router()

router.use('/sample', sampleRouter)
router.use('/auth', authRouter)
router.use('/members', membersRouter)

export default router; 