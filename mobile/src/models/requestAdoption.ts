import {IPet} from './pet';

export interface IRequestAdoption {
  id: string;
  user_id: string;
  pet_id: string;
  pet: IPet;
  status: 'requested' | 'refused' | 'accepted' | 'adopted' | 'canceled';
  created_at: string;
}
