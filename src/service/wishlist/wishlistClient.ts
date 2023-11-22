import CONSTANTS from '@/constants/constants';
import { WishlistServer } from './wishlistServer';

export class WishlistClient {
  static getWishlist = async (params: { page: number }) => {
    const response = await WishlistServer.get(
      `${CONSTANTS.BASEURL}/wishlist`,
      params,
    );
    return response;
  };
}
