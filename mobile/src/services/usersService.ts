import api from './api';

import {IUser} from '../models/user';
import {IUserCity} from '../models/petDetails';
import {Image} from 'react-native-image-crop-picker';
import {IPetRaw} from '../models/petRaw';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  cityId: string;
}

interface IUpdateUserDTO {
  name: string;
  phone: string;
  cityId: string;
  avatar?: Image | null;
}

export interface IUsersService {
  createUser(user: ICreateUserDTO): Promise<IUser>;
}

interface IUsersResponseAPI {
  user: IUserCity;
}

interface IMyPetsResponseAPI {
  pets: IPetRaw[];
}

export class UsersService implements IUsersService {
  public async createUser({
    name,
    email,
    password,
    cityId,
  }: ICreateUserDTO): Promise<IUserCity> {
    try {
      const response = await api.post<IUsersResponseAPI>('api/v1/user', {
        name,
        email,
        password,
        cityId,
      });
      return response.data.user;
    } catch (e) {
      throw new Error();
    }
  }

  public async getUserProfile(): Promise<IUserCity> {
    try {
      const response = await api.get<IUsersResponseAPI>('api/v1/user');
      return response.data.user;
    } catch (e) {
      throw new Error();
    }
  }

  public async updateUserProfile({
    name,
    phone,
    cityId,
    avatar,
  }: IUpdateUserDTO): Promise<IUserCity> {
    try {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('cityId', cityId);

      if (avatar) {
        var dateAtual = new Date();

        var extension = avatar.mime.split('/')[1];
        var nameFile = dateAtual.getTime();

        formData.append('avatar', {
          uri: avatar.path,
          type: avatar.mime,
          name: nameFile + '.' + extension,
        });
      }

      const response = await api.put<IUsersResponseAPI>(
        'api/v1/user',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data.user;
    } catch (e) {
      throw new Error();
    }
  }

  public async getMyPets(): Promise<IPetRaw[]> {
    try {
      const response = await api.get<IMyPetsResponseAPI>('api/v1/pets/me');
      return response.data.pets;
    } catch (e) {
      throw new Error();
    }
  }
}
