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
