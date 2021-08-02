import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import CreatePetService from "@modules/pets/services/CreatePetService";
import { capitalize } from "@shared/utils/capitalize";
import PetsRepository from "../../typeorm/repositories/PetsRepository";
import ListPetsLocationService from "@modules/pets/services/ListPetsLocationService";
import ListPetsService from "@modules/pets/services/ListPetsService";
import ShowPetService from "@modules/pets/services/ShowPetService";

export default class PetController{

    public async index(req: Request, res: Response) : Promise<Response>{
        
        const user_id = req.user.id;
        const page = req.body.page;
        const limit = req.body.limit;

        // const listPetsLocationService = container.resolve(ListPetsLocationService);
        const listPetsService = container.resolve(ListPetsService);

        const response = await listPetsService.execute({userId: user_id, page: page, limit: limit});

        return res.json({ ...response, data: classToClass(response.data)});
    }

    public async show(req: Request, res: Response) : Promise<Response>{
        
        const { id } = req.params;

        // const listPetsLocationService = container.resolve(ListPetsLocationService);
        const showPetService = container.resolve(ShowPetService);

        const pet = await showPetService.execute(id);

        return res.json({ pet: classToClass(pet) });
    }

    public async create(req: Request, res: Response) : Promise<Response>{
        
        const user_id = req.user.id;
        const { name, gender, age, color, breedId } = req.body;

        const createPetService = container.resolve(CreatePetService);

        const pet = await createPetService.execute({
            name,
            gender: capitalize(gender) as 'Male' | 'Female',
            age,
            color,
            breedId,
            tutorId: user_id,
            images: req.files as Express.Multer.File[],
        });

        return res.json({ pet: classToClass(pet)});
    }
}