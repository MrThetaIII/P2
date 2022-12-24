"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_router_1 = __importDefault(require("./rest/users.router"));
var products_router_1 = __importDefault(require("./rest/products.router"));
var orders_router_1 = __importDefault(require("./rest/orders.router"));
var router = (0, express_1.Router)();
router.use('/users', users_router_1.default);
router.use('/products', products_router_1.default);
router.use('/orders', orders_router_1.default);
exports.default = router;
