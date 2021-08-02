import ICreateBreedDTO from "@modules/pets/dtos/ICreateBreedDTO";
import Breed, { Type } from "@modules/pets/infra/typeorm/entities/Breed";
import { uuid } from "uuidv4";
import IBreedsRepository from "../IBreedsRepository";

class FakeBreedsRepository implements IBreedsRepository{

    private breeds: Breed[] = [];

    public async findById(id: string): Promise<Breed | undefined>{
        return this.breeds.find(breed => breed.id === id);
    }

    public async create({ name, type }: ICreateBreedDTO): Promise<Breed>{
        const breed = new Breed();
        breed.id = uuid();
        breed.name = name;
        breed.type = Type[type];
        this.breeds.push(breed);
        return breed;
    }
}

export default FakeBreedsRepository;