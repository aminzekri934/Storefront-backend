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

const userInstancePassword = "Aoe1y381o";

const productInstance = {
 id:1, 
 name: "book",
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
    const {productId,status,quantity, userId } = await store.createOrder({
     productId:1,status:"completed",quantity:1, userId:3 });

    expect({productId,status,quantity, userId }).toEqual({
     productId:1,status:"completed",quantity:1, userId:3 
    });
  });

  it("INDEX method should return a list of all orders", async () => {
    // @ts-ignore
    const [{id,productId,status,quantity, userId }] = await store.index();

    expect({id,productId,status,quantity, userId }).toEqual({
     id:1,productId:1,status:"completed",quantity:1, userId:3
    });
  });

  it("SHOW method should return the orders of a user", async () => {
    // @ts-ignore
    const{id,productId,status,quantity, userId }= await store.show("1");

    expect({id,productId,status,quantity, userId }).toEqual({
     id:1,productId:1,status:"completed",quantity:1, userId:3 
    });
  });

  it("DELETE order method should remove an order by order id", async () => {
    const result = await store.deleteOrder("1");
    // @ts-ignore
    expect(result).toBe(undefined);
  });

  afterAll(async () => {
    await productStore.delete(productInstance.name);
    await orderStore.deleteOrder("1");
    await userStore.delete(userInstance.firstname);
  });
});