import { getRepository, Repository } from "typeorm";

import ICreateBreedDTO from "@modules/pets/dtos/ICreateBreedDTO";
import ICreatePetDTO from "@modules/pets/dtos/ICreatePetDTO";
import IBreedsRepository from "@modules/pets/repositories/IBreedsRepository";

import Breed, { Type } from "../entities/Breed";

class BreedsRepository implements IBreedsRepository{

    private breedsRepository: Repository<Breed>;

    constructor(){
        this.breedsRepository = getRepository(Breed);
    }

    public async findById(id: string): Promise<Breed | undefined>{
        const breed = await this.breedsRepository.findOne(id);
        return breed;
    }

    public async create({ name, type }: ICreateBreedDTO): Promise<Breed>{
        const breed = this.breedsRepository.create({
            name, 
            type: Type[type],
        });

        return await this.breedsRepository.save(breed);
    }

}

export default BreedsRepository;