import api from './api';

import {IRequestAdoption} from '../models/requestAdoption';

export interface IAdoptionRequestsService {
  getAdoptionRequestsByUser(): Promise<IRequestAdoption[]>;
  getAdoptionRequestsReceived(): Promise<IRequestAdoption[]>;
  createAdoptionRequest(petId: string): Promise<IRequestAdoption>;
  editAdoptionRequestStatus(data: IEditAdoptionRequest): Promise<void>;
  editAdoptionRequestReceivedStatus(
    data: IEditAdoptionRequestReceived,
  ): Promise<IRequestAdoption>;
}

interface IEditAdoptionRequest {
  adoptionRequestId: string;
  status: 'canceled';
}

interface IEditAdoptionRequestReceived {
  adoptionRequestId: string;
  status: 'accepted' | 'refused' | 'adopted';
}

interface IAdoptionRequestsResponseAPI {
  adoptionRequests: IRequestAdoption[];
}

interface IAdoptionRequestResponseAPI {
  adoptionRequest: IRequestAdoption;
}

export class AdoptionRequestsService implements IAdoptionRequestsService {
  public async getAdoptionRequestsByUser(): Promise<IRequestAdoption[]> {
    try {
      const response = await api.get<IAdoptionRequestsResponseAPI>(
        'api/v1/user/adoptionRequests',
      );
      return response.data.adoptionRequests;
    } catch (e) {
      throw new Error();
    }
  }

  public async getAdoptionRequestsReceived(): Promise<IRequestAdoption[]> {
    try {
      const response = await api.get<IAdoptionRequestsResponseAPI>(
        'api/v1/user/adoptionRequestsReceived',
      );
      return response.data.adoptionRequests;
    } catch (e) {
      throw new Error();
    }
  }

  public async createAdoptionRequest(petId: string): Promise<IRequestAdoption> {
    try {
      const response = await api.post<IAdoptionRequestResponseAPI>(
        'api/v1/user/adoptionRequests',
        {
          petId,
        },
      );
      return response.data.adoptionRequest;
    } catch (e) {
      throw new Error();
    }
  }

  public async editAdoptionRequestStatus({
    adoptionRequestId,
    status,
  }: IEditAdoptionRequest): Promise<void> {
    try {
      await api.patch(`api/v1/user/adoptionRequests/${adoptionRequestId}`, {
        status,
      });
      // return response.data.adoptionRequests;
    } catch (e) {
      throw new Error();
    }
  }

  public async editAdoptionRequestReceivedStatus({
    adoptionRequestId,
    status,
  }: IEditAdoptionRequestReceived): Promise<IRequestAdoption> {
    try {
      const response = await api.patch<IAdoptionRequestResponseAPI>(
        `api/v1/user/adoptionRequestsReceived/${adoptionRequestId}`,
        {
          status,
        },
      );
      return response.data.adoptionRequest;
    } catch (e) {
      throw new Error();
    }
  }
}
