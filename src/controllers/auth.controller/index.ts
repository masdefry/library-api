import { Request, Response } from "express";
import db from "../../connection";
import {promisify} from 'util';
const query = promisify(db.query).bind(db)
import {format, isAfter, isBefore} from 'date-fns'
import { IStaffs } from "./types";

interface IFindStaff extends IStaffs{
    start_time: string, 
    end_time: string,
    name: string
}

export const auth = async(req: Request, res: Response) => {
    try {
        const {username, password} = req.body 

        const findStaff = await query({
            sql: `SELECT * FROM staffs 
            JOIN schedules ON staffs.schedules_id = schedules.id
            JOIN branchs ON staffs.branchs_id = branchs.id
            WHERE username = ? AND password = ?`,
            values: [username, password]
        }) as IFindStaff[]

        const checkStaffSchedule = isAfter(format(new Date(), 'yyyy-MM-dd kk:mm:ss'), `${format(new Date(), 'yyyy-MM-dd')} ${findStaff[0].start_time}`) 
        && isBefore(format(new Date(), 'yyyy-MM-dd kk:mm:ss'), `${format(new Date(), 'yyyy-MM-dd')} ${findStaff[0].end_time}`)

        if(checkStaffSchedule === false) throw {msg: 'Login Failed!'}
        
        res.status(200).json({
            error: false, 
            message: 'Login Success!', 
            data: {
                id: findStaff[0].id, 
                username: findStaff[0].username,
                branch_name: findStaff[0].name, 
                role: 'STAFF'
            }
        })
    } catch (error: any) {
        res.status(error.status || 500).json({
            error: true, 
            message: error.msg || 'Something Went Wrong!', 
            data: {}
        })
    }
}