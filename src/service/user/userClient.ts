import { IRegister, ISignIn } from '@/interface/user';
import { UserServer } from './userServer';
import CONSTANTS from '@/constants/constants';
import axios from 'axios';

export class UserClient {
  static async postRegister(data: IRegister) {
    const response = await axios.post('api/register', data);
    return response;
  }

  static async postSignIn(data: ISignIn) {
    const response = await UserServer.post(
      `${CONSTANTS.BASEURL}/auth/login`,
      data,
    );
    return response;
  }
}
