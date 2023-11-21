import CONSTANTS from '@/constants/constants';
import { HomeService } from './HomeService';

export class HomeClient {
  static getCartInHome = async () => {
    const response = await HomeService.get(
      `${CONSTANTS.BASEURL}/home-page/carts`,
    );
    return response;
  };
}
