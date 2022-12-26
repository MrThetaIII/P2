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
var order_1 = require("../../database/models/order");
var user_1 = require("../../database/models/user");
var product_1 = require("../../database/models/product");
var reset_data_1 = __importDefault(require("../../database/models/testingUtil/reset.data"));
var store = new order_1.OrderStore();
describe('orders model methods', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1, user2, userStore, product, productStore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = {
                        user_name_: 'Ali',
                        email: 'Ali@Ali.Ali',
                        user_password: 'Ali',
                    };
                    user2 = {
                        user_name_: 'Ali',
                        email: 'Ali@Ali.Alii',
                        user_password: 'Ali',
                    };
                    userStore = new user_1.UserStore();
                    return [4 /*yield*/, userStore.create(user1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, userStore.create(user2)];
                case 2:
                    _a.sent();
                    product = {
                        product_name: 'Ali',
                        price: 1,
                        description: 'Ali',
                    };
                    productStore = new product_1.ProductStore();
                    productStore.create(product);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should have an index method', function () {
        expect(store.index).toBeDefined();
    });
    it('Should have a show method', function () {
        expect(store.show).toBeDefined();
    });
    it('Should have a delete method', function () {
        expect(store.delete).toBeDefined();
    });
    it('Should have a create method', function () {
        expect(store.create).toBeDefined();
    });
    it('Should have an update method', function () {
        expect(store.updateOrder).toBeDefined();
    });
    it('should have a getOrdersByUser method', function () {
        expect(store.getOrdersByUser).toBeDefined();
    });
    it('should have a addProduct method', function () {
        expect(store.addProduct).toBeDefined();
    });
    it('should have a deleteProduct method', function () {
        expect(store.deleteProduct).toBeDefined();
    });
    it('should have a updateProduct method', function () {
        expect(store.updateProduct).toBeDefined();
    });
    it('should have a getProducts method', function () {
        expect(store.getProducts).toBeDefined();
    });
    it('should have a getProductsByOrder method', function () {
        expect(store.getProductsByOrder).toBeDefined();
    });
    it('Should have a method to mark a product in an order as fulfilled', function () {
        expect(store.markFulfilled).toBeDefined();
    });
    it('Index shall return a list of orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.index()];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create method shall create an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, order_product, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = {
                        user_id_: 1,
                    };
                    order_product = {
                        order_id: 1,
                        product_id: 1,
                        quantity: 1,
                    };
                    return [4 /*yield*/, store.create(order, [order_product])];
                case 1:
                    result = _a.sent();
                    expect(result.user_id_).toEqual(order.user_id_);
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method shall return an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.show(1)];
                case 1:
                    result = _a.sent();
                    expect(result.user_id_).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update method shall update an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = {
                        user_id_: 2,
                    };
                    return [4 /*yield*/, store.updateOrder(1, order)];
                case 1:
                    result = _a.sent();
                    expect(result.user_id_).toEqual(order.user_id_);
                    return [2 /*return*/];
            }
        });
    }); });
    it('getOrdersByUser method shall return a list of orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.getOrdersByUser(2)];
                case 1:
                    result = _a.sent();
                    expect(result).toHaveSize(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('markFulfilled method shall mark a product in an order as fulfilled', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.markFulfilled(1, true)];
                case 1:
                    result = _a.sent();
                    expect(result.fulfilled).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('addProduct method shall add a product to an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orderProduct, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderProduct = {
                        order_id: 1,
                        product_id: 1,
                        quantity: 1,
                    };
                    return [4 /*yield*/, store.addProduct(orderProduct.order_id, orderProduct)];
                case 1:
                    result = _a.sent();
                    expect(result.order_id).toEqual(orderProduct.order_id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('updateProduct method shall update a product in an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orderProduct, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderProduct = {
                        order_id: 1,
                        product_id: 1,
                        quantity: 2,
                    };
                    return [4 /*yield*/, store.updateProduct(1, orderProduct)];
                case 1:
                    result = _a.sent();
                    expect(result.quantity).toEqual(orderProduct.quantity);
                    return [2 /*return*/];
            }
        });
    }); });
    it('deleteProduct method shall delete a product from an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resultA, resultB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.getProducts()];
                case 1:
                    resultA = (_a.sent()).length;
                    return [4 /*yield*/, store.deleteProduct(1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, store.getProducts()];
                case 3:
                    resultB = (_a.sent()).length;
                    expect(resultA - resultB).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('getProducts method shall return a list of all products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.getProducts()];
                case 1:
                    result = _a.sent();
                    expect(result.length).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, reset_data_1.default)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
