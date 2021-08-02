import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import ListPetRecentsService from "@modules/pets/services/ListPetRecentsService";

export default class PetRecentController{

    public async index(req: Request, res: Response) : Promise<Response>{
        
        const user_id = req.user.id;

        const listPetRecentsService = container.resolve(ListPetRecentsService);

        const pets = await listPetRecentsService.execute({userId: user_id});

        return res.json({ pets: classToClass(pets) });
    }

}