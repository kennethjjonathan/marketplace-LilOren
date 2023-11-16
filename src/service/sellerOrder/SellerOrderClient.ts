import CONSTANTS from '@/constants/constants';
import { ISellerOrdersParams, SellerOrderService } from './SellerOrderService';

export class SellerOrderClient {
  static getSellerOrders = async (params: ISellerOrdersParams) => {
    const response = await SellerOrderService.get(
      `${CONSTANTS.BASEURL}/orders/seller`,
      params,
    );
    return response;
  };

  static putOrderStatusToProcess = async (order_id: number) => {
    const response = await SellerOrderService.put(
      `${CONSTANTS.BASEURL}/orders/seller/${order_id}/process`,
    );
    return response;
  };

  static putOrderStatusToArrive = async (order_id: number) => {
    const response = await SellerOrderService.put(
      `${CONSTANTS.BASEURL}/orders/seller/${order_id}/arrive`,
    );
    return response;
  };

  static putOrderStatusToDeliver = async (
    data: {
      est_days: number;
    },
    cart_id: number,
  ) => {
    const response = await SellerOrderService.put(
      `${CONSTANTS.BASEURL}/order/seller/${cart_id}/deliver`,
      data,
    );
    return response;
  };
}
