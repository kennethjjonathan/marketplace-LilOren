import CONSTANTS from '@/constants/constants';
import { IUserAddressRequest, UserAddressService } from './userAddressService';
import { IAddAddressData } from '@/pages/user/address/create';

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
      `${CONSTANTS.URL_USER_ADDRESS_REGISTRATION}`,
      data,
    );

    return response;
  };
}
