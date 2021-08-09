// import {IPet} from './pet';
import {IPetDetails, IUserCity} from './petDetails';

export interface IRequestAdoption {
  id: string;
  user_id: string;
  pet_id: string;
  pet: IPetDetails;
  status: 'requested' | 'refused' | 'accepted' | 'adopted' | 'canceled';
  user?: IUserCity;
  created_at: string;
}
