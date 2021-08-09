import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/erros/AppError";
import FakeBreedsRepository from "../repositories/fakes/FakeBreedsRepository";

import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import FakePetImagesRepository from "../repositories/fakes/FakePetImagesRepository";
import CreatePetService from "./CreatePetService";

let fakePetsRepository: FakePetsRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let createPetService: CreatePetService;
let fakeStorageProvider: FakeStorageProvider;
let fakePetImagesRepository: FakePetImagesRepository;

describe('CreatePetService', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeBreedsRepository = new FakeBreedsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        fakeStorageProvider = new FakeStorageProvider();
        fakePetImagesRepository = new FakePetImagesRepository();
        createPetService = new CreatePetService(fakePetsRepository, fakeBreedsRepository, fakeStorageProvider, fakePetImagesRepository);
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
            phone: '88123345789',
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
            tutorId: user.id,
        });

        expect(pet).toHaveProperty('id');
    });

    it('should be able to create user with images', async () => {
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
            tutorId: user.id,
            images: [{filename: 'petimage.png'} as Express.Multer.File]
        });

        expect(pet).toHaveProperty('id');
    });
});