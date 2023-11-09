import CONSTANTS from '@/constants/constants';
import { IRegister, ISignIn } from '@/interface/user';
import axios from 'axios';

export class UserClient {
  static async postRegister(data: IRegister) {
    // const response = await axios.post('api/register', data);
    const response = await axios.post(
      `${CONSTANTS.BASEURL}/auth/register`,
      data,
      {
        withCredentials: true,
      },
    );
    return response;
  }

  static async postSignIn(data: ISignIn) {
    // const response = await axios.post(`api/signin`, data);
    const response = await axios.post(`${CONSTANTS.BASEURL}/auth/login`, data, {
      withCredentials: true,
    });
    return response;
  }
}
