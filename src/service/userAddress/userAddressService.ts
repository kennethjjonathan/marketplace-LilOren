import axios from 'axios';

export interface IUserAddressRequest {
  receiver_name: string;
  receiver_phone_number: string;
  address: string;
  province_id: number;
  city_id: number;
  sub_district: string;
  sub_sub_district: string;
  postal_code: string;
}

export interface IUserAddressResponse {
  error?: boolean;
  message?: string;
}

export class UserAddressService {
  static post = async (url: string, payload: IUserAddressRequest) => {
    try {
      const responseAPI = await axios({
        method: 'POST',
        url: url,
        data: payload,
      });
      if (responseAPI.status === 201) {
        const response: IUserAddressResponse = {
          error: false,
          message: 'created',
        };
        return response;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response: IUserAddressResponse = {
          error: true,
          message: error.message,
        };
        return response;
      }
    }
  };
}
