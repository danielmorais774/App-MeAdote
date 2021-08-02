import {IBreed} from './breed';
import {IImage} from './image';
import {IUser} from './user';

export interface IPet {
  id: string;
  name: string;
  gender: string;
  age: number;
  breed: IBreed;
  color: string;
  tutor_id: string;
  images: IImage[];
  created_at: string;
  user: IUser;
}
