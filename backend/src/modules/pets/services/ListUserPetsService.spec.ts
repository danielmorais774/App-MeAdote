import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/erros/AppError";
import FakeBreedsRepository from "../repositories/fakes/FakeBreedsRepository";

import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import ListBreedsService from "./ListBreedsService";
import ListUserPetsService from "./ListUserPetsService";

let fakePetsRepository: FakePetsRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let listBreedsService: ListBreedsService;
let listUserPetsService : ListUserPetsService;

describe('ListUserPetsService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        fakePetsRepository = new FakePetsRepository();
        fakeBreedsRepository = new FakeBreedsRepository();
        listUserPetsService = new ListUserPetsService(fakePetsRepository, fakeUsersRepository);
    });

    it('should be able to list the pets with userId', async () => {

        const params = {
            name: 'Fortaleza', 
            state: 'CE'
        };

        const cityFake = await fakeCityRepository.create(params);

        const user = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: cityFake.id
        });

        const userSecond = await fakeUsersRepository.create({
            name: 'Carlos Morais',
            email: 'carlos@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: cityFake.id
        });

        const breed = await fakeBreedsRepository.create({
            name: 'vira-lata',
            type: 'Dog'
        });

        const pet1 = await fakePetsRepository.create({
            name: 'Caramelo',
            age: 10,
            color: 'caramelo',
            gender: 'Male',
            breedId: breed.id,
            tutorId: user.id
        });

        const pet2 = await fakePetsRepository.create({
            name: 'Meg',
            age: 10,
            color: 'caramelo',
            gender: 'Male',
            breedId: breed.id,
            tutorId: user.id
        });
        
        const pet3 = await fakePetsRepository.create({
            name: 'Scoott',
            age: 10,
            color: 'caramelo',
            gender: 'Male',
            breedId: breed.id,
            tutorId: userSecond.id
        });

        const myPets = await listUserPetsService.execute({userId: user.id});
        const myPetsSecond = await listUserPetsService.execute({userId: userSecond.id});

        expect(myPets).toEqual([pet1, pet2]);
        expect(myPetsSecond).toEqual([pet3]);
    });
});