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
import UpdatePetService from "./UpdatePetService";
import IUpdatePetDTO from "../dtos/IUpdatePetDTO";

let fakePetsRepository: FakePetsRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let createPetService: CreatePetService;
let fakeStorageProvider: FakeStorageProvider;
let fakePetImagesRepository: FakePetImagesRepository;
let fakeAdoptionRequestsRepository: FakeAdoptionRequestsRepository;
let updatePetService: UpdatePetService;

describe('UpdatePetService', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeBreedsRepository = new FakeBreedsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        fakeStorageProvider = new FakeStorageProvider();
        fakePetImagesRepository = new FakePetImagesRepository();
        fakeAdoptionRequestsRepository = new FakeAdoptionRequestsRepository();
        updatePetService = new UpdatePetService(fakePetsRepository, fakeBreedsRepository, fakeStorageProvider, fakePetImagesRepository);

    });

    it('should not be able to update pet with incorrect breedId', async () => {
        await expect(updatePetService.execute('incorrect', {breedId: 'incorrect'} as IUpdatePetDTO)).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update pet with incorrect petId', async () => {

        const breed = await fakeBreedsRepository.create({name: 'Vira-lata', type: 'Dog'});
        await expect(updatePetService.execute('incorrect', {breedId: breed.id} as IUpdatePetDTO)).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update pet without permission', async () => {

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

        const breed = await fakeBreedsRepository.create({name: 'Vira-lata', type: 'Dog'});

        const pet = await fakePetsRepository.create({
            name: 'Caramelo',
            gender: 'Male',
            age: 12,
            color: 'Caramelo',
            breedId: breed.id,
            tutorId: userFake.id,
        });

        await expect(updatePetService.execute(pet.id, {breedId: breed.id, userId: 'incorrect'} as IUpdatePetDTO)).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update pet', async () => {

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

        const breed = await fakeBreedsRepository.create({name: 'Vira-lata', type: 'Dog'});
        const breedUpdate = await fakeBreedsRepository.create({name: 'Pit-bull', type: 'Dog'});

        const pet = await fakePetsRepository.create({
            name: 'Caramelo',
            gender: 'Male',
            age: 12,
            color: 'Caramelo',
            breedId: breed.id,
            tutorId: userFake.id,
        });

        const petImage = await fakePetImagesRepository.create({petId: pet.id, path: 'oldImage.png'});

        await fakeStorageProvider.saveFile('oldImage.png');

        fakePetsRepository.findById = jest.fn(async (id: string): Promise<Pet | undefined> => {
            return {
                name: pet.name,
                gender: Gender['Male'],
                age: pet.age,
                color: pet.color,
                breed_id: pet.breed_id,
                tutor_id: pet.tutor_id,
                images: [{id: petImage.id, path: 'oldImage.png', pet_id: pet.id}, {id: '1', path: 'secondImage.png', pet_id: pet.id}],
            } as Pet;
        });

        const paramsUpdate: IUpdatePetDTO = {
            name: 'Caramelo', 
            gender: 'Female', 
            age: 12,
            color: 'Caramelo',
            breedId: breedUpdate.id,
            userId: userFake.id,
            images: [{filename: 'newImage.png'} as Express.Multer.File]
        }

        const petUpdate = await updatePetService.execute(pet.id, paramsUpdate);

        expect(petUpdate.name).toEqual(paramsUpdate.name);
        expect(petUpdate.gender).toEqual(Gender[paramsUpdate.gender]);
        expect(petUpdate.age).toEqual(paramsUpdate.age);
        expect(petUpdate.color).toEqual(paramsUpdate.color);
        expect(petUpdate.breed_id).toEqual(paramsUpdate.breedId);
        expect(petUpdate.images).toHaveLength(3);


    });

    it('should be able to update pet without images', async () => {

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

        const breed = await fakeBreedsRepository.create({name: 'Vira-lata', type: 'Dog'});
        const breedUpdate = await fakeBreedsRepository.create({name: 'Pit-bull', type: 'Dog'});

        const pet = await fakePetsRepository.create({
            name: 'Caramelo',
            gender: 'Male',
            age: 12,
            color: 'Caramelo',
            breedId: breed.id,
            tutorId: userFake.id,
        });

        const petImage = await fakePetImagesRepository.create({petId: pet.id, path: 'oldImage.png'});

        await fakeStorageProvider.saveFile('oldImage.png');

        fakePetsRepository.findById = jest.fn(async (id: string): Promise<Pet | undefined> => {
            return {
                name: pet.name,
                gender: Gender['Male'],
                age: pet.age,
                color: pet.color,
                breed_id: pet.breed_id,
                tutor_id: pet.tutor_id,
                images: [{id: petImage.id, path: 'oldImage.png', pet_id: pet.id}, {id: '1', path: 'secondImage.png', pet_id: pet.id}],
            } as Pet;
        });

        const paramsUpdate: IUpdatePetDTO = {
            name: 'Caramelo', 
            gender: 'Female', 
            age: 12,
            color: 'Caramelo',
            breedId: breedUpdate.id,
            userId: userFake.id,
        }

        const petUpdate = await updatePetService.execute(pet.id, paramsUpdate);

        expect(petUpdate.name).toEqual(paramsUpdate.name);
        expect(petUpdate.gender).toEqual(Gender[paramsUpdate.gender]);
        expect(petUpdate.age).toEqual(paramsUpdate.age);
        expect(petUpdate.color).toEqual(paramsUpdate.color);
        expect(petUpdate.breed_id).toEqual(paramsUpdate.breedId);
        expect(petUpdate.images).toHaveLength(2);
    });

    it('should be able to update pet with imagesDeleted', async () => {

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

        const breed = await fakeBreedsRepository.create({name: 'Vira-lata', type: 'Dog'});
        const breedUpdate = await fakeBreedsRepository.create({name: 'Pit-bull', type: 'Dog'});

        const pet = await fakePetsRepository.create({
            name: 'Caramelo',
            gender: 'Male',
            age: 12,
            color: 'Caramelo',
            breedId: breed.id,
            tutorId: userFake.id,
        });

        const petImage = await fakePetImagesRepository.create({petId: pet.id, path: 'oldImage.png'});

        await fakeStorageProvider.saveFile('oldImage.png');

        fakePetsRepository.findById = jest.fn(async (id: string): Promise<Pet | undefined> => {
            return {
                name: pet.name,
                gender: Gender['Male'],
                age: pet.age,
                color: pet.color,
                breed_id: pet.breed_id,
                tutor_id: pet.tutor_id,
                images: [{id: petImage.id, path: 'oldImage.png', pet_id: pet.id}, {id: '1', path: 'secondImage.png', pet_id: pet.id}],
            } as Pet;
        });

        const paramsUpdate: IUpdatePetDTO = {
            name: 'Caramelo', 
            gender: 'Female', 
            age: 12,
            color: 'Caramelo',
            breedId: breedUpdate.id,
            userId: userFake.id,
            imagesDeleted: [petImage.id],
            images: [{filename: 'newImage.png'} as Express.Multer.File]
        }

        const petUpdate = await updatePetService.execute(pet.id, paramsUpdate);

        console.log(petUpdate)

        expect(petUpdate.name).toEqual(paramsUpdate.name);
        expect(petUpdate.gender).toEqual(Gender[paramsUpdate.gender]);
        expect(petUpdate.age).toEqual(paramsUpdate.age);
        expect(petUpdate.color).toEqual(paramsUpdate.color);
        expect(petUpdate.breed_id).toEqual(paramsUpdate.breedId);
        expect(petUpdate.images).toHaveLength(2);
    });

    it('should be able to update pet with incorrect imagesDeleted', async () => {

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

        const breed = await fakeBreedsRepository.create({name: 'Vira-lata', type: 'Dog'});
        const breedUpdate = await fakeBreedsRepository.create({name: 'Pit-bull', type: 'Dog'});

        const pet = await fakePetsRepository.create({
            name: 'Caramelo',
            gender: 'Male',
            age: 12,
            color: 'Caramelo',
            breedId: breed.id,
            tutorId: userFake.id,
        });

        const petImage = await fakePetImagesRepository.create({petId: pet.id, path: 'oldImage.png'});

        await fakeStorageProvider.saveFile('oldImage.png');

        fakePetsRepository.findById = jest.fn(async (id: string): Promise<Pet | undefined> => {
            return {
                name: pet.name,
                gender: Gender['Male'],
                age: pet.age,
                color: pet.color,
                breed_id: pet.breed_id,
                tutor_id: pet.tutor_id,
                images: [{id: petImage.id, path: 'oldImage.png', pet_id: pet.id}, {id: '1', path: 'secondImage.png', pet_id: pet.id}],
            } as Pet;
        });

        const paramsUpdate: IUpdatePetDTO = {
            name: 'Caramelo', 
            gender: 'Female', 
            age: 12,
            color: 'Caramelo',
            breedId: breedUpdate.id,
            userId: userFake.id,
            imagesDeleted: ['incorrect'],
            images: [{filename: 'newImage.png'} as Express.Multer.File]
        }

        const petUpdate = await updatePetService.execute(pet.id, paramsUpdate);

        console.log(petUpdate)

        expect(petUpdate.name).toEqual(paramsUpdate.name);
        expect(petUpdate.gender).toEqual(Gender[paramsUpdate.gender]);
        expect(petUpdate.age).toEqual(paramsUpdate.age);
        expect(petUpdate.color).toEqual(paramsUpdate.color);
        expect(petUpdate.breed_id).toEqual(paramsUpdate.breedId);
        expect(petUpdate.images).toHaveLength(3);
    });


});