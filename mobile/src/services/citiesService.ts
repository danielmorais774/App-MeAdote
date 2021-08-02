import api from './api';

import {ICity} from '../models/city';

export interface IAdoptionRequestsService {
  getCities(): Promise<ICity[]>;
}

interface ICityResponseAPI {
  cities: ICity[];
}

export class CitiesService implements IAdoptionRequestsService {
  public async getCities(): Promise<ICity[]> {
    try {
      const response = await api.get<ICityResponseAPI>('api/v1/city');
      return response.data.cities;
    } catch (e) {
      throw new Error();
    }
  }
}
