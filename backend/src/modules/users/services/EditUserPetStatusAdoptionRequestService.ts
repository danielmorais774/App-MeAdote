import { inject, injectable } from "tsyringe";

import AdoptionRequest, { Status } from "../infra/typeorm/entities/AdoptionRequest";
import { Status as PetStatus } from "@modules/pets/infra/typeorm/entities/Pet";

import IAdoptionRequestsRepository from "../repositories/IAdoptionRequestsRepository";
import ICreateAdoptionRequestDTO from "../dtos/ICreateAdoptionRequestDTO";
import IPetsRepository from "@modules/pets/repositories/IPetsRepository";
import AppError from "@shared/erros/AppError";
import IEditAdoptionRequestDTO from "../dtos/IEditAdoptionRequestDTO";

interface IRequest{
    id: string;
    userId: string;
    status: 'ACCEPTED' | 'REFUSED' | 'ADOPTED';
}

@injectable()
class EditUserPetStatusAdoptionRequestService {

    constructor(
        @inject('AdoptionRequestsRepository')
        private adoptionRequestsRepository: IAdoptionRequestsRepository,

        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

    ){}

    public async execute({ id, userId, status} : IRequest) : Promise<AdoptionRequest>{

        const infoAdoptionRequest = await this.adoptionRequestsRepository.findById(id);

        if(!infoAdoptionRequest){
            throw new AppError('Não foi possivel achar o pedido de adoção.', 400);
        }

        const infoPet = await this.petsRepository.findById(infoAdoptionRequest.pet_id);

        if(!infoPet || infoPet.tutor_id !== userId){
            throw new AppError('Este pedido de adoção não pertence a você.', 403);
        }

        if(status === 'ADOPTED'){
            infoPet.status = PetStatus.DISABLE;
            await this.petsRepository.save(infoPet);
        }

        return await this.adoptionRequestsRepository.editStatusById({
            id,
            status: Status[status]
        });
    }

}

export default EditUserPetStatusAdoptionRequestService;