import { inject, injectable } from "tsyringe";

import IPetsRepository from "../repositories/IPetsRepository";
import AppError from "@shared/erros/AppError";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IPetImagesRepository from "../repositories/IPetImagesRepository";
import IAdoptionRequestsRepository from "@modules/users/repositories/IAdoptionRequestsRepository";

interface IDeletePetServiceProps {
    petId: string;
    userId: string;
}

@injectable()
class DeletePetService{

    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider,

        @inject("PetImagesRepository")
        private petImagesRepository: IPetImagesRepository,

        @inject('AdoptionRequestsRepository')
        private adoptionRequestsRepository: IAdoptionRequestsRepository,
    ){}

    public async execute({petId, userId}: IDeletePetServiceProps): Promise<void>{
        
        const pet = await this.petsRepository.findById(petId);

        if(!pet){
            throw new AppError('Pet não encontrada!', 400);
        }

        if(pet.tutor_id !== userId){
            throw new AppError('Você não possui autorização!', 403);
        }

        await this.adoptionRequestsRepository.deleteRequestsByPetId(petId);

        if(pet.images){
            for (const image of pet.images) {
                await this.storageProvider.deleteFile(image.path);
                await this.petImagesRepository.delete(image);
            }
        }

        await this.petsRepository.delete(pet);
    }

}

export default DeletePetService;