export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IErrorResponse {
  username?: string;
  email?: string;
  password?: string;
}

interface IMessageReponse {
  message: IErrorResponse | string;
}

export interface IAuthReturnData {
  error: boolean;
  status: number;
  data: IMessageReponse | null;
  message: string;
}
export interface IUserDetails {
  user_id: number;
  username: string;
  is_seller: boolean;
  is_pin_set: boolean;
  cart_count: number;
  profile_picture_url: string;
}

export interface IAddAddressData {
  receiver_name: string;
  receiver_phone_number: string;
  province_id: number;
  city_id: number;
  sub_district: string;
  sub_sub_district: string;
  postal_code: string;
  address: string;
}

export interface IUserAddress {
  id: number;
  receiver_name: string;
  address: string;
  postal_code: string;
  receiver_phone_number: string;
}
