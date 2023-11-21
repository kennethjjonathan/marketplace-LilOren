import CONSTANTS from '@/constants/constants';
import { HomeService, IRecommendedProductResponse } from './HomeService';

export class HomeClient {
  static getCartInHome = async () => {
    const response = await HomeService.get(
      `${CONSTANTS.BASEURL}/home-page/carts`,
    );
    return response;
  };

  static getRecommendedProduct = async () => {
    const response = await HomeService.get(
      `${CONSTANTS.BASEURL}/home-page/recommended-products`,
    );
    return response as IRecommendedProductResponse;
  };
}
