"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
//import verifyAuthToken from "../middleware/verifyAuthToken";
const store = new products_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.productName);
    res.json(product);
};
const create = async (req, res) => {
    try {
        const product = {
            id: 1,
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        await store.delete(req.body.productName);
        res.json({ status: "success" });
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const productRoutes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    //app.post("/products", verifyAuthToken, create);
    //app.delete("/products", verifyAuthToken, destroy);
};
exports.default = productRoutes;
