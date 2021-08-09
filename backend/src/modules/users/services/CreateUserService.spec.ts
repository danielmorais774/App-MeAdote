import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from "../infra/typeorm/entities/User";
import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";


let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        fakeHashProvider = new FakeHashProvider();
        createUserService = new CreateUserService(fakeUsersRepository, fakeCityRepository, fakeHashProvider);
    });

    it('should be able to create user', async () => {
        const params = {
            name: 'Fortaleza', 
            state: 'CE'
        };
        const cityFake = await fakeCityRepository.create(params)

        const userFake = await createUserService.execute({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: cityFake.id
        });

        expect(userFake).toHaveProperty('id');
        expect(userFake.name).toBe('Daniel Morais');
        expect(userFake.city).toBe(cityFake);
    });

    it('should be able to create user with email existed', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: '2e09dc4e-83de-4ade-9ad5-dc8f6c620c93'
        });

        const userCreate = createUserService.execute({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: '2e09dc4e-83de-4ade-9ad5-dc8f6c620c93'
        });

        await expect(userCreate).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create user with exeception', async () => {
        const fakeUsersRepositoryMock = new FakeUsersRepository();
        fakeUsersRepositoryMock.create = async (data: ICreateUserDTO) : Promise<User> => {
            throw new AppError('Error');
        }

        const createUserServiceMock = new CreateUserService(fakeUsersRepositoryMock, fakeCityRepository, fakeHashProvider);

        const userCreate = createUserServiceMock.execute({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: '2e09dc4e-83de-4ade-9ad5-dc8f6c620c93'
        });

        await expect(userCreate).rejects.toBeInstanceOf(AppError);
    });

    // it('should be able to create user, but return default user', async () => {
    //     const fakeUsersRepositoryMock = new FakeUsersRepository();
    //     fakeUsersRepositoryMock.findById = async (id: string) : Promise<User | undefined> => {
    //         throw undefined;
    //     }
        
    //     const createUserServiceMock = new CreateUserService(fakeUsersRepositoryMock, fakeCityRepository, fakeHashProvider);

    //     const userCreate = await createUserServiceMock.execute({
    //         name: 'Daniel Morais',
    //         email: 'daniel@email.com',
    //         password: '12345678',
    //         cityId: '2e09dc4e-83de-4ade-9ad5-dc8f6c620c93'
    //     });

    //     expect(userCreate).rejects.toBeInstanceOf(AppError);
    // });
});