import connect from '@/utils/dbConnect';
import Domain from './domainModel';
import Popup from './popupModel';
import User from './userModel';

export default async function getModels() {
  await connect();

  return { Domain, Popup, User } as const;
}
