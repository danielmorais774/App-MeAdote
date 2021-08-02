"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var express_1 = require("express");
var UserController_1 = __importDefault(require("../controllers/UserController"));
var userRouter = express_1.Router();
var userController = new UserController_1.default();
userRouter.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
        cityId: celebrate_1.Joi.string().required()
    },
    _a)), userController.create);
exports.default = userRouter;
