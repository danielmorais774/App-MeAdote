import { container } from "tsyringe";

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICityRepository from "@modules/cities/repositories/ICityRepository";
import CityRepository from '@modules/cities/infra/typeorm/repositories/CityRepository';

import IBreedsRepository from "@modules/pets/repositories/IBreedsRepository";
import BreedsRepository from '@modules/pets/infra/typeorm/repositories/BreedsRepository';

import IPetsRepository from "@modules/pets/repositories/IPetsRepository";
import PetsRepository from "@modules/pets/infra/typeorm/repositories/PetsRepository";

import IAdoptionRequestsRepository from "@modules/users/repositories/IAdoptionRequestsRepository";
import AdoptionRequestsRepository from "@modules/users/infra/typeorm/repositories/AdoptionRequestsRepository";

import IPetImagesRepository from "@modules/pets/repositories/IPetImagesRepository";
import PetImagesRepository from "@modules/pets/infra/typeorm/repositories/PetImagesRepository";

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<ICityRepository>(
    'CityRepository',
    CityRepository,
);

container.registerSingleton<IPetsRepository>(
    'PetsRepository',
    PetsRepository,
);

container.registerSingleton<IBreedsRepository>(
    'BreedsRepository',
    BreedsRepository,
);

container.registerSingleton<IAdoptionRequestsRepository>(
    'AdoptionRequestsRepository',
    AdoptionRequestsRepository
);

container.registerSingleton<IPetImagesRepository>(
    'PetImagesRepository',
    PetImagesRepository
);
