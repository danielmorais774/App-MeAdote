import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeBreedsRepository from "@modules/pets/repositories/fakes/FakeBreedsRepository";
import FakePetsRepository from "@modules/pets/repositories/fakes/FakePetsRepository";
import AppError from "@shared/erros/AppError";
import FakeAdoptionRequestsRepository from "../repositories/fakes/FakeAdoptionRequestsRepository";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserAdoptionRequestService from "./CreateUserAdoptionRequestService";
import ListUserAdoptionRequestsService from "./ListUserAdoptionRequestsService";

let fakeAdoptionRequestsRepository: FakeAdoptionRequestsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakePetsRepository: FakePetsRepository;
let createUserAdoptionRequestService: CreateUserAdoptionRequestService;

describe('CreateUserAdoptionRequestService', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        fakeBreedsRepository = new FakeBreedsRepository();
        fakePetsRepository = new FakePetsRepository();
        fakeAdoptionRequestsRepository = new FakeAdoptionRequestsRepository();
        createUserAdoptionRequestService = new CreateUserAdoptionRequestService(fakeAdoptionRequestsRepository, fakePetsRepository);
    });

    it('Should be able to create adoption request', async () => {
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

        const user2 = await fakeUsersRepository.create({
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
            age: 10,
            color: 'caramelo',
            gender: 'Male',
            breedId: breed.id,
            tutorId: userFake.id
        });

        const adoptionRequest = await createUserAdoptionRequestService.execute({
            userId: user2.id,
            petId: pet.id
        });

        expect(adoptionRequest).toHaveProperty('id');

    });


    it('Should not be able to create adoption request with incorrect petId', async () => {
        const cityFake = await fakeCityRepository.create({
            name: 'Fortaleza', 
            state: 'CE'
        })

        const userTutorFake = await fakeUsersRepository.create({
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
            age: 10,
            color: 'caramelo',
            gender: 'Male',
            breedId: breed.id,
            tutorId: userTutorFake.id
        });

        const adoptionRequest = createUserAdoptionRequestService.execute({
            userId: userTutorFake.id,
            petId: '123123'
        });

        await expect(adoptionRequest).rejects.toBeInstanceOf(AppError);

    });

    it('Should not be able to create adoption request with userId equals tutorId', async () => {
        const cityFake = await fakeCityRepository.create({
            name: 'Fortaleza', 
            state: 'CE'
        })

        const userTutorFake = await fakeUsersRepository.create({
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
            age: 10,
            color: 'caramelo',
            gender: 'Male',
            breedId: breed.id,
            tutorId: userTutorFake.id
        });

        const adoptionRequest = createUserAdoptionRequestService.execute({
            userId: userTutorFake.id,
            petId: pet.id
        });

        await expect(adoptionRequest).rejects.toBeInstanceOf(AppError);

    });

    it('Should not be able to create duplication adoption request with userId and petId', async () => {
        const cityFake = await fakeCityRepository.create({
            name: 'Fortaleza', 
            state: 'CE'
        })

        const userTutorFake = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            phone: '88123345789',
            password: '12345678',
            cityId: cityFake.id
        });

        const userAdoptionRequest = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel2@email.com',
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
            age: 10,
            color: 'caramelo',
            gender: 'Male',
            breedId: breed.id,
            tutorId: userTutorFake.id
        });

        await fakeAdoptionRequestsRepository.create({
            userId: userAdoptionRequest.id,
            petId: pet.id,
        });

        const adoptionRequest = createUserAdoptionRequestService.execute({
            userId: userAdoptionRequest.id,
            petId: pet.id
        });

        await expect(adoptionRequest).rejects.toBeInstanceOf(AppError);

    });

});