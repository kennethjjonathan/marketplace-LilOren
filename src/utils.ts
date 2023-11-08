import { Theme, ToastContent, TypeOptions, toast } from 'react-toastify';

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
    });
  };
}
