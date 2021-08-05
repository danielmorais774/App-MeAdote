import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import ListPetsService from "@modules/pets/services/ListPetsService";
import ListUserPetsService from "@modules/pets/services/ListUserPetsService";

export default class UserPetsController{

    public async index(req: Request, res: Response) : Promise<Response>{
        
        const user_id = req.user.id;

        const listUserPetsService = container.resolve(ListUserPetsService);

        const pets = await listUserPetsService.execute({userId: user_id});

        return res.json({ pets: classToClass(pets)});
    }

}