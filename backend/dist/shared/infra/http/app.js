"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var celebrate_1 = require("celebrate");
// import uploadConfig from "@config/upload";
var AppError_1 = __importDefault(require("@shared/erros/AppError"));
var v1_1 = __importDefault(require("./routes/api/v1"));
require("@shared/infra/database/typeorm");
require("@shared/container");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
// app.use("/files", express.static(uploadConfig.uploadsFolder));
// app.use(rateLimiter);
app.use('/api/v1', v1_1.default);
app.use(celebrate_1.errors());
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});
exports.default = app;
