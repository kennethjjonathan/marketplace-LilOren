import axiosInstance from '@/lib/axiosInstance';

interface ISellerOrderResponse {
  error: boolean;
  message?: string;
  data?: any;
}

interface ISellerOrderRequestData {
  est_days: number;
}

export class SellerOrderService {
  static get = async (url: string) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: url,
      });
      if (response.status === 200) {
        const responseAPI: ISellerOrderResponse = {
          error: false,
          message: 'success get',
          data: {},
        };
        return responseAPI;
      }
    } catch (error: any) {
      const response = {
        error: true,
        message: error.message,
      };
      return response;
    }
  };

  static put = async (url: string, data?: ISellerOrderRequestData) => {
    try {
      const response = await axiosInstance({
        method: 'PUT',
        url: url,
        data: data,
      });
      if (response.status === 200) {
        const responseAPI: ISellerOrderResponse = {
          error: false,
          message: 'success get',
        };
        return responseAPI;
      }
    } catch (error: any) {
      const response = {
        error: true,
        message: error.message,
      };
      return response;
    }
  };
}
