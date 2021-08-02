import {ICity} from './city';

export interface IUser {
  id: string;
  name: string;
  email: string;
  city?: ICity;
  phone: string;
  avatarUrl?: string;
}
