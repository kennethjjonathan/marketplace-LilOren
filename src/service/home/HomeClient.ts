import CONSTANTS from '@/constants/constants';
import { HomeService } from './HomeService';
import { Utils } from '@/utils';
import { ToastContent } from 'react-toastify';

export class HomeClient {
  static getCartInHome = async () => {
    const response = await HomeService.get(
      `${CONSTANTS.BASEURL}/home-page/carts`,
    );
    if (response?.error) {
      Utils.notify('something error' as ToastContent, 'error', 'light');
    }
    return response;
  };
}
