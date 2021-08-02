import ICityRepository from "@modules/cities/repositories/ICityRepository";
import { getRepository, Repository } from "typeorm";
import City from "../entities/City";

class CityRepository implements ICityRepository{

    private cityRepository: Repository<City>;

    constructor(){
        this.cityRepository = getRepository(City);
    }

    public async findAll(): Promise<City[]>{
        return await this.cityRepository.find();
    }

    public async findById(id: string): Promise<City | undefined>{
        return await this.cityRepository.findOne(id);
    }

}

export default CityRepository;