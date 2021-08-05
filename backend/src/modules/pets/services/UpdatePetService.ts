import { inject, injectable } from "tsyringe";

import IPetsRepository from "../repositories/IPetsRepository";
import IBreedsRepository from "../repositories/IBreedsRepository";
import AppError from "@shared/erros/AppError";
import Pet, { Gender } from "../infra/typeorm/entities/Pet";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IPetImagesRepository from "../repositories/IPetImagesRepository";
import PetImage from "../infra/typeorm/entities/PetImage";
import IUpdatePetDTO from "../dtos/IUpdatePetDTO";

@injectable()
class UpdatePetService{

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

    public async execute(id: string, { name, age, color, gender, breedId, images, imagesDeleted, userId }: IUpdatePetDTO): Promise<Pet>{
        
        const breedExisted = await this.breedsRepository.findById(breedId);

        if(!breedExisted){
            throw new AppError('Raça não encontrada!', 400);
        }

        const pet = await this.petsRepository.findById(id);

        if(!pet){
            throw new AppError('Pet não encontrada!', 400);
        }

        if(pet.tutor_id !== userId){
            throw new AppError('Pet não pertence a você!', 403);
        }

        pet.name = name;
        pet.age = age;
        pet.color = color;
        pet.gender = Gender[gender];
        pet.breed_id = breedId;
       
        const petUpdated = await this.petsRepository.save(pet);

        if(imagesDeleted){
            for(const imageId of imagesDeleted){
                const image = await this.petImagesRepository.findById(imageId);
                if(image){
                    await this.storageProvider.deleteFile(image.path);
                    await this.petImagesRepository.delete(image);
                }
            }
        }

        let urlImages: PetImage[] = [];

        for(const image of pet.images){
            if(!imagesDeleted?.includes(image.id)){
                urlImages.push(image);
            }
        }

        if(images){
            for (const image of images) {
                const filename = await this.storageProvider.saveFile(image.filename);
                const petImage = await this.petImagesRepository.create({petId: pet.id, path: filename});
                urlImages.push(petImage);
            }
        }
        
        return {...petUpdated, images: urlImages};
    }

}

export default UpdatePetService;