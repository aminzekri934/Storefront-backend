import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/orders";
import verifyAuthToken from "./middleware/verifyAuthToken";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
 try{
  const orders = await store.index();
  res.json(orders);
} catch (error) {
  res.status(400);
  res.json({ error });
}
};

const show = async (req: Request, res: Response) => {
 try{
  const order = await store.show(req.body.userId);
  res.json(order);
} catch (error) {
  res.status(400);
  res.json({ error });
}
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      productId:(req.body.productId  as unknown) as number,
      status: req.body.status as string,
      quantity:(req.body.quantity as unknown) as number,
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

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:userId", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, createOrder);
  app.delete("/orders", verifyAuthToken, deleteOrder);
};

export default orderRoutes;