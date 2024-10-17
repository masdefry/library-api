import sampleRouter from './sample.router';
import { Router } from 'express';
const router = Router()

router.use('/sample', sampleRouter)

export default router; 