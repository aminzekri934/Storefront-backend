import Client from "../database";
export type Order = {
productId:number;
status:string;
quantity: number;
userId:number
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const sql = "SELECT * from orders";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get all orders. Error: ${err}`);
    }
  }

  async show(userId: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [userId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to find orders from user ${userId}. Error: ${err}`
      );
    }
  }

  async createOrder(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (product_id,status,quantity,user_id) VALUES($1,$2,$3,$4) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.productId,o.status,o.quantity,o.userId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Unable to create order. Error: ${err}`);
    }
  }

  async deleteOrder(orderId: string): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [orderId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Unable to delete order ${orderId}. Error: ${err}`);
    }
  }
}