import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import User from "../entities/User";

class UsersRepository implements IUsersRepository{
    private usersRepository: Repository<User>;

    constructor(){
        this.usersRepository = getRepository(User);
    }

    public async create({name, email, password, cityId, phone}: ICreateUserDTO): Promise<User>{
        const user = this.usersRepository.create({name, email, password, city_id: cityId, phone});
        return this.usersRepository.save(user);
    }

    public async findById(id: string): Promise<User | undefined>{
        return await this.usersRepository.findOne({
            where: { id: id },
            relations: ['city'],
        });
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const user = await this.usersRepository.findOne({
            where: { email },
            relations: ['city'],
        });
        return user;
    }

    public async save(user: User): Promise<User>{
        return this.usersRepository.save(user);
    }


}

export default UsersRepository;