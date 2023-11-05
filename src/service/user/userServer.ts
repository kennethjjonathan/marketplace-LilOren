import { IRegister, ISignIn } from '@/interface/user';
import axios from 'axios';

export class UserServer {
  static async post(url: string, payload: IRegister | ISignIn) {
    try {
      const response = await axios.post(url, payload);
      if (response.status === 201 || response.status === 200) {
        const responseAPI = {
          error: false,
          status: response.status,
          data: response.data,
          message: response.statusText,
        };
        return responseAPI;
      }
    } catch (error: any) {
      const responseAPI = {
        error: true,
        status: error.response.status,
        data: null,
        message: error.response.statusText,
      };
      return responseAPI;
    }
  }
}
