import api from './api';

import {IRequestAdoption} from '../models/requestAdoption';

export interface IAdoptionRequestsService {
  getAdoptionRequestsByUser(): Promise<IRequestAdoption[]>;
}

interface IAdoptionRequestByUserResponseAPI {
  adoptionRequests: IRequestAdoption[];
}

export class AdoptionRequestsService implements IAdoptionRequestsService {
  public async getAdoptionRequestsByUser(): Promise<IRequestAdoption[]> {
    try {
      const response = await api.get<IAdoptionRequestByUserResponseAPI>(
        'api/v1/user/adoptionRequests',
      );
      return response.data.adoptionRequests;
    } catch (e) {
      throw new Error();
    }
  }
}
