export interface IWalletInfo {
  is_active: boolean;
  balance: number;
}

export interface ITopUpRequest {
  wallet_pin: string;
  amount: number;
}

export interface IGetPaymentToken {
  wallet_pin: string;
}
