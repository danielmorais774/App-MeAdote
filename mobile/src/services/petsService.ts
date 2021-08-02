import api from './api';

import {IPetDetails} from '../models/petDetails';
import {IPetRaw} from '../models/petRaw';

export interface IPetsService {
  getPets(): Promise<IPetsResponseAPI>;
  getPetRecents(): Promise<IPetRaw[]>;
  getPetDetailsById(id: string): Promise<IPetDetails>;
}

interface IPetRecentsResponseAPI {
  pets: IPetRaw[];
}

interface IPetsResponseAPI {
  data: IPetRaw[];
  lastPage: number;
}

interface IPetDetailsResponseAPI {
  pet: IPetDetails;
}

export class PetsService implements IPetsService {
  public async getPets(): Promise<IPetsResponseAPI> {
    try {
      const response = await api.get<IPetsResponseAPI>('api/v1/pets');
      return response.data;
    } catch (e) {
      throw new Error();
    }
  }

  public async getPetRecents(): Promise<IPetRaw[]> {
    try {
      const response = await api.get<IPetRecentsResponseAPI>(
        'api/v1/pets/recent',
      );
      return response.data.pets;
    } catch (e) {
      throw new Error();
    }
  }

  public async getPetDetailsById(id: string): Promise<IPetDetails> {
    try {
      const response = await api.get<IPetDetailsResponseAPI>(
        `api/v1/pets/${id}`,
      );

      if (!response.data.pet) {
        throw new Error();
      }

      return response.data.pet;
    } catch (e) {
      throw new Error();
    }
  }
}
