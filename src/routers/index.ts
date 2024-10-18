import sampleRouter from './sample.router';
import authRouter from './auth.router'
import { Router } from 'express';
const router = Router()

router.use('/sample', sampleRouter)
router.use('/auth', authRouter)

export default router; 