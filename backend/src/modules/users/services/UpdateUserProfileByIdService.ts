import ICityRepository from "@modules/cities/repositories/ICityRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import AppError from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    name: string;
    cityId: string;
    phone: string;
    avatar?: string;
}

@injectable()
class UpdateUserProfileByIdService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CityRepository')
        private cityRepository: ICityRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider,
    ){}

    public async execute(id: string, {name, cityId, phone, avatar}: IRequest): Promise<User>{
        const user = await this.usersRepository.findById(id);

        if(!user){
            throw new AppError('Usuário não encontrado!');
        }

        const city = await this.cityRepository.findById(cityId);

        if(!city){
            throw new AppError('Cidade não encontrada!');
        }

        user.name = name;
        user.phone = phone;
        
        user.city = city;
        user.city_id = cityId;

        if(avatar){
            if(user.avatar){
                await this.storageProvider.deleteFile(user.avatar);
            }

            const filename = await this.storageProvider.saveFile(avatar);
            user.avatar = filename;
        }

    
        return await this.usersRepository.save(user);
    }
}

export default UpdateUserProfileByIdService;