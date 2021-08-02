import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/erros/AppError";
import FakeBreedsRepository from "../repositories/fakes/FakeBreedsRepository";

import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import CreatePetService from "./CreatePetService";

let fakePetsRepository: FakePetsRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let createPetService: CreatePetService;

describe('CreatePetService', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeBreedsRepository = new FakeBreedsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        createPetService = new CreatePetService(fakePetsRepository, fakeBreedsRepository);
    });

    it('should not be able to create user with incorrect breedId', async () => {
        await expect(createPetService.execute({
            name: 'Caramelo',
            gender: 'Male',
            age: 12,
            color: 'Caramelo',
            breedId: '',
            tutorId: ''
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to create user', async () => {
        const params = {
            name: 'Fortaleza', 
            state: 'CE'
        };

        const cityFake = await fakeCityRepository.create(params);

        const user = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            password: '12345678',
            cityId: cityFake.id
        });

        const breed = await fakeBreedsRepository.create({
            name: 'vira-lata',
            type: 'Dog'
        });

        const pet = await createPetService.execute({
            name: 'Caramelo',
            gender: 'Male',
            age: 12,
            color: 'Caramelo',
            breedId: breed.id,
            tutorId: user.id
        });

        expect(pet).toHaveProperty('id');
    });
});