import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeAdoptionRequestsRepository from "@modules/users/repositories/fakes/FakeAdoptionRequestsRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeBreedsRepository from "../../pets/repositories/fakes/FakeBreedsRepository";
import FakePetsRepository from "../../pets/repositories/fakes/FakePetsRepository";
import ListUserAdoptionRequestsService from "./ListUserAdoptionRequestsService";
import ListUserPetAdoptionRequestsService from "./ListUserPetAdoptionRequestsService";

let fakeAdoptionRequestsRepository: FakeAdoptionRequestsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakePetsRepository: FakePetsRepository;
let listUserPetAdoptionRequestsService: ListUserPetAdoptionRequestsService;

describe('ListUserPetAdoptionRequestsService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        fakeBreedsRepository = new FakeBreedsRepository();
        fakePetsRepository = new FakePetsRepository();
        fakeAdoptionRequestsRepository = new FakeAdoptionRequestsRepository();
        listUserPetAdoptionRequestsService = new ListUserPetAdoptionRequestsService(fakeAdoptionRequestsRepository);
    });

    it('should be able to list of receivers by user', async () => {
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

        const tutorFake = await fakeUsersRepository.create({
            name: 'Joaozinho',
            email: 'joão@email.com',
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
            tutorId: tutorFake.id
        });

        const createRequest = await fakeAdoptionRequestsRepository.create({
            userId: userFake.id,
            petId: pet.id
        });

        const adoptionRequests = await listUserPetAdoptionRequestsService.execute(userFake.id);

        expect(adoptionRequests).toEqual([createRequest]);
    });

});