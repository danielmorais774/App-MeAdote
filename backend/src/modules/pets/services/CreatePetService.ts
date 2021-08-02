import { inject, injectable } from "tsyringe";

import ICreatePetDTO from "../dtos/ICreatePetDTO";
import IPetsRepository from "../repositories/IPetsRepository";
import IBreedsRepository from "../repositories/IBreedsRepository";
import AppError from "@shared/erros/AppError";
import Pet, { Gender } from "../infra/typeorm/entities/Pet";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IPetImagesRepository from "../repositories/IPetImagesRepository";
import PetImage from "../infra/typeorm/entities/PetImage";

@injectable()
class CreatePetService{

    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

        @inject('BreedsRepository')
        private breedsRepository: IBreedsRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider,

        @inject("PetImagesRepository")
        private petImagesRepository: IPetImagesRepository,
    ){}

    public async execute({ name, age, color, gender, breedId, tutorId, images }: ICreatePetDTO): Promise<Pet>{
        
        const breedExisted = await this.breedsRepository.findById(breedId);

        if(!breedExisted){
            throw new AppError('Raça não encontrada!', 501);
        }

        const pet = await this.petsRepository.create({
            name,
            gender,
            color,
            age,
            breedId,
            tutorId
        });

        let urlImages: PetImage[] = [];

        if(images){
            for (const image of images) {
                const filename = await this.storageProvider.saveFile(image.filename);
                const petImage = await this.petImagesRepository.create({petId: pet.id, path: filename});
                urlImages.push(petImage);
            }
        }
        
        return {...pet, images: urlImages};
    }

}

export default CreatePetService;