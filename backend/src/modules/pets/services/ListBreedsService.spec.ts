import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/erros/AppError";
import FakeBreedsRepository from "../repositories/fakes/FakeBreedsRepository";

import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import ListBreedsService from "./ListBreedsService";
import ListPetsService from "./ListPetsService";

let fakePetsRepository: FakePetsRepository;
let fakeBreedsRepository: FakeBreedsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCityRepository: FakeCityRepository;
let listBreedsService: ListBreedsService;

describe('ListBreedsService', () => {
    beforeEach(() => {
        fakeBreedsRepository = new FakeBreedsRepository();
        listBreedsService = new ListBreedsService(fakeBreedsRepository);
    });

    it('should be able to list the breeds', async () => {

        const breed1 = await fakeBreedsRepository.create({
            name: 'vira-lata',
            type: 'Dog'
        });

        const breed2 = await fakeBreedsRepository.create({
            name: 'Pit-bull',
            type: 'Dog'
        });

        const breeds = await listBreedsService.execute();

        expect(breeds).toEqual([breed1, breed2]);
    });
});