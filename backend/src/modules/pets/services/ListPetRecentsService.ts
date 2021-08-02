import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";
import Pet from "../infra/typeorm/entities/Pet";
import IPetsRepository from "../repositories/IPetsRepository";

interface IRequest{
    cityId?: string;
    userId?: string;
    page?: number;
    limit?: number;
}


@injectable()
class ListPetRecentsService{
    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({cityId, userId}: IRequest): Promise<Pet[]>{

        // Caso o parametro cityId seja null, então é usado o userId para buscar a localização
        if(!cityId && userId){
            const userInfo = await this.usersRepository.findById(userId);

            if(!userInfo){
                throw new AppError('Usuário não encontrado', 400);
            }

            cityId = userInfo.city_id;
        }

        return await this.petsRepository.findByRecent({ cityId: cityId });
    }
}

export default ListPetRecentsService;