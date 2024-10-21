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
exports.createTransaction = void 0;
const connection_1 = __importDefault(require("../../connection"));
const util_1 = require("util");
const date_fns_1 = require("date-fns");
const query = (0, util_1.promisify)(connection_1.default.query).bind(connection_1.default);
const date_fns_2 = require("date-fns");
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { members_id, staffs_id, books_id } = req.body;
        yield query({
            sql: 'Start Transaction'
        });
        const findTransactionMemberByDate = yield query({
            sql: 'SELECT * FROM transactions WHERE members_id = ? ORDER BY created_at DESC LIMIT 1',
            values: [members_id]
        });
        if (findTransactionMemberByDate.length) {
            const transactionMember = (0, date_fns_2.format)(findTransactionMemberByDate[0].created_at, 'yyyy-MM-dd');
            const dateNow = (0, date_fns_2.format)(new Date(), 'yyyy-MM-dd');
            if (transactionMember === dateNow)
                throw { msg: 'Transaction Limit Exceeded' };
        }
        if (books_id.length > 5)
            throw { msg: 'Books Limit Exceeded' };
        const createTransaction = yield query({
            sql: 'INSERT INTO transactions(due_date, members_id, staffs_id) VALUES(?, ?, ?)',
            values: [(0, date_fns_1.addDays)(new Date(), 3), members_id, staffs_id]
        });
        const insertBooks = books_id === null || books_id === void 0 ? void 0 : books_id.map((book) => {
            return [createTransaction.insertId, book];
        });
        yield query({
            sql: 'INSERT INTO transaction_detailsss(transactions_id, books_id) VALUES ?',
            values: [insertBooks]
        });
        yield query({
            sql: 'Commit'
        });
        res.status(201).json({
            error: false,
            message: 'Transaction Success',
            data: {}
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
            data: {}
        });
    }
});
exports.createTransaction = createTransaction;
