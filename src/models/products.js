"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const sql = "SELECT * from products";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to get all products. Error: ${err}`);
        }
    }
    async show(productName) {
        try {
            const sql = "SELECT * FROM products WHERE name=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [productName]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Unable to find product ${productName}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const sql = "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.name, p.price]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Unable to add new product ${p.name}. Error: ${err}`);
        }
    }
    async delete(productName) {
        try {
            const sql = "DELETE FROM products WHERE name=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [productName]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Unable to delete product ${productName}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
