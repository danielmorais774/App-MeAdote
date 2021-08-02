import {PetsService} from './petsService';
import {AdoptionRequestsService} from './adoptionRequestsService';
import {CitiesService} from './citiesService';
import {UsersService} from './usersService';

const petsService = new PetsService();
const adoptionRequestsService = new AdoptionRequestsService();
const citiesService = new CitiesService();
const usersService = new UsersService();

export {petsService, adoptionRequestsService, citiesService, usersService};
