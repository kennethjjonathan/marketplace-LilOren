import axiosInstance from '@/lib/axiosInstance';

interface ISellerOrderResponse {
  error: boolean;
  message?: string;
  data?: any;
}

export interface ISellerOrdersParams {
  page: number;
  status: string;
}

interface ISellerOrderRequestData {
  est_days: number;
}

export class SellerOrderService {
  static get = async (url: string, params: ISellerOrdersParams) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: url,
        params: params,
      });
      if (response.status === 200) {
        const responseAPI: ISellerOrderResponse = {
          error: false,
          message: 'success get',
          data: response.data,
        };
        return responseAPI;
      }
    } catch (error: any) {
      const response = {
        error: true,
        message: error.message,
        data: {},
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
