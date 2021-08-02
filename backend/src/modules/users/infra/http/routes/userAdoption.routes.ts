import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import UserAdoptionRequestController from "../controllers/UserAdoptionRequestController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userAdoptionRouter = Router();
const userAdoptionRequestController = new UserAdoptionRequestController();

userAdoptionRouter.use(ensureAuthenticated);


userAdoptionRouter.post('/', celebrate({
    [Segments.BODY]: {
        petId: Joi.string().required()
    },
  }),
  userAdoptionRequestController.create
);

userAdoptionRouter.patch('/:adoptionRequestId', celebrate({
    [Segments.PARAMS]: {
        adoptionRequestId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
        status: Joi.string().valid('canceled').required()
    },
  }),
  userAdoptionRequestController.edit
);

userAdoptionRouter.get(
    '/',
    userAdoptionRequestController.index
);

export default userAdoptionRouter;