import { inject, injectable } from "tsyringe";

import AdoptionRequest, { Status } from "../infra/typeorm/entities/AdoptionRequest";

import IAdoptionRequestsRepository from "../repositories/IAdoptionRequestsRepository";
import ICreateAdoptionRequestDTO from "../dtos/ICreateAdoptionRequestDTO";
import IPetsRepository from "@modules/pets/repositories/IPetsRepository";
import AppError from "@shared/erros/AppError";
import IEditAdoptionRequestDTO from "../dtos/IEditAdoptionRequestDTO";

interface IRequest{
    id: string;
    userId: string;
    status: 'CANCELED';
}

@injectable()
class EditUserStatusAdoptionRequestService {

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

        if(infoAdoptionRequest.user_id !== userId){
            throw new AppError('Este pedido de adoção não pertence a você.', 403);
        }

        return await this.adoptionRequestsRepository.editStatusById({
            id,
            status: Status[status]
        });
    }

}

export default EditUserStatusAdoptionRequestService;