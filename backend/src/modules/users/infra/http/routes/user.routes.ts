import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import multer from 'multer';

import UserController from "../controllers/UserController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import uploadConfig from "@config/upload";

const upload = multer(uploadConfig);
const userRouter = Router();
const userController = new UserController();

userRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        cityId: Joi.string().required(),
        phone: Joi.string().min(11).max(11).required()
    },
  }),
  userController.create
);
userRouter.use(ensureAuthenticated);
userRouter.get('/', userController.show);
userRouter.put('/', upload.single('avatar'), celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        cityId: Joi.string().required(),
        phone: Joi.string().min(11).max(11).required()
    },
  }),userController.update);

export default userRouter;