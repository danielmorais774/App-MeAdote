import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/erros/AppError";
import FakeBreedsRepository from "../repositories/fakes/FakeBreedsRepository";

import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import ListPetsLocationService from "./ListPetsLocationService";

let fakePetsRepository: FakePetsRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let listPetsLocationService: ListPetsLocationService;

describe('ListPetsLocationService', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeBreedsRepository = new FakeBreedsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        listPetsLocationService = new ListPetsLocationService(fakePetsRepository, fakeUsersRepository);
    });

    it('should be able to list the pets', async () => {

        const cityFake = await fakeCityRepository.create({
            name: 'Fortaleza', 
            state: 'CE'
        })

        const userFake = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
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
            tutorId: userFake.id
        });

        const pet2 = await fakePetsRepository.create({
            name: 'Caramelo 2',
            age: 15,
            color: 'caramelo',
            gender: 'Female',
            breedId: breed.id,
            tutorId: userFake.id
        });

        const petsByUserId = await listPetsLocationService.execute({
           userId: userFake.id
        })

        const petsByCityId = await listPetsLocationService.execute({
            cityId: cityFake.id
        });

        expect(petsByUserId).toEqual([pet1, pet2]);
        expect(petsByCityId).toEqual([pet1, pet2]);
    });


    it('should not be able to list the pets with incorrect userId', async () => {

        const cityFake = await fakeCityRepository.create({
            name: 'Fortaleza', 
            state: 'CE'
        })

        const userFake = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: cityFake.id
        });

        const breed = await fakeBreedsRepository.create({
            name: 'vira-lata',
            type: 'Dog'
        });

        await fakePetsRepository.create({
            name: 'Caramelo',
            age: 10,
            color: 'caramelo',
            gender: 'Male',
            breedId: breed.id,
            tutorId: userFake.id
        });

        await fakePetsRepository.create({
            name: 'Caramelo 2',
            age: 15,
            color: 'caramelo',
            gender: 'Female',
            breedId: breed.id,
            tutorId: userFake.id
        });

        const petsByUserId = listPetsLocationService.execute({
           userId: '123'
        });

        await expect(petsByUserId).rejects.toBeInstanceOf(AppError);
    });
});