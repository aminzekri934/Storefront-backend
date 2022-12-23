"use strict";
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
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var users_1 = require("../models/users");
var verifyAuthToken_1 = __importDefault(require("./middleware/verifyAuthToken"));
dotenv_1["default"].config();
var _a = process.env, BCRYPT_SALT_ROUNDS = _a.BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER = _a.BCRYPT_PEPPER, JWT_TOKEN_SECRET = _a.JWT_TOKEN_SECRET;
var store = new users_1.UserStore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400);
                res.json({ error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.show(req.params.firstname)];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400);
                res.json({ error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pepperedPassword, salt, hashPassword, user, _a, id, firstname, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pepperedPassword = "".concat(req.body.password).concat(BCRYPT_PEPPER);
                return [4 /*yield*/, bcrypt_1["default"].genSalt(parseInt(BCRYPT_SALT_ROUNDS))];
            case 1:
                salt = _b.sent();
                hashPassword = bcrypt_1["default"].hashSync(pepperedPassword, salt);
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: hashPassword
                };
                return [4 /*yield*/, store.create(user)];
            case 3:
                _a = _b.sent(), id = _a.id, firstname = _a.firstname;
                res.json({ id: id, firstname: firstname });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundUser, pepperedPassword, validPassword, token, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.login(req.body.firstname)];
            case 1:
                foundUser = _a.sent();
                if (!foundUser) {
                    return [2 /*return*/, res.status(400).send("Username is wrong")];
                }
                pepperedPassword = "".concat(req.body.password).concat(BCRYPT_PEPPER);
                validPassword = bcrypt_1["default"].compareSync(pepperedPassword, foundUser.password);
                if (!validPassword) {
                    return [2 /*return*/, res.status(400).send("Password is wrong")];
                }
                token = jsonwebtoken_1["default"].sign({ firstname: foundUser.firstname }, JWT_TOKEN_SECRET);
                res.header("auth-token", token).send({ token: token });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store["delete"](req.body.firstname)];
            case 1:
                _a.sent();
                res.json({ status: "success" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400);
                res.json({ error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var userRoutes = function (app) {
    app.get("/users", verifyAuthToken_1["default"], index);
    app.get("/users/:firstname", verifyAuthToken_1["default"], show);
    app.post("/users/register", register);
    app.post("/users/login", login);
    app["delete"]("/users", destroy);
};
exports["default"] = userRoutes;
