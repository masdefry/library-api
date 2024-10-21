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
exports.createMember = exports.findMembers = void 0;
const connection_1 = __importDefault(require("../../connection"));
const util_1 = require("util");
const query = (0, util_1.promisify)(connection_1.default.query).bind(connection_1.default);
const uuid_1 = require("uuid");
const findMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit_data = 2 } = req.query;
        // limit_data * (page-1)
        // 2 * (1-1) = 0
        // 2 * (2-1) = 2
        // 2 * (3-1) = 4
        const offset = Number(limit_data) * (Number(page) - 1);
        const members = yield query({
            sql: 'SELECT * FROM members LIMIT ? OFFSET ?',
            values: [Number(limit_data), offset]
        });
        const totalData = yield query({
            sql: 'SELECT COUNT(*) as totalData  FROM members'
        });
        const totalPage = Math.ceil(totalData[0].totalData / Number(limit_data));
        res.status(200).json({
            error: false,
            message: 'Get Members Success',
            data: { members, totalPage }
        });
    }
    catch (error) {
        console.log(error);
        res.status(error.status || 500).json({
            error: true,
            message: error.msg || 'Something Went Wrong!',
            data: {}
        });
    }
});
exports.findMembers = findMembers;
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, address, phone_number, id_card_number, email } = req.body;
        const id = `MMBR-${(0, uuid_1.v4)()}-${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}`;
        yield query({
            sql: 'INSERT INTO members(id, first_name, last_name, address, phone_number, id_card_number, email) VALUES(?, ?, ?, ?, ?, ?, ?)',
            values: [id, first_name, last_name, address, phone_number, id_card_number, email]
        });
        res.status(200).json({
            error: false,
            message: 'Create Member Success',
            data: { first_name, last_name, address, phone_number, id_card_number, email }
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
exports.createMember = createMember;
