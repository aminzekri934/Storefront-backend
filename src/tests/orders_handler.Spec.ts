import supertest from "supertest";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import app from "../server";
import { User, UserStore } from "../models/users";
import { ProductStore } from "../models/products";

dotenv.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, JWT_TEST_TOKEN } = process.env;
const token = JWT_TEST_TOKEN as string;

const request = supertest(app);

const userStore = new UserStore();
const productStore = new ProductStore();

const userInstance = {
  firstname: "Amine",
  lastname: "Zekri"
};

const userInstancePassword = "CodDo128ao";

const productInstance = {
  name: "banana",
  price: 4,
};

describe("Order Handler", () => {
  beforeAll(async () => {
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: User = {
      ...userInstance,
      password: hashPassword as string,
    };
    await userStore.create(user);

    await productStore.create(productInstance);
  });

  it("should return success for CREATE order", async () => {
    const response = await request
      .post("/orders")
      .auth(token, { type: "bearer" })
      .send({ status: "ordered", userId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ all orders", async () => {
    const response = await request.get("/orders");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ orders by id", async () => {
    const response = await request.get("/orders/:1").send("Id=1");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for CREATE order with product quantity and product id", async () => {
    const response = await request
      .post("/orders/:1/products")
      .auth(token, { type: "bearer" })
      .send({ quantity: 2, orderId: 1, productId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for DELETE order product with order product id", async () => {
    const response = await request
      .delete("/orders/:1/products")
      .auth(token, { type: "bearer" })
      .send({ orderProductId: "1" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for DELETE order by order id", async () => {
    const response = await request
      .delete("/orders")
      .auth(token, { type: "bearer" })
      .send({ orderId: "1" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  afterAll(async () => {
    await productStore.delete(productInstance.name);
    await userStore.delete(userInstance.firstname);
  });
});