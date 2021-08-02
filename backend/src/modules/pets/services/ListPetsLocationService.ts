import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";
import Pet from "../infra/typeorm/entities/Pet";
import IPetsRepository from "../repositories/IPetsRepository";

interface IRequest{
    cityId?: string;
    userId?: string;
}

@injectable()
class ListPetsLocationService{
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
        // else if(!cityId && !userId){
        //     throw new AppError('Parametros de busca inválidos', 501);
        // }

        return await this.petsRepository.findByLocation(cityId as string);
    }
}

export default ListPetsLocationService;