import CONSTANTS from '@/constants/constants';
import { SellerPageServer } from './sellerPageServer';

export class SellerPageClient {
  static getSellerDetails = async (shop_name: string, params: string) => {
    const response = await SellerPageServer.get(
      `${CONSTANTS.BASEURL}/shops/${shop_name}${params}`,
    );
    return response;
  };
}
