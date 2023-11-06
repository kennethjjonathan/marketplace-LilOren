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
