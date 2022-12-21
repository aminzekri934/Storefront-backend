"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../users");
const parseJwt_1 = require("../../utils/parseJwt");
dotenv_1.default.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, JWT_TOKEN_SECRET } = process.env;
const store = new users_1.UserStore();
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
        const salt = await bcrypt_1.default.genSalt(parseInt(BCRYPT_SALT_ROUNDS));
        const hashPassword = bcrypt_1.default.hashSync(pepperedPassword, salt);
        const user = {
            ...userInstance,
            password: hashPassword,
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
    it("SHOW method should return a user by username", async () => {
        const { firstname, lastname } = await store.show(userInstance.firstname);
        expect({ firstname, lastname }).toEqual(userInstance);
    });
    it("LOGIN method should return a token", async () => {
        const foundUser = await store.login(userInstance.firstname);
        expect(foundUser).toBeDefined();
        const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
        const validPassword = bcrypt_1.default.compareSync(pepperedPassword, foundUser.password);
        expect(validPassword).toBeTrue();
        const token = jsonwebtoken_1.default.sign({ firstname: foundUser.firstname }, JWT_TOKEN_SECRET);
        const { firstname } = (0, parseJwt_1.parseJwt)(token);
        expect(firstname).toBe(foundUser.firstname);
    });
    it("DELETE method should delete a user by firstname", async () => {
        await store.delete(userInstance.firstname);
        const result = await store.index();
        expect(result).toBe([]);
    });
});
