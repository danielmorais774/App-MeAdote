import FakeCityRepository from "@modules/cities/repositories/fakes/FakeCityRepository";
import ListCitiesService from "./ListCitiesService";

let fakeCityRepository: FakeCityRepository;
let listCitiesService: ListCitiesService;

describe('ListCitiesService', () => {
    beforeEach(() => {
        fakeCityRepository = new FakeCityRepository();
        listCitiesService = new ListCitiesService(fakeCityRepository);
    });

    it('should be able to list the cities', async () => {

        const city1 = await fakeCityRepository.create({
            name: 'São Paulo',
            state: 'SP'
        });

        const city2 = await fakeCityRepository.create({
            name: 'Fortaleza',
            state: 'CE'
        });

        const cities = await listCitiesService.execute();

        expect(cities).toEqual([city1, city2]);
    });
});