import { Theme, ToastContent, TypeOptions, toast } from 'react-toastify';
import CONSTANTS from './constants/constants';
import { ICart, ICartItem } from './pages/user/cart';
import { ICheckedCart } from './store/cart/useCart';

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

  static notifyTokenExp = () => {
    toast(CONSTANTS.TOKEN_HAS_EXPIRED, {
      type: 'info',
      position: toast.POSITION.TOP_RIGHT,
      theme: 'colored',
    });
  };

  static notifyGeneralError = (message: string) => {
    toast(message, {
      type: 'error',
      position: toast.POSITION.TOP_RIGHT,
      theme: 'colored',
    });
  };

  static handleGeneralError = (error: any) => {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      toast(error.response.data.message, {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
      });
      return;
    }
    if (error && error.response && error.response.statusText) {
      toast(error.response.statusText, {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
      });
      return;
    }
    toast('Uh-oh something went wrong!', {
      type: 'error',
      position: toast.POSITION.TOP_RIGHT,
      theme: 'colored',
    });
    return;
  };

  static isAllCartCheck = (isCheckedCarts: ICheckedCart[]) => {
    const check = isCheckedCarts.every((cart) => cart.is_checked === true);
    return check;
  };
}
