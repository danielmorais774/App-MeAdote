import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";
import Pet from "../infra/typeorm/entities/Pet";
import IPetsRepository from "../repositories/IPetsRepository";

interface IRequest{
    userId: string;
}

@injectable()
class ListUserPetsService{
    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({userId}: IRequest): Promise<Pet[]>{

        return await this.petsRepository.findByTutorId(userId);

    }
}

export default ListUserPetsService;