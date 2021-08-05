import {IBreed} from './breed';
import {ICity} from './city';
import {IImage} from './image';
import {IUser} from './user';

export interface IUserCity extends IUser {
  city: ICity;
}

export interface IPetDetails {
  id: string;
  name: string;
  age: number;
  color: string;
  gender: 'female' | 'male';
  breed: IBreed;
  created_at: string;
  user: IUserCity;
  images?: IImage[];
}
