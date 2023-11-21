import { Theme, ToastContent, TypeOptions, toast } from 'react-toastify';
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

  static notify = <Message extends ToastContent>(
    message: Message,
    type: TypeOptions,
    theme: Theme,
  ) => {
    toast(message, {
      type: type,
      position: toast.POSITION.TOP_RIGHT,
      theme: theme,
    });
  };

  static isAllCartCheck = (isCheckedCarts: ICheckedCart[]) => {
    const check = isCheckedCarts.every((cart) => cart.is_checked === true);
    return check;
  };

  static handleGeneralError = (error: any) => {
    if (typeof error == 'string') {
      toast(error, {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
      });
      return;
    }
    if (error.message) {
      toast(error.message, {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
      });
      return;
    }
    if (error.response && error.response.data && error.response.data.message) {
      toast(error.response.data.message, {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
      });
      return;
    }
    if (error.response && error.response.statusText) {
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

  static getDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDay();
    const month = d.getMonth();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const year = d.getFullYear();
    return `${day} ${months[month]} ${year}`;
  };
}
