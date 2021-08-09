import { inject, injectable } from "tsyringe";

import City from "@modules/cities/infra/typeorm/entities/City";
import AppError from "@shared/erros/AppError";
import User from "../infra/typeorm/entities/User";

import IUsersRepository from "../repositories/IUsersRepository";
import ICityRepository from "@modules/cities/repositories/ICityRepository";


@injectable()
class ShowUserProfileById{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CityRepository')
        private cityRepository: ICityRepository,
    ){}

    public async execute(id: string): Promise<User>{
        const user = await this.usersRepository.findById(id);

        if(!user){
            throw new AppError('Usuário não encontrado.');
        }

        return user;
    }
}

export default ShowUserProfileById;