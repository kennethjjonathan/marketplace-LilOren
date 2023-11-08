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
      theme: theme,
    });
  };

  static getDDMonthYYYYTime = (d: string) => {
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
    const date = new Date(d);
    let result: string = '';
    const day = date.getDay().toString();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('it-IT').slice(0, -3);
    result += day + ' ' + month + ' ' + year + ', ' + time;
    return result;
  };

  static getDateAndTime = (d: string) => {
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
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const date = new Date(d);

    let result = '';
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('US-id');
    result += day + ' ' + month + ' ' + year + ', ' + time;
    return result;
  };

  static getDate = (d: string) => {
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
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const date = new Date(d);

    let result = '';
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    result += day + ' ' + month + ' ' + year;
    return result;
  };
}
