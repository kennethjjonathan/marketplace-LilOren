import CONSTANTS from '@/constants/constants';
import { CartService, ICartCheckedRequest, ICartRequest } from './CartService';

export class CartClient {
  static getListofCartItem = async (params?: any) => {
    const response = await CartService.get(
      `/vm1/api/${CONSTANTS.BASEURL}/carts`,
    );
    return response;
  };

  static updateIsChecked = async (data: ICartCheckedRequest) => {
    const response = await CartService.post(
      `${CONSTANTS.BASEURL}/carts/check-items`,
      data,
    );
    return response;
  };

  static updateQuantityInCart = async (cartId: number, data: ICartRequest) => {
    const response = await CartService.put(
      `${CONSTANTS.BASEURL}/carts/${cartId}`,
      data,
    );
    return response;
  };
}
