import City from "@modules/cities/infra/typeorm/entities/City";
import ICityRepository from "@modules/cities/repositories/ICityRepository";
import AppError from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface IResquest{
    name: string;
    email: string;
    password: string;
    cityId: string;
    phone: string;
}

@injectable()
class CreateUserService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CityRepository')
        private cityRepository: ICityRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({name, email, password, cityId, phone}: IResquest): Promise<User>{
        const checkUser = await this.usersRepository.findByEmail(email);

        if(checkUser){
            throw new AppError('Já existe um usuário cadastrado com este e-mail.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        try{
            let user = await this.usersRepository.create({
                name,
                email,
                password: hashedPassword,
                cityId,
                phone
            });

            const cityInfo = await this.cityRepository.findById(user.city_id);

            user.city = cityInfo as City;

            return user;
        }catch{
            throw new AppError('Erro ao criar um usuário.', 501);
        }
        
    }
}

export default CreateUserService;