import { Request, Response } from "express";
import db from "../../connection";
import {promisify} from 'util';
const query = promisify(db.query).bind(db)
import { v4 as uuidv4 } from 'uuid';

export const findMembers = async(req: Request, res: Response) => {
    try {
        const {page = 1, limit_data = 2} = req.query

        // limit_data * (page-1)
        // 2 * (1-1) = 0
        // 2 * (2-1) = 2
        // 2 * (3-1) = 4
        const offset = Number(limit_data) * (Number(page)-1)

        const members = await query({
            sql: 'SELECT * FROM members LIMIT ? OFFSET ?', 
            values: [Number(limit_data), offset]
        })

        const totalData: any = await query({
            sql: 'SELECT COUNT(*) as totalData  FROM members'
        })

        const totalPage = Math.ceil(totalData[0].totalData/Number(limit_data))

        res.status(200).json({
            error: false, 
            message: 'Get Members Success', 
            data: {members, totalPage}
        })
    } catch (error: any) {
        console.log(error)
        res.status(error.status || 500).json({
            error: true, 
            message: error.msg || 'Something Went Wrong!', 
            data: {}
        })
    }
}

export const createMember = async(req: Request, res: Response) => {
    try {
        const { first_name, last_name, address, phone_number, id_card_number, email } = req.body
        
        const id = `MMBR-${uuidv4()}-${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()}`

        await query({
            sql: 'INSERT INTO members(id, first_name, last_name, address, phone_number, id_card_number, email) VALUES(?, ?, ?, ?, ?, ?, ?)',
            values: [id, first_name, last_name, address, phone_number, id_card_number, email]
        })

        res.status(200).json({
            error: false, 
            message: 'Create Member Success', 
            data: { first_name, last_name, address, phone_number, id_card_number, email }
        })
    } catch (error: any) {
        res.status(error.status || 500).json({
            error: true, 
            message: error.msg || 'Something Went Wrong!', 
            data: {}
        })
    }
}