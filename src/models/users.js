"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
class UserStore {
    async index() {
        try {
            const sql = "SELECT * from users";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            const users = result.rows;
            conn.release();
            return users;
        }
        catch (err) {
            throw new Error(`Unable to get all users. Error: ${err}`);
        }
    }
    async show(firstname) {
        try {
            const sql = "SELECT * FROM users WHERE firstname=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [firstname]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Unable to find user ${firstname}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const sql = "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.password,
            ]);
            const user = result.rows[0];
            conn.release();
            return { id: user.id, firstname: user.firstname };
        }
        catch (err) {
            throw new Error(`Unable to create user ${u.firstname}: ${err}`);
        }
    }
    async login(firstname) {
        try {
            const sql = "SELECT * FROM users WHERE firstname=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [firstname]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Unable to login user ${firstname}: ${err}`);
        }
    }
    async delete(firstname) {
        try {
            const sql = "DELETE FROM users WHERE firstname=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [firstname]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Unable to delete user ${firstname}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
