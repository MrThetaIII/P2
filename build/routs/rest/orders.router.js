"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var order_controller = __importStar(require("../../controllers/orders.controller"));
var authenticate_1 = __importDefault(require("../../middleware/authenticate"));
var order_router = (0, express_1.Router)();
order_router.patch('/fulfill/:id', authenticate_1.default, order_controller.markFulfilled);
order_router.get('/all', authenticate_1.default, order_controller.index);
order_router.get('/:id', authenticate_1.default, order_controller.show);
order_router.delete('/:id', authenticate_1.default, order_controller.destroy);
order_router.patch('/:id', authenticate_1.default, order_controller.update);
order_router.get('/', authenticate_1.default, order_controller.getOrdersByUser);
order_router.post('/', authenticate_1.default, order_controller.create);
exports.default = order_router;
