import Client from "../database";

export type Order = {
  status: string;
  userId: number;
};

export type OrderProduct = {
  quantity: number;
  orderId: number;
  productId: number;
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

  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to find orders from user ${id}. Error: ${err}`
      );
    }
  }

  async createOrder(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.status, o.userId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Unable to create order. Error: ${err}`);
    }
  }
  async index2(): Promise<OrderProduct[]> {
    try {
      const sql = "SELECT * from order_products";
      const conn = await Client.connect();
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get all order_products. Error: ${err}`);
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

  async createOrderProduct(o: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        o.quantity,
        o.orderId,
        o.productId,
      ]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to add product ${o.productId} to order ${o.orderId}: ${err}`
      );
    }
  }

  async deleteOrderProduct(orderProductId: string): Promise<Order> {
    try {
      const sql = "DELETE FROM order_products WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [orderProductId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to delete order product ${orderProductId}. Error: ${err}`
      );
    }
  }
}