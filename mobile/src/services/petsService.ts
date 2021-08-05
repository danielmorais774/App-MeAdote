import api from './api';

import {IPetDetails} from '../models/petDetails';
import {IPetRaw} from '../models/petRaw';
import {IBreed} from '../models/breed';

import {Image} from 'react-native-image-crop-picker';

export interface IPetsService {
  getPets(): Promise<IPetsResponseAPI>;
  getPetRecents(): Promise<IPetRaw[]>;
  getPetDetailsById(id: string): Promise<IPetDetails>;
}

interface IPetRecentsResponseAPI {
  pets: IPetRaw[];
}

interface ICreatePetDTO {
  name: string;
  age: number;
  color: string;
  breedId: string;
  gender: 'male' | 'female';
  images: Image[];
}

interface IUpdatePetDTO {
  name: string;
  age: number;
  color: string;
  breedId: string;
  gender: 'male' | 'female';
  images: Image[];
  imagesDeleted: string[];
}

interface IPetsResponseAPI {
  data: IPetRaw[];
  lastPage: number;
}

interface IPetDetailsResponseAPI {
  pet: IPetDetails;
}

interface IBreedsResponseAPI {
  breeds: IBreed[];
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

  public async getBreeds(): Promise<IBreed[]> {
    try {
      const response = await api.get<IBreedsResponseAPI>('api/v1/breeds');

      if (!response.data.breeds) {
        throw new Error();
      }

      return response.data.breeds;
    } catch (e) {
      throw new Error();
    }
  }

  public async createPet({
    name,
    age,
    color,
    gender,
    breedId,
    images,
  }: ICreatePetDTO): Promise<IPetDetails> {
    try {
      let formPet = new FormData();
      formPet.append('name', name);
      formPet.append('age', age);
      formPet.append('color', color);
      formPet.append('gender', gender);
      formPet.append('breedId', breedId);

      images.forEach(image => {
        var dateAtual = new Date();

        var extension = image.mime.split('/')[1];
        var nameFile = dateAtual.getTime();

        formPet.append('images', {
          uri: image.path,
          type: image.mime,
          name: nameFile + '.' + extension,
        });
      });

      const response = await api.post<IPetDetailsResponseAPI>(
        'api/v1/pets',
        formPet,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (!response.data.pet) {
        throw new Error();
      }

      return response.data.pet;
    } catch (e) {
      throw new Error();
    }
  }

  public async updatePet(
    id: string,
    {name, age, color, gender, breedId, images, imagesDeleted}: IUpdatePetDTO,
  ): Promise<IPetDetails> {
    try {
      let formPet = new FormData();
      formPet.append('name', name);
      formPet.append('age', age);
      formPet.append('color', color);
      formPet.append('gender', gender);
      formPet.append('breedId', breedId);
      imagesDeleted.forEach(item => formPet.append('imagesDeleted[]', item));

      images?.forEach(image => {
        var dateAtual = new Date();
        console.log(image);
        var extension = image.mime.split('/')[1];
        var nameFile = dateAtual.getTime();

        formPet.append('images', {
          uri: image.path,
          type: image.mime,
          name: nameFile + '.' + extension,
        });
      });

      const response = await api.put<IPetDetailsResponseAPI>(
        `api/v1/pets/${id}`,
        formPet,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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
