import Client from "../database";
export type User = {
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = "SELECT * from users";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      const users = result.rows;
      conn.release();
      return users;
    } catch (err) {
      throw new Error(`Unable to get all users. Error: ${err}`);
    }
  }

  async show(firstname: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE firstname=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [firstname]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Unable to find user ${firstname}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<{ id: string,firstname:string}> {
    try {
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.password,
      ]);
      const user = result.rows[0];
      conn.release();
      return { id: user.id, firstname: user.firstname };
    } catch (err) {
      throw new Error(`Unable to create user ${u.firstname}: ${err}`);
    }
  }

  async login(
    firstname: string
  ): Promise<{ id: string; firstname: string; password: string }> {
    try {
      const sql = "SELECT * FROM users WHERE firstname=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [firstname]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Unable to login user ${firstname}: ${err}`);
    }
  }

  async delete(firstname: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE firstname=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [firstname]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Unable to delete user ${firstname}. Error: ${err}`);
    }
  }
}