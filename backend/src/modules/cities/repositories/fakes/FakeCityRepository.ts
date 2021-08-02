import ICreateCityDTO from "@modules/cities/dtos/ICreateCityDTO";
import City from "@modules/cities/infra/typeorm/entities/City";
import { uuid } from "uuidv4";
import ICityRepository from "../ICityRepository";

class FakeCityRepository implements ICityRepository {

    private cities: City[] = [];

    public async create({name, state}: ICreateCityDTO): Promise<City>{
        const city = new City();
        city.id = uuid();
        city.name = name;
        city.state = state;
        this.cities.push(city);
        return city;
    }

    public async findAll(): Promise<City[]>{
        return this.cities;
    }

    public async findById(id: string): Promise<City | undefined>{
        return this.cities.find(city => city.id === id);
    }
}

export default FakeCityRepository;