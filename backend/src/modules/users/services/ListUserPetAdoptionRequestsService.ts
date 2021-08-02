import { inject, injectable } from "tsyringe";

import AdoptionRequest from "@modules/users/infra/typeorm/entities/AdoptionRequest";
import IAdoptionRequestsRepository from "@modules/users/repositories/IAdoptionRequestsRepository";


@injectable()
class ListUserPetAdoptionRequestsService{

    constructor(
        @inject('AdoptionRequestsRepository')
        private adoptionRequestsRepository: IAdoptionRequestsRepository,
    ){}

    public async execute(userId: string): Promise<AdoptionRequest[]>{
        return await this.adoptionRequestsRepository.findReceiverByUserPet(userId);
    }

}

export default ListUserPetAdoptionRequestsService;