import paginate from "@config/paginate";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";
import IPaginationReponseDTO from "../dtos/IPaginationReponseDTO";
import Breed from "../infra/typeorm/entities/Breed";
import Pet from "../infra/typeorm/entities/Pet";
import IBreedsRepository from "../repositories/IBreedsRepository";
import IPetsRepository from "../repositories/IPetsRepository";


@injectable()
class ListBreedsService{
    constructor(
        @inject('BreedsRepository')
        private breedsRepository: IBreedsRepository,
    ){}

    public async execute(): Promise<Breed[]>{

        const breeds = await this.breedsRepository.findAll();

        return breeds;
    }
}

export default ListBreedsService;