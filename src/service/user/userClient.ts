import { IRegister, ISignIn } from '@/interface/user';
import { UserServer } from './userServer';
import CONSTANTS from '@/constants/constants';

export class UserClient {
  static async postRegister(data: IRegister) {
    const response = await UserServer.post(`${CONSTANTS.BASEURL}/users`, data);
    return response;
  }

  static async postSignIn(data: ISignIn) {
    const response = await UserServer.post(`${CONSTANTS.BASEURL}/users`, data);
    return response;
  }
}
