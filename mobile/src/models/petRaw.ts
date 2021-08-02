import {IBreed} from './breed';
import {IUser} from './user';

export interface IPetRaw {
  id: string;
  name: string;
  gender: string;
  age: number;
  breed: string | IBreed;
  color: string;
  tutor_id: string;
  image?: string;
  created_at: string;
  location?: string;
  user: IUser;
}
