import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import ListCitiesService from "@modules/cities/services/ListCitiesService";

export default class CityController{

    public async index(req: Request, res: Response) : Promise<Response>{
        
        const listCitiesService = container.resolve(ListCitiesService);

        const cities = await listCitiesService.execute();

        return res.json({ cities: classToClass(cities)});
    }
}