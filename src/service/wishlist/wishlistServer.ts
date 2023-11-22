import { IWishlistResponse } from '@/interface/wishlist';
import axiosInstance from '@/lib/axiosInstance';

export class WishlistServer {
  static get = async (
    url: string,
    params: {
      page: number;
    },
  ) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: url,
        params: params,
      });
      if (response.status === 200) {
        const responseAPI: IWishlistResponse = {
          error: false,
          message: 'success get',
          data: response.data.data,
        };
        return responseAPI;
      }
    } catch (error: any) {
      const responseAPI: IWishlistResponse = {
        error: true,
        message: 'failed get user addresses',
        data: undefined,
      };
      return responseAPI;
    }
  };
}
