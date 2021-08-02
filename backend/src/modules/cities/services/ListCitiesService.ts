import { inject, injectable } from "tsyringe";
import City from "../infra/typeorm/entities/City";
import ICityRepository from "../repositories/ICityRepository";

@injectable()
class ListCitiesService{

    constructor(
        @inject('CityRepository') 
        private cityRepository: ICityRepository
    ){}

    public async execute(): Promise<City[]>{
        return await this.cityRepository.findAll();
    }
}

export default ListCitiesService;