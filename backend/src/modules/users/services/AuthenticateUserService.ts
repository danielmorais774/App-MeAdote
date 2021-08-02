import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken';

import AppError from "@shared/erros/AppError";
import authConfig from '@config/auth';

import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";

interface IRequest{
    email: string,
    password: string;
}

interface IResponse{
    user: User,
    token: string;
}

@injectable()
class AuthenticateUserService{

    constructor(
        @inject('UsersRepository') 
        private usersRepository: IUsersRepository, 

        @inject('HashProvider') 
        private hashProvider: IHashProvider
    ){}

    public async execute({email, password}: IRequest) : Promise<IResponse>{
        
        const userInfo =  await this.usersRepository.findByEmail(email);
        
        if(!userInfo){
            throw new AppError('combinação de email/password incorreto.', 401);
        }

        const passwordMatch = await this.hashProvider.compareHash(
            password,
            userInfo.password,
        );

        if(!passwordMatch){
            throw new AppError('combinação de email/password incorreto.', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: userInfo.id,
            expiresIn,
        });

        return { user: userInfo, token };
    }

}


export default AuthenticateUserService;