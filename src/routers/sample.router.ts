import { findSample } from '../controllers/sample.controller';
import {Router} from 'express';
const router = Router()

router.get('/', findSample)

export default router;