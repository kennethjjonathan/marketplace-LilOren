import axiosInstance from '@/lib/axiosInstance';
import { ICartHome, IRecommendedProduct } from '@/store/home/useHome';

export interface ICartHomeResponse {
  error: boolean;
  message?: string;
  data?: ICartHome[];
}

export interface IRecommendedProductResponse {
  error: boolean;
  message?: string;
  data?: IRecommendedProduct[];
}

export class HomeService {
  static get = async (url: string) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: url,
      });
      if (response.status === 200) {
        const responseAPI: ICartHomeResponse | IRecommendedProductResponse = {
          error: false,
          data: response.data.data,
        };
        return responseAPI;
      }
    } catch (error: any) {
      const responseAPI = {
        error: true,
        data: [],
      };
      return responseAPI;
    }
  };
}
