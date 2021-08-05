import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import ListBreedsService from "@modules/pets/services/ListBreedsService";

export default class BreedController{

    public async index(req: Request, res: Response) : Promise<Response>{
        
        const listBreedsService = container.resolve(ListBreedsService);

        const breeds = await listBreedsService.execute();

        return res.json({ breeds: classToClass(breeds)});
    }

}