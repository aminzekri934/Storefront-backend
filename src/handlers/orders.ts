import express, { Request, Response } from "express";
import { Order, OrderProduct, OrderStore }  from "../models/orders";
import verifyAuthToken from "./middleware/verifyAuthToken";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
 try{ 
  const orders = await store.index();
  res.json(orders);
 } catch (err) {
  res.status(400);
  res.json(err);
 }
};

const show = async (req: Request, res: Response) => {
  try{
  const order = await store.show(req.params.id);
  res.json(order);
 } catch (err) {
  res.status(400);
  res.json(err);
 }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status as string,
      userId: (req.body.userId as unknown) as number,
    };

    const newOrder = await store.createOrder(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    await store.deleteOrder(req.body.orderId as string);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const createOrderProduct = async (req: Request, res: Response) => {
  const orderProduct: OrderProduct = {
    quantity: (req.body.quantity as unknown) as number,
    orderId: (req.body.orderId as unknown) as number,
    productId: (req.body.productId as unknown) as number,
  };

  try {
    const addedProduct = await store.createOrderProduct(orderProduct);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteOrderProduct = async (req: Request, res: Response) => {
  try {
    await store.deleteOrderProduct(req.body.orderProductId as string);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:Id", show);
  app.post("/orders", verifyAuthToken, createOrder);
  app.delete("/orders", verifyAuthToken, deleteOrder);
  app.post("/orders/:id/products", verifyAuthToken, createOrderProduct);
  app.delete("/orders/:id/products", verifyAuthToken, deleteOrderProduct);
};

export default orderRoutes;