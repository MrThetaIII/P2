"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_router_1 = __importDefault(require("./routs/index.router"));
var body_parser_1 = __importDefault(require("body-parser"));
var port = 3000;
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api', index_router_1.default);
app.get('*', function (req, res) {
    res.send('Not a valid rout.');
});
app.listen(port, function () {
    console.log("Started at http://localhost:".concat(port));
});
exports.default = app;
