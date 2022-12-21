"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const orders_1 = require("../models/orders");
const users_1 = require("../models/users");
const products_1 = require("../models/products");
dotenv_1.default.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER } = process.env;
const store = new orders_1.OrderStore();
const userStore = new users_1.UserStore();
const productStore = new products_1.ProductStore();
const orderStore = new orders_1.OrderStore();
const userInstance = {
    firstname: "Amine",
    lastname: "Zekri"
};
const userInstancePassword = "Aoe1y381o";
const productInstance = {
    id: 1,
    name: "book",
    price: 4,
};
describe("Order Model", () => {
    beforeAll(async () => {
        const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
        const salt = await bcrypt_1.default.genSalt(parseInt(BCRYPT_SALT_ROUNDS));
        const hashPassword = bcrypt_1.default.hashSync(pepperedPassword, salt);
        const user = {
            ...userInstance,
            password: hashPassword,
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
        const { id, productId, status, quantity, userId } = await store.createOrder({
            id: 1, productId: 1, status: "completed", quantity: 1, userId: 3
        });
        expect({ id, productId, status, quantity, userId }).toEqual({
            id: 1, productId: 1, status: "completed", quantity: 1, userId: 3
        });
    });
    it("INDEX method should return a list of all orders", async () => {
        // @ts-ignore
        const [{ id, productId, status, quantity, userId }] = await store.index();
        expect({ id, productId, status, quantity, userId }).toEqual({
            id: 1, productId: 1, status: "completed", quantity: 1, userId: 3
        });
    });
    it("SHOW method should return the orders of a user", async () => {
        // @ts-ignore
        const { id, productId, status, quantity, userId } = await store.show("3");
        expect({ id, productId, status, quantity, userId }).toEqual({
            id: 1, productId: 1, status: "completed", quantity: 1, userId: 3
        });
    });
    /*it("DELETE order product method should remove an order product by order product id", async () => {
      const result = await store.deleteOrderProduct("3");
      // @ts-ignore
      expect(result).toBe(undefined);
    });
  
    afterAll(async () => {
      await orderStore.deleteOrderProduct("2");
      await productStore.delete(productInstance.name);
      await orderStore.deleteOrder("2");
      await userStore.delete(userInstance.username);
    });*/
});
