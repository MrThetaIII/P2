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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql)];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not get orders. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not find the order with id: ".concat(id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (order, products) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sql_, cnctn, result, i, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        sql = 'INSERT INTO orders (user_id_) VALUES($1) RETURNING *';
                        sql_ = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql, [order.user_id_])];
                    case 2:
                        result = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < products.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, cnctn.query(sql_, [
                                result.rows[0].id,
                                products[i].product_id,
                                products[i].quantity,
                            ])];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        cnctn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 7:
                        err_3 = _a.sent();
                        throw new Error("Could not add new order ".concat(order, ". Error: ").concat(err_3));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not delete order with id: ".concat(id, ". Error: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.updateOrder = function (id, order) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE orders SET user_id_ = ($1) WHERE id = ($2) RETURNING * ';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql, [order.user_id_, id])];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not update order ".concat(id, ". Error: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.addProduct = function (id, product) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql, [
                                id,
                                product.product_id,
                                product.quantity,
                            ])];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Could not add product ".concat(product, " to order ").concat(id, ". Error: ").concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getProductsByOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM products INNER JOIN order_products ON products.id = order_products.product_id WHERE order_products.order_id=($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not get products for order ".concat(id, ". Error: ").concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM order_products';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql)];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_8 = _a.sent();
                        throw new Error("Could not get products. Error: ".concat(err_8));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.deleteProduct = function (order_product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM order_products WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql, [order_product_id])];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_9 = _a.sent();
                        throw new Error("Could not delete product with id: ".concat(order_product_id, ". Error: ").concat(err_9));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.updateProduct = function (order_product_id, product) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE order_products SET product_id = ($1), quantity = ($2) WHERE id = ($3) RETURNING * ';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql, [
                                product.product_id,
                                product.quantity,
                                order_product_id,
                            ])];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_10 = _a.sent();
                        throw new Error("Could not update product ".concat(order_product_id, ". Error: ").concat(err_10));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.markFulfilled = function (order_product_id, fulfilled) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE order_products SET fulfilled=($1) WHERE id=($2) RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql, [fulfilled, order_product_id])];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_11 = _a.sent();
                        throw new Error("Could not update order ".concat(order_product_id, ". Error: ").concat(err_11));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getOrdersByUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, cnctn, result, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM orders WHERE user_id_=($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        cnctn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_12 = _a.sent();
                        throw new Error("Could not get orders for user with id: ".concat(id, ". Error: ").concat(err_12));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.resetTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql_a, sql_b, sql_c, sql_d, cnctn, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        sql_a = 'DELETE FROM order_products';
                        sql_b = 'DELETE FROM orders';
                        sql_c = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1';
                        sql_d = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        cnctn = _a.sent();
                        return [4 /*yield*/, cnctn.query(sql_a)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, cnctn.query(sql_b)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, cnctn.query(sql_c)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, cnctn.query(sql_d)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_13 = _a.sent();
                        throw new Error("Could not reset orders. Error: ".concat(err_13));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
