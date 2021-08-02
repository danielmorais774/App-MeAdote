import { Router } from "express";
import CityController from "../controllers/CityController";

const cityRouter = Router();
const cityController = new CityController();

cityRouter.get('/', cityController.index);

export default cityRouter;