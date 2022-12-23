"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var orders_1 = require("../models/orders");
var users_1 = require("../models/users");
var products_1 = require("../models/products");
dotenv_1.default.config();
var _a = process.env, BCRYPT_SALT_ROUNDS = _a.BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER = _a.BCRYPT_PEPPER;
var store = new orders_1.OrderStore();
var userStore = new users_1.UserStore();
var productStore = new products_1.ProductStore();
var orderStore = new orders_1.OrderStore();
var userInstance = {
    firstname: "Amine",
    lastname: "Zekri"
};
var userInstancePassword = "Aoe1y381o";
var productInstance = {
    id: 1,
    name: "book",
    price: 4,
};
describe("Order Model", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var pepperedPassword, salt, hashPassword, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pepperedPassword = "".concat(userInstancePassword).concat(BCRYPT_PEPPER);
                    return [4 /*yield*/, bcrypt_1.default.genSalt(parseInt(BCRYPT_SALT_ROUNDS))];
                case 1:
                    salt = _a.sent();
                    hashPassword = bcrypt_1.default.hashSync(pepperedPassword, salt);
                    user = __assign(__assign({}, userInstance), { password: hashPassword });
                    return [4 /*yield*/, userStore.create(user)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, productStore.create(productInstance)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should have an INDEX method", function () {
        expect(store.index).toBeDefined();
    });
    it("should have a SHOW method", function () {
        expect(store.show).toBeDefined();
    });
    it("should have a CREATE method", function () {
        expect(store.createOrder).toBeDefined();
    });
    it("should have a DELETE method", function () {
        expect(store.deleteOrder).toBeDefined();
    });
    it("CREATE method should add an order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, productId, status, quantity, userId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, store.createOrder({
                        productId: 1, status: "completed", quantity: 1, userId: 3
                    })];
                case 1:
                    _a = _b.sent(), productId = _a.productId, status = _a.status, quantity = _a.quantity, userId = _a.userId;
                    expect({ productId: productId, status: status, quantity: quantity, userId: userId }).toEqual({
                        productId: 1, status: "completed", quantity: 1, userId: 3
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("INDEX method should return a list of all orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, productId, status, quantity, userId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, store.index()];
                case 1:
                    _a = (_b.sent())[0], productId = _a.productId, status = _a.status, quantity = _a.quantity, userId = _a.userId;
                    expect({ productId: productId, status: status, quantity: quantity, userId: userId }).toEqual({
                        productId: 1, status: "completed", quantity: 1, userId: 3
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("SHOW method should return the orders of a user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, productId, status, quantity, userId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, store.show("1")];
                case 1:
                    _a = _b.sent(), productId = _a.productId, status = _a.status, quantity = _a.quantity, userId = _a.userId;
                    expect({ productId: productId, status: status, quantity: quantity, userId: userId }).toEqual({
                        productId: 1, status: "completed", quantity: 1, userId: 3
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("DELETE order method should remove an order by order id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.deleteOrder("1")];
                case 1:
                    result = _a.sent();
                    // @ts-ignore
                    expect(result).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productStore.delete(productInstance.name)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, orderStore.deleteOrder("1")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, userStore.delete(userInstance.firstname)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
