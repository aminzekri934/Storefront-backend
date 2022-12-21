"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
/*export type OrderProduct = {
  quantity: number;
  orderId: number;
  productId: number;
};
*/
class OrderStore {
    async index() {
        try {
            const sql = "SELECT * from orders";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to get all orders. Error: ${err}`);
        }
    }
    async show(userId) {
        try {
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Unable to find orders from user ${userId}. Error: ${err}`);
        }
    }
    async createOrder(o) {
        try {
            const sql = "INSERT INTO orders (product_id,status,quantity,user_id) VALUES($1,$2,$3,$4) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [o.productId, o.status, o.status, o.quantity, o.userId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Unable to create order. Error: ${err}`);
        }
    }
    async deleteOrder(orderId) {
        try {
            const sql = "DELETE FROM orders WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Unable to delete order ${orderId}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
