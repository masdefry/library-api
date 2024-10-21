import sampleRouter from './sample.router';
import authRouter from './auth.router'
import membersRouter from './members.router';
import transactionRouter from './transactions.router'
import { Router } from 'express';
const router = Router()

router.use('/sample', sampleRouter)
router.use('/auth', authRouter)
router.use('/members', membersRouter)
router.use('/transactions', transactionRouter)

export default router; 