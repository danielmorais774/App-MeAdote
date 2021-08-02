import { inject, injectable } from "tsyringe";

import AdoptionRequest, { Status } from "../infra/typeorm/entities/AdoptionRequest";

import IAdoptionRequestsRepository from "../repositories/IAdoptionRequestsRepository";
import ICreateAdoptionRequestDTO from "../dtos/ICreateAdoptionRequestDTO";
import IPetsRepository from "@modules/pets/repositories/IPetsRepository";
import AppError from "@shared/erros/AppError";

@injectable()
class CreateUserAdoptionRequestService {

    constructor(
        @inject('AdoptionRequestsRepository')
        private adoptionRequestsRepository: IAdoptionRequestsRepository,

        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

    ){}

    public async execute({ userId, petId } : ICreateAdoptionRequestDTO) : Promise<AdoptionRequest>{

        const infoPet = await this.petsRepository.findById(petId);

        if(!infoPet){
            throw new AppError('Não foi possivel encontrar o pet', 400);
        }

        if(infoPet.tutor_id === userId){
            throw new AppError('Você não pode enviar uma solicitação para você mesmo.', 400);
        }

        return await this.adoptionRequestsRepository.create({
            userId,
            petId,
            status: Status.REQUESTED
        });
    }

}

export default CreateUserAdoptionRequestService;