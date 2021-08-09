import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/erros/AppError";

import ShowUserProfileByIdService from "./ShowUserProfileByIdService";

let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let showUserProfileByIdService: ShowUserProfileByIdService;

describe('ShowUserProfileByIdService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        showUserProfileByIdService = new ShowUserProfileByIdService(fakeUsersRepository, fakeCityRepository);
    });

    it('should not be able to show the profile with incorrect id', async () => {
        const userInfo = showUserProfileByIdService.execute('incorrect');
        
        expect(userInfo).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to show the profile', async () => {

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


        const userInfo = await showUserProfileByIdService.execute(userFake.id);
        
        expect(userInfo).toEqual(userFake);
    });
});