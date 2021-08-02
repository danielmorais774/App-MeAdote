import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import UserPetAdoptionRequestController from "../controllers/UserPetAdoptionRequestController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userPetAdoptionRoutes = Router();
const userPetAdoptionRequestController = new UserPetAdoptionRequestController();

userPetAdoptionRoutes.use(ensureAuthenticated);

userPetAdoptionRoutes.patch('/:adoptionRequestId', celebrate({
    [Segments.PARAMS]: {
        adoptionRequestId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
        status: Joi.string().valid('accepted', 'refused').required()
    },
  }),
  userPetAdoptionRequestController.edit
);

userPetAdoptionRoutes.get(
    '/',
    userPetAdoptionRequestController.index
);

export default userPetAdoptionRoutes;