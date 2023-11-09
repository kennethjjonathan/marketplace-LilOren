import CONSTANTS from '@/constants/constants';
import { CartService } from './CartService';

export class CartClient {
  static getListofCartItem = async (params?: any) => {
    const response = await CartService.get(
      `/vm1/api/${CONSTANTS.BASEURL}/carts`,
    );
    return response;
  };
}
