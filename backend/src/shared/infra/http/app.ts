import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from 'celebrate';



import uploadConfig from "@config/upload";
import AppError from "@shared/erros/AppError";
import routes from "./routes/api/v1";

import "@shared/infra/database/typeorm";
import "@shared/container";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(uploadConfig.uploadsFolder));
// app.use(rateLimiter);

app.use('/api/v1', routes);



app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.log(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
