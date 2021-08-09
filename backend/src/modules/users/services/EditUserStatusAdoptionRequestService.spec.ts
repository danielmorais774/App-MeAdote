import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeBreedsRepository from "@modules/pets/repositories/fakes/FakeBreedsRepository";
import FakePetsRepository from "@modules/pets/repositories/fakes/FakePetsRepository";
import AppError from "@shared/erros/AppError";
import FakeAdoptionRequestsRepository from "../repositories/fakes/FakeAdoptionRequestsRepository";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserAdoptionRequestService from "./CreateUserAdoptionRequestService";
import EditUserStatusAdoptionRequestService from "./EditUserStatusAdoptionRequestService";
import ListUserAdoptionRequestsService from "./ListUserAdoptionRequestsService";

let fakeAdoptionRequestsRepository: FakeAdoptionRequestsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakePetsRepository: FakePetsRepository;
let createUserAdoptionRequestService: CreateUserAdoptionRequestService;
let editUserStatusAdoptionRequestService: EditUserStatusAdoptionRequestService;

describe('EditUserStatusAdoptionRequestService', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        fakeBreedsRepository = new FakeBreedsRepository();
        fakePetsRepository = new FakePetsRepository();
        fakeAdoptionRequestsRepository = new FakeAdoptionRequestsRepository();
        editUserStatusAdoptionRequestService = new EditUserStatusAdoptionRequestService(fakeAdoptionRequestsRepository, fakePetsRepository);
        createUserAdoptionRequestService = new CreateUserAdoptionRequestService(fakeAdoptionRequestsRepository, fakePetsRepository);
    });

    it('Should not be able to edit adoption request with incorrect adoptionRquestId', async () => {
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

        const adoptionRequest = await fakeAdoptionRequestsRepository.create({
            userId: user2.id,
            petId: pet.id
        });


        const editAdoptionRequest = editUserStatusAdoptionRequestService.execute({
            userId: userFake.id,
            id: '1',
            status: 'CANCELED'
        });

        await expect(editAdoptionRequest).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to edit adoption request with incorrect userId', async () => {
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

        const adoptionRequest = await fakeAdoptionRequestsRepository.create({
            userId: user2.id,
            petId: pet.id
        });


        const editAdoptionRequest = editUserStatusAdoptionRequestService.execute({
            userId: userFake.id,
            id: adoptionRequest.id,
            status: 'CANCELED'
        })

        await expect(editAdoptionRequest).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to edit status adoption request', async () => {
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

        const adoptionRequest = await fakeAdoptionRequestsRepository.create({
            userId: user2.id,
            petId: pet.id
        });


        const editAdoptionRequest = await editUserStatusAdoptionRequestService.execute({
            userId: user2.id,
            id: adoptionRequest.id,
            status: 'CANCELED'
        })

        expect(editAdoptionRequest.status).toBe('canceled');

    });

});