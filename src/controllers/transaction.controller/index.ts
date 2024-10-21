import { Request, Response } from "express";
import db from "../../connection";
import {promisify} from 'util';
import { addDays } from "date-fns";
const query = promisify(db.query).bind(db)
import { format } from "date-fns";

export const createTransaction = async(req: Request, res: Response) => {
    try {
        const {members_id, staffs_id, books_id} = req.body 

        await query({
            sql: 'Start Transaction'
        })

        const findTransactionMemberByDate = await query({
            sql: 'SELECT * FROM transactions WHERE members_id = ? ORDER BY created_at DESC LIMIT 1',
            values: [members_id]
        })

        if(findTransactionMemberByDate.length){
            const transactionMember = format(findTransactionMemberByDate[0].created_at, 'yyyy-MM-dd')
            const dateNow = format(new Date(), 'yyyy-MM-dd')
            
            if(transactionMember === dateNow) throw {msg: 'Transaction Limit Exceeded'}
        }

        if(books_id.length > 5) throw {msg: 'Books Limit Exceeded'}

        const createTransaction: any = await query({
            sql: 'INSERT INTO transactions(due_date, members_id, staffs_id) VALUES(?, ?, ?)',
            values: [addDays(new Date(), 3), members_id, staffs_id]
        })

        const insertBooks = books_id?.map((book) => {
            return [createTransaction.insertId, book]
        })

        await query({
            sql: 'INSERT INTO transaction_detailsss(transactions_id, books_id) VALUES ?', 
            values: [insertBooks]
        })

        await query({
            sql: 'Commit'
        })

        res.status(201).json({
            error: false, 
            message: 'Transaction Success', 
            data: {}
        })
    } catch (error: any) {
        res.status(500).json({
            error: true, 
            message: error.message, 
            data: {}
        })
    }
}