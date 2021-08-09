import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/erros/AppError";
import FakeBreedsRepository from "../repositories/fakes/FakeBreedsRepository";

import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import FakePetImagesRepository from "../repositories/fakes/FakePetImagesRepository";
import CreatePetService from "./CreatePetService";
import DeletePetService from "./DeletePetService";
import FakeAdoptionRequestsRepository from "@modules/users/repositories/fakes/FakeAdoptionRequestsRepository";
import Pet, { Gender } from "../infra/typeorm/entities/Pet";

let fakePetsRepository: FakePetsRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let createPetService: CreatePetService;
let fakeStorageProvider: FakeStorageProvider;
let fakePetImagesRepository: FakePetImagesRepository;
let fakeAdoptionRequestsRepository: FakeAdoptionRequestsRepository;
let deletePetService: DeletePetService;

describe('DeletePetService', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeBreedsRepository = new FakeBreedsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        fakeStorageProvider = new FakeStorageProvider();
        fakePetImagesRepository = new FakePetImagesRepository();
        fakeAdoptionRequestsRepository = new FakeAdoptionRequestsRepository();
        deletePetService = new DeletePetService(fakePetsRepository, fakeStorageProvider, fakePetImagesRepository, fakeAdoptionRequestsRepository);

    });

    it('should not be able to delete pet with incorrect petId', async () => {
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

        await expect(deletePetService.execute({petId: 'incorrect', userId: userFake.id})).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to delete pet without permission', async () => {
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

        const userWithoutPermission = await fakeUsersRepository.create({
            name: 'Hacker',
            email: 'Hacker@email.com',
            phone: '12345678914',
            password: '12345678',
            cityId: cityFake.id
        });

        const breed = await fakeBreedsRepository.create({
            name: 'vira-lata',
            type: 'Dog'
        });

        const pet = await fakePetsRepository.create({
            name: 'Caramelo',
            gender: 'Male',
            age: 12,
            color: 'Caramelo',
            breedId: breed.id,
            tutorId: userFake.id,
        });

        await expect(deletePetService.execute({petId: pet.id, userId: userWithoutPermission.id})).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to delete pet', async () => {
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

        const breed = await fakeBreedsRepository.create({
            name: 'vira-lata',
            type: 'Dog'
        });

        const pet = await fakePetsRepository.create({
            name: 'Caramelo',
            gender: 'Male',
            age: 12,
            color: 'Caramelo',
            breedId: breed.id,
            tutorId: userFake.id,
        });

        await fakePetImagesRepository.create({petId: pet.id, path: 'oldImage.png'});

        await fakeStorageProvider.saveFile('oldImage.png');

        const fakePetsRepositoryMock: FakePetsRepository = jest.createMockFromModule('../repositories/fakes/FakePetsRepository');
        fakePetsRepositoryMock.findById = jest.fn(async (secret: string): Promise<Pet | undefined> => {
            return {
                name: 'Caramelo',
                gender: Gender['Male'],
                age: 12,
                color: 'Caramelo',
                breed_id: breed.id,
                tutor_id: userFake.id,
            } as Pet;
        });

        fakePetsRepositoryMock.delete = jest.fn(async (pet: Pet): Promise<void> => {});

        deletePetService = new DeletePetService(fakePetsRepositoryMock, fakeStorageProvider, fakePetImagesRepository, fakeAdoptionRequestsRepository);

        expect(await deletePetService.execute({petId: pet.id, userId: userFake.id})).toEqual(undefined);
    });

    it('should be able to delete pet with images', async () => {
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

        const breed = await fakeBreedsRepository.create({
            name: 'vira-lata',
            type: 'Dog'
        });

        const pet = await fakePetsRepository.create({
            name: 'Caramelo',
            gender: 'Male',
            age: 12,
            color: 'Caramelo',
            breedId: breed.id,
            tutorId: userFake.id,
        });

        await fakePetImagesRepository.create({petId: pet.id, path: 'oldImage.png'});

        await fakeStorageProvider.saveFile('oldImage.png');

        const fakePetsRepositoryMock: FakePetsRepository = jest.createMockFromModule('../repositories/fakes/FakePetsRepository');
        fakePetsRepositoryMock.findById = jest.fn(async (secret: string): Promise<Pet | undefined> => {
            return {
                name: 'Caramelo',
                gender: Gender['Male'],
                age: 12,
                color: 'Caramelo',
                breed_id: breed.id,
                tutor_id: userFake.id,
                images: [{id: '', path: 'oldImage.png', pet_id: pet.id}]
            } as Pet;
        });

        fakePetsRepositoryMock.delete = jest.fn(async (pet: Pet): Promise<void> => {});

        deletePetService = new DeletePetService(fakePetsRepositoryMock, fakeStorageProvider, fakePetImagesRepository, fakeAdoptionRequestsRepository);

        expect(await deletePetService.execute({petId: pet.id, userId: userFake.id})).toEqual(undefined);
    });
});