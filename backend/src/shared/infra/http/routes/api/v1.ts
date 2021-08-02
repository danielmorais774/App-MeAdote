import { Router } from "express";
import 'express-group-routes';

import authRouter from '@modules/users/infra/http/routes/auth.routes';
import userRouter from "@modules/users/infra/http/routes/user.routes";
import userAdoptionRouter from "@modules/users/infra/http/routes/userAdoption.routes";
import petRouter from "@modules/pets/infra/http/routes/pet.routes";
import pagination from "../../middlewares/pagination";
import userPetAdoptionRoutes from "@modules/users/infra/http/routes/userPetAdoption.routes";
import cityRouter from "@modules/cities/infra/http/routes/city.routes";



const routes = Router();

routes.use('/auth', authRouter);
routes.use('/user', userRouter);
routes.use('/user/adoptionRequestsReceived', userPetAdoptionRoutes);
routes.use('/user/adoptionRequests', userAdoptionRouter);
routes.use('/city', cityRouter);

routes.use(pagination);
routes.use('/pets', petRouter);

export default routes;

