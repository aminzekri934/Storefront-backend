import supertest from "supertest";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import app from "../server";
import { User, UserStore } from "../models/users";
import { ProductStore } from "../models/products";
import { OrderStore } from "../models/orders";
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

let order_id:number;
let user_Id: number ;
let order_product_id:number;
let product_Id:number;

describe("Order Handler", () => {
  beforeAll(async () => {
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: User = {
      ...userInstance,
      password: hashPassword as string,
    };
    const  user1 = await userStore.create(user);
    user_Id = parseInt(user1.id);  
    const product1= await productStore.create(productInstance);
    product_Id= parseInt(product1.id as unknown as string)
  });

  it("should return success for CREATE order", async () => {
    const response = await request
      .post("/orders")
      .auth(token, { type: "bearer" })
      .send({ status: "shipped", userId:user_Id });
    order_id=response.body.id;
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ all orders", async () => {
    const response = await request.get("/orders");
    expect(response.status).toBe(200);
    //expect(response.body).toBeTruthy();
  });

  it("should return success for READ orders by id", async () => {
    const response = await request.get(`/orders/:${order_id}`).send(`id:${order_id}`);

    expect(response.status).toBe(200);
    //expect(response.body).toBeTruthy();
  });

  it("should return success for CREATE order with product quantity and product id", async () => {
    const response = await request
      .post(`/orders/:${order_id}/products`)
      .auth(token, { type: "bearer" })
      .send({ quantity: 2, orderId:order_id, productId:product_Id });
    order_product_id=response.body.id;
    expect(response.status).toBe(200);
    //expect(response.body).toBeTruthy();
  });

  it("should return success for DELETE order product with order product id", async () => {
    const response = await request
      .delete(`/orders/:${order_id}/products`)
      .auth(token, { type: "bearer" })
      .send({ orderProductId: `${order_product_id}`});

    expect(response.status).toBe(200);
    //expect(response.body).toBeTruthy();
  });

  it("should return success for DELETE order by order id", async () => {
    const response = await request
      .delete("/orders")
      .auth(token, { type: "bearer" })
      .send({ orderId:`${order_id}` });

    expect(response.status).toBe(200);
   // expect(response.body).toBeTruthy();
  });

  afterAll(async () => {
    await productStore.delete(productInstance.name);
    await userStore.delete(userInstance.firstname);
  });
});