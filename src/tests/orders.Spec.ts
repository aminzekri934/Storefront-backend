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
  price: 4
};
let order_id:number;
let user_Id: number ;
let order_product_id:number;
let product_Id:number;
describe("Order Model", () => {
  beforeAll(async () => {
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: User = {
      ...userInstance,
      password: hashPassword as string,
    };
    const  user1 =await userStore.create(user);
    user_Id = parseInt(user1.id);  
    const product1= await productStore.create(productInstance);
    product_Id= parseInt(product1.id as unknown as string)
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
      userId: user_Id
    });
    order_id=parseInt(result.id as unknown as string);
    expect(result.status).toEqual( "shipped" 
    );
  });

  it("INDEX method should return a list of all orders", async () => {
    // @ts-ignore
    const result = await store.index();

    expect( result[0].status ).toEqual( "shipped"
    );
  });

  it("SHOW method should return the orders of a user", async () => {
    // @ts-ignore
    const result = await store.show(`${user_Id}`);

    expect(result.status).toEqual(
       "shipped"
    );
  });

  it("CREATE order product method should add an order with product quantity and product id", async () => {
    // @ts-ignore
    const result = await store.createOrderProduct({
      quantity: 4,
      orderId: order_id,
      productId: product_Id
    });
    order_product_id=parseInt(result.id as unknown as string)
    expect(result.quantity).toEqual( 4
    );
  });

  it("DELETE order product method should remove an order product by order product id", async () => {
    const result = await store.deleteOrderProduct(`${order_product_id}`);
    // @ts-ignore
    expect(result).toBe(undefined);
  });

  afterAll(async () => {
    await orderStore.deleteOrderProduct(`${order_product_id}`);
    await orderStore.deleteOrder(`${order_id}`);
    await productStore.delete(productInstance.name);
    await userStore.delete(userInstance.firstname);
  });
});