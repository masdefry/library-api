import { createTransaction } from './../controllers/transaction.controller/index';
import { Router } from "express";
const router = Router();

router.post('/', createTransaction)

export default router;