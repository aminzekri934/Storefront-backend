import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User, UserStore } from "../models/users";
import { parseJwt } from "../parseJwt";

dotenv.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, JWT_TOKEN_SECRET } = process.env;

const store = new UserStore();

const userInstance = {
  firstname: "Amine",
  lastname: "Zekri",
  };

const userInstancePassword = "CodDo128ao";

describe("User Model", () => {
  it("should have an INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a CREATE method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a LOGIN method", () => {
    expect(store.login).toBeDefined();
  });

  it("should have a DELETE method", () => {
    expect(store.delete).toBeDefined();
  });

  it("CREATE method should add a user", async () => {
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: User = {
      ...userInstance,
      password: hashPassword as string,
    };

    const { firstname } = await store.create(user);

    expect({ firstname }).toEqual({
      firstname: userInstance.firstname,
    });
  });

  it("INDEX method should return a list of users", async () => {
    const userList = await store.index();
    const { firstname, lastname } = userList[0];

    expect([{ firstname, lastname }]).toEqual([userInstance]);
  });

  it("SHOW method should return a user by firstname", async () => {
    const { firstname, lastname } = await store.show(
      userInstance.firstname
    );

    expect({ firstname, lastname }).toEqual(userInstance);
  });

  it("LOGIN method should return a token", async () => {
    const foundUser = await store.login(userInstance.firstname);
    expect(foundUser).toBeDefined();

    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const validPassword = bcrypt.compareSync(
      pepperedPassword,
      foundUser.password
    );
    expect(validPassword).toBeTrue();

    const token = jwt.sign(
      { firstname: foundUser.firstname},
      JWT_TOKEN_SECRET as string
    );
    const { firstname } = parseJwt(token);
    expect(firstname).toBe(foundUser.firstname);
  });

  it("DELETE method should delete a user by firstname", async () => {
    await store.delete(userInstance.firstname);
    const result = await store.index();
    expect(result).toBe([]);
  });
});