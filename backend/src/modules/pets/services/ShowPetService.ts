import { inject, injectable } from "tsyringe";

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import Pet from "../infra/typeorm/entities/Pet";
import AppError from "@shared/erros/AppError";

interface IRequest{
    petId: string;
    userId: string;
}

@injectable()
class ShowPetService{

    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,
    ){}

    public async execute({petId, userId}: IRequest): Promise<Pet>{
        const petInfo = await this.petsRepository.findById(petId, userId);

        if(!petInfo){
            throw new AppError('Pet não encontrado', 400);
        }

        return petInfo;
    }
}

export default ShowPetService;