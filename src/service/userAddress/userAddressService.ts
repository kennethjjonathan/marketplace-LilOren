import axiosInstance from '@/lib/axiosInstance';
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

export interface IUserAddress {
  id: number;
  receiver_name: string;
  address: string;
  postal_code: string;
  receiver_phone_number: string;
}

export interface IUserAddressResponse {
  error?: boolean;
  message?: string;
  data: IUserAddress[];
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
          data: [],
        };
        return response;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response: IUserAddressResponse = {
          error: true,
          message: error.message,
          data: [],
        };
        return response;
      }
    }
  };

  static get = async (url: string) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: url,
      });
      if (response.status === 200) {
        const responseAPI: IUserAddressResponse = {
          error: false,
          message: 'success',
          data: response.data.data,
        };
        return responseAPI;
      }
    } catch (error: any) {
      const responseAPI: IUserAddressResponse = {
        error: true,
        message: 'failed get user addresses',
        data: [],
      };
      return responseAPI;
    }
  };
}
