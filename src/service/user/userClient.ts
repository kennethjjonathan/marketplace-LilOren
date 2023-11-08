import { IRegister, ISignIn } from '@/interface/user';
import axios from 'axios';

export class UserClient {
  static async postRegister(data: IRegister) {
    const response = await axios.post('api/register', data);
    return response;
  }

  static async postSignIn(data: ISignIn) {
    const response = await axios.post(`api/signin`, data);
    return response;
  }
}
