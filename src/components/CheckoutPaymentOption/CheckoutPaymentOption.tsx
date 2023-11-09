import React from 'react';
import { Wallet } from 'lucide-react';

const dummyWallet = {
  balance: 10000,
};

const CheckoutPaymentOption = () => {
  return (
    <div className="w-full rounded-md shadow-md border-[1px]">
      <div className="flex items-center gap-2 p-2 w-full border-b-[1px]">
        <Wallet className="text-primary w-6 h-6 sm:w-7 sm:h-7" />
        <p className="sm:text-lg">MyWallet</p>
      </div>
      <div className="w-full p-2">
        <p className="text-xl font-semibold w-full sm:text-2xl">{`Balance:
          ${dummyWallet.balance}`}</p>
        <p className="text-sm text-destructive sm:text-base">
          Oops, your balance is insufficient.
        </p>
      </div>
    </div>
  );
};

export default CheckoutPaymentOption;
