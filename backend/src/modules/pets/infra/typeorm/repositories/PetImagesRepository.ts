import { createQueryBuilder, getRepository, Repository } from "typeorm";

import ICreatePetImageDTO from "@modules/pets/dtos/ICreatePetImageDTO";
import IPetImagesRepository from "@modules/pets/repositories/IPetImagesRepository";

import PetImage from "../entities/PetImage";


class PetImagesRepository implements IPetImagesRepository{

    private petImagesRepository: Repository<PetImage>;

    constructor(){
        this.petImagesRepository = getRepository(PetImage);
    }

    public async findById(id: string): Promise<PetImage | undefined>{
        return await this.petImagesRepository.findOne(id);
    }
 
    public async create({ petId, path }: ICreatePetImageDTO): Promise<PetImage>{
        const petImage = this.petImagesRepository.create({
            pet_id: petId,
            path
        });

        return await this.petImagesRepository.save(petImage);
    }

    public async delete(petImage: PetImage): Promise<void>{
        await this.petImagesRepository.delete(petImage);
    }

}

export default PetImagesRepository;