import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/erros/AppError";
import User from "../infra/typeorm/entities/User";

import ShowUserProfileByIdService from "./ShowUserProfileByIdService";
import UpdateUserProfileByIdService from "./UpdateUserProfileByIdService";

let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserProfileByIdService: UpdateUserProfileByIdService;

describe('UpdateUserProfileByIdService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserProfileByIdService = new UpdateUserProfileByIdService(fakeUsersRepository, fakeCityRepository, fakeStorageProvider);
    });

    it('should not be able to update the profile with incorrect id', async () => {
        const userUpdate = updateUserProfileByIdService.execute('incorrect', {name: 'UserFake', cityId: '', phone: '', avatar: ''});
        
        expect(userUpdate).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the profile with incorrect cityid', async () => {
        const cityFake = await fakeCityRepository.create({
            name: 'Fortaleza', 
            state: 'CE'
        });
        
        const userFake = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: cityFake.id
        });

        const userUpdate = updateUserProfileByIdService.execute(userFake.id, {name: 'UserFake', cityId: 'incorrect', phone: '', avatar: ''});
        
        expect(userUpdate).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the profile', async () => {

        const cityFake = await fakeCityRepository.create({
            name: 'Fortaleza', 
            state: 'CE'
        });

        const cityFakeUpdate = await fakeCityRepository.create({
            name: 'São Paulo', 
            state: 'SP'
        });

        const userFake = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: cityFake.id,
        });

        const paramsUpdate = {
            name: 'UserFake', 
            cityId: cityFakeUpdate.id, 
            phone: '12112344321',
        }

        const userUpdate = await updateUserProfileByIdService.execute(
            userFake.id, 
            paramsUpdate
        );

        const expectResult: User = {
            id: userFake.id,
            name: paramsUpdate.name,
            email: userFake.email,
            password: userFake.password,
            city_id: cityFakeUpdate.id,
            phone: paramsUpdate.phone,
            city: cityFakeUpdate,
            avatar: userFake.avatar,
        } as User;

        expect(userUpdate).toEqual(expectResult);
    });

    it('should be able to update the profile with avatar', async () => {

        const cityFake = await fakeCityRepository.create({
            name: 'Fortaleza', 
            state: 'CE'
        });

        const cityFakeUpdate = await fakeCityRepository.create({
            name: 'São Paulo', 
            state: 'SP'
        });

        const userFake = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: cityFake.id,
        });

        const paramsUpdate = {
            name: 'UserFake', 
            cityId: cityFakeUpdate.id, 
            phone: '12112344321',
            avatar: 'oldAvatar.png'
        }

        const userUpdate = await updateUserProfileByIdService.execute(
            userFake.id, 
            paramsUpdate
        );

        const expectResult: User = {
            id: userFake.id,
            name: paramsUpdate.name,
            email: userFake.email,
            password: userFake.password,
            city_id: cityFakeUpdate.id,
            phone: paramsUpdate.phone,
            city: cityFakeUpdate,
            avatar: paramsUpdate.avatar,
        } as User;

        expect(userUpdate).toEqual(expectResult);

        const userUpdateAvatar = await updateUserProfileByIdService.execute(
            userFake.id, 
            {...paramsUpdate, avatar: 'newAvatar.png'}
        );

        expect(userUpdateAvatar).toEqual({...expectResult, avatar: 'newAvatar.png'});
    });
});