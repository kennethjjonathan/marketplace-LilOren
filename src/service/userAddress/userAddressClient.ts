import CONSTANTS from '@/constants/constants';
import { IUserAddressRequest, UserAddressService } from './userAddressService';
import { IAddAddressData } from '@/pages/user/address/create';
import { Utils } from '@/utils';
import { ToastContent } from 'react-toastify';

export class UserAddressClient {
  static create = async (payload: IAddAddressData) => {
    const data: IUserAddressRequest = {
      receiver_name: payload.receiver_name,
      receiver_phone_number: payload.receiver_phone_number,
      address: payload.address,
      province_id: parseInt(payload.province_id),
      city_id: parseInt(payload.city_id),
      sub_district: payload.sub_district,
      sub_sub_district: payload.sub_sub_district,
      postal_code: payload.postal_code,
    };

    const response = await UserAddressService.post(
      `${CONSTANTS.BASEURL}/profile/addresses`,
      data,
    );

    return response;
  };

  static getUserAddresses = async () => {
    const response = await UserAddressService.get(
      `${CONSTANTS.BASEURL}/profile/addresses`,
    );
    const error = response?.error;
    if (error) {
      Utils.notify(
        'failed to get user addresses' as ToastContent,
        'error',
        'light',
      );
    }
    return response;
  };

  static editDefaultAddress = async (addres_id: number) => {
    const response = await UserAddressService.put(
      `${CONSTANTS.BASEURL}/profile/addresses/change-default`,
      { id: addres_id },
    );
    const error = response?.error;
    if (error) {
      Utils.notify(response.message as ToastContent, 'error', 'light');
    }
    return response;
  };
}
