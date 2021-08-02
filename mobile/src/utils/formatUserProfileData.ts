import {IUserCity} from '../models/petDetails';

export function formatUserProfileData<T>(user: IUserCity): T | any {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    city: user.city?.id,
    phone: user.phone,
    avatarUrl: user.avatarUrl,
  } as T | any;
}
