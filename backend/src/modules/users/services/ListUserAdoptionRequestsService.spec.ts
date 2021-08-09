import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeAdoptionRequestsRepository from "@modules/users/repositories/fakes/FakeAdoptionRequestsRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeBreedsRepository from "../../pets/repositories/fakes/FakeBreedsRepository";
import FakePetsRepository from "../../pets/repositories/fakes/FakePetsRepository";
import ListUserAdoptionRequestsService from "./ListUserAdoptionRequestsService";

let fakeAdoptionRequestsRepository: FakeAdoptionRequestsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakePetsRepository: FakePetsRepository;
let listUserAdoptionRequestsService: ListUserAdoptionRequestsService;

describe('ListUserAdoptionRequestsService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCityRepository = new FakeCityRepository();
        fakeBreedsRepository = new FakeBreedsRepository();
        fakePetsRepository = new FakePetsRepository();
        fakeAdoptionRequestsRepository = new FakeAdoptionRequestsRepository();
        listUserAdoptionRequestsService = new ListUserAdoptionRequestsService(fakeAdoptionRequestsRepository);
    });

    it('should be able to list of requests by user', async () => {
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

        const pet = await fakePetsRepository.create({
            name: 'Caramelo',
            age: 10,
            color: 'caramelo',
            gender: 'Male',
            breedId: breed.id,
            tutorId: userFake.id
        });

        const createRequest = await fakeAdoptionRequestsRepository.create({
            userId: userFake.id,
            petId: pet.id
        });

        const adoptionRequests = await listUserAdoptionRequestsService.execute(userFake.id);

        expect(adoptionRequests[0]).toHaveProperty('id');
        expect(adoptionRequests[0].pet_id).toBe(pet.id);
        expect(adoptionRequests[0].user_id).toBe(userFake.id);
    });

});