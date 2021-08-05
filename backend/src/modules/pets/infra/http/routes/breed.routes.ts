import { Router } from "express";

import BreedController from "../controllers/BreedController";

const breedRouter = Router();
const breedController = new BreedController();

breedRouter.get('/', breedController.index);

export default breedRouter;