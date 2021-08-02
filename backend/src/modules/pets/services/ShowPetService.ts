import { inject, injectable } from "tsyringe";

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import Pet from "../infra/typeorm/entities/Pet";
import AppError from "@shared/erros/AppError";

@injectable()
class ShowPetService{

    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,
    ){}

    public async execute(id: string): Promise<Pet>{
        const petInfo = await this.petsRepository.findById(id);

        if(!petInfo){
            throw new AppError('Pet não encontrado', 400);
        }

        return petInfo;
    }
}

export default ShowPetService;