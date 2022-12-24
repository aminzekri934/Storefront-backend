import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { OrderStore } from "../models/orders";
import { User, UserStore } from "../models/users";
import { ProductStore } from "../models/products";

dotenv.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER } = process.env;

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

const userInstance = {
  firstname: "Amine",
  lastname: "Zekri"
};

const userInstancePassword = "CodDo128ao";

const productInstance = {
  name: "banana",
  price: 4,
};

describe("Order Model", () => {
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

  it("should have an INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a CREATE method", () => {
    expect(store.createOrder).toBeDefined();
  });

  it("should have a DELETE method", () => {
    expect(store.deleteOrder).toBeDefined();
  });

  it("CREATE method should add an order", async () => {
    const result = await store.createOrder({
      status: "shipped",
      userId: 1
    });

    expect(result).toEqual({
      status: "shipped",
      userId: 1
    });
  });

  it("INDEX method should return a list of all orders", async () => {
    const [{ status, userId }] = await store.index();

    expect({ status, userId }).toBe({
      status: "shipped",
      userId: 1
    });
  });

  it("SHOW method should return the orders of a user", async () => {
    const { status, userId } = await store.show("1");
    expect({ status, userId }).toBe({
      status: "shipped",
      userId: 1
    });
  });

  it("CREATE order product method should add an order with product quantity and product id", async () => {
    const result= await store.createOrderProduct({
      quantity: 4,
      orderId: 1,
      productId: 1
    });

    expect(result).toBe({
      quantity: 4,
      orderId: 1,
      productId: 1
    });
  });

  it("DELETE order product method should remove an order product by order product id", async () => {
    await store.deleteOrderProduct("1");
    const result = await store.index2(); 
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    await orderStore.deleteOrderProduct("1");
    await productStore.delete(productInstance.name);
    await orderStore.deleteOrder("1");
    await userStore.delete(userInstance.firstname);
  });
});