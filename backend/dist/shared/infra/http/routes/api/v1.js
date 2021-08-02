"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("express-group-routes");
var auth_routes_1 = __importDefault(require("@modules/users/infra/http/routes/auth.routes"));
var user_routes_1 = __importDefault(require("@modules/users/infra/http/routes/user.routes"));
var routes = express_1.Router();
routes.use('/auth', auth_routes_1.default);
routes.use('/user', user_routes_1.default);
exports.default = routes;
