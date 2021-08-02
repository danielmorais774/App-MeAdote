import paginate from "@config/paginate";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";
import IPaginationReponseDTO from "../dtos/IPaginationReponseDTO";
import Pet from "../infra/typeorm/entities/Pet";
import IPetsRepository from "../repositories/IPetsRepository";

interface IRequest{
    cityId?: string;
    userId?: string;
    page?: number;
    limit?: number;
}


@injectable()
class ListPetsService{
    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({cityId, userId, page = 1, limit = paginate.limit}: IRequest): Promise<IPaginationReponseDTO>{

        // Caso o parametro cityId seja null, então é usado o userId para buscar a localização
        if(!cityId && userId){
            const userInfo = await this.usersRepository.findById(userId);

            if(!userInfo){
                throw new AppError('Usuário não encontrado', 400);
            }

            cityId = userInfo.city_id;
        }

        const {data, total} = await this.petsRepository.findAllAndCount({ cityId: cityId, page, limit });
        const lastPage = Math.ceil(total / limit);

        return {
            data,
            total,
            currentPage: page,
            lastPage,
            perPage: limit
        };
    }
}

export default ListPetsService;