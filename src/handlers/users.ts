import express, { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, UserStore } from "../models/users";
import verifyAuthToken from "./middleware/verifyAuthToken";

dotenv.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, JWT_TOKEN_SECRET } = process.env;

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
 try{
  const users = await store.index();
  res.json(users);
} catch (error) {
  res.status(400);
  res.json({ error });
}
};

const show = async (req: Request, res: Response) => {
 try{
  const user = await store.show(req.params.firstname);
  res.json(user);
} catch (error) {
  res.status(400);
  res.json({ error });
 }
};

const register = async (req: Request, res: Response) => {
  const pepperedPassword = `${req.body.password}${BCRYPT_PEPPER}`;
  const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
  const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

  try {
    const user: User = {
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: hashPassword as string,
    };

    const { id, firstname } = await store.create(user);
    res.json({ id, firstname });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const foundUser = await store.login(req.body.firstname as string);
    if (!foundUser) {
      return res.status(400).send("Username is wrong");
    }

    const pepperedPassword = `${req.body.password}${BCRYPT_PEPPER}`;
    const validPassword = bcrypt.compareSync(
      pepperedPassword,
      foundUser.password
    );
    if (!validPassword) {
      return res.status(400).send("Password is wrong");
    }

    const token = jwt.sign(
      { firstname: foundUser.firstname },
      JWT_TOKEN_SECRET as string
    );
    res.header("auth-token", token).send({ token });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    await store.delete(req.body.firstname as string);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:firstname", verifyAuthToken, show);
  app.post("/users/register", register);
  app.post("/users/login", login);
  app.delete("/users", destroy);
};

export default userRoutes;