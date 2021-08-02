import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import multer from 'multer';

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

import PetController from "../controllers/PetController";
import PetRecentController from "../controllers/PetRecentController";

import uploadConfig from "@config/upload";

const petRouter = Router();
const petController = new PetController();
const petRecentController = new PetRecentController();
const upload = multer(uploadConfig);

petRouter.use(ensureAuthenticated);

petRouter.post('/', 
    upload.array('images'),
    //  celebrate({
    //     [Segments.BODY]: {
    //         name: Joi.string().required(),
    //         gender: Joi.string().valid('male', 'female').required(),
    //         color: Joi.string().required(),
    //         age: Joi.number().required(),
    //         breedId: Joi.string().required(),
    //     },
    // }),
    petController.create
);

petRouter.get('/recent', petRecentController.index);

petRouter.get('/:id', petController.show);

petRouter.get('/', petController.index);

export default petRouter;