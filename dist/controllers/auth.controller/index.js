"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const connection_1 = __importDefault(require("../../connection"));
const util_1 = require("util");
const query = (0, util_1.promisify)(connection_1.default.query).bind(connection_1.default);
const date_fns_1 = require("date-fns");
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const findStaff = yield query({
            sql: `SELECT * FROM staffs 
            JOIN schedules ON staffs.schedules_id = schedules.id
            JOIN branchs ON staffs.branchs_id = branchs.id
            WHERE username = ? AND password = ?`,
            values: [username, password]
        });
        const checkStaffSchedule = (0, date_fns_1.isAfter)((0, date_fns_1.format)(new Date(), 'yyyy-MM-dd kk:mm:ss'), `${(0, date_fns_1.format)(new Date(), 'yyyy-MM-dd')} ${findStaff[0].start_time}`)
            && (0, date_fns_1.isBefore)((0, date_fns_1.format)(new Date(), 'yyyy-MM-dd kk:mm:ss'), `${(0, date_fns_1.format)(new Date(), 'yyyy-MM-dd')} ${findStaff[0].end_time}`);
        if (checkStaffSchedule === false)
            throw { msg: 'Login Failed!' };
        res.status(200).json({
            error: false,
            message: 'Login Success!',
            data: {
                id: findStaff[0].id,
                username: findStaff[0].username,
                branch_name: findStaff[0].name,
                role: 'STAFF'
            }
        });
    }
    catch (error) {
        res.status(error.status || 500).json({
            error: true,
            message: error.msg || 'Something Went Wrong!',
            data: {}
        });
    }
});
exports.auth = auth;
