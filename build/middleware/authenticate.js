"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var authorize = function (_req, res, next) {
    try {
        var authHeader = _req.headers['authorization'];
        var token = authHeader.split(' ')[1];
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        _req.body.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Failed authentication' });
    }
};
exports.default = authorize;
