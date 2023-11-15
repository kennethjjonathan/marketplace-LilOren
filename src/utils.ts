import { Theme, ToastContent, TypeOptions, toast } from 'react-toastify';
import { ICart, ICartItem } from './pages/user/cart';

export class Utils {
  static convertPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    })
      .format(price)
      .slice(0, -3);
  };

  static isEmpty = (data: any) => {
    return data.length === 0 || data === '' || data === 0;
  };

  static notify = (message: ToastContent, type: TypeOptions, theme: Theme) => {
    toast(message, {
      type: type,
      position: toast.POSITION.TOP_RIGHT,
      theme: theme,
    });
  };

  static isAllCartCheck = (cartItems: ICart) => {
    const items = cartItems.items;
    const is_all_checked = items.every((item_per_seller) => {
      const all_product_checked = item_per_seller.products.every(
        (product) => product.is_checked === true,
      );
      return all_product_checked;
    });
    return is_all_checked;
  };
}
