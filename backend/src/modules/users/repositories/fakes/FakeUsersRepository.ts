import { uuid } from 'uuidv4';

import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../IUsersRepository";

class FakeUsersRepository implements IUsersRepository{

    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined>{
        const findUser = this.users.find(user => user.id === id);
        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const findUser = this.users.find(user => user.email === email);
        return findUser;
    }

    public async create({name, email, password, cityId} : ICreateUserDTO) : Promise<User> {
        const user = new User();
        user.id = uuid();
        user.name = name;
        user.email = email;
        user.password = password;
        user.city_id = cityId;
        this.users.push(user);
        return user;
    }

    public async save(user: User): Promise<User>{
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );
      
        this.users[findIndex] = user;
      
        return user;
    }
}

export default FakeUsersRepository;