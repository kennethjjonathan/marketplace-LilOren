import React from 'react';
import { Wallet } from 'lucide-react';
import { ICheckoutSummary } from '@/interface/checkoutPage';
import { Utils } from '@/utils';

const dummyWallet = {
  balance: 10000,
};

const dummySummary: ICheckoutSummary = {
  orders: [],
  total_shop_price: 10000,
  total_product: 2,
  total_delivery_cost: 10000,
  service_price: 10000,
  summary_price: 10000,
};

const CheckoutPaymentOption = () => {
  return (
    <div className="w-full border-[1px] border-gray-100 px-2 pb-2">
      <div className="flex items-center gap-2 py-2 border-b-[1px] border-gray-200 w-full">
        <Wallet className="text-primary w-6 h-6 sm:w-7 sm:h-7" />
        <p className="font-semibold text-sm md:text-base">Checkout Summary</p>
      </div>
      <div className="w-full py-2 flex flex-col gap-1 border-b-2 border-gray-300">
        <p className="text-sm text-gray-500">{`Total Price (${
          dummySummary.total_product
        } product${
          dummySummary.total_product > 1 && 's'
        }): ${Utils.convertPrice(dummySummary.total_shop_price)}`}</p>
        <p className="text-sm text-gray-500">{`Shipping Fee: ${Utils.convertPrice(
          dummySummary.total_delivery_cost,
        )}`}</p>
        <p className="text-sm text-gray-500">{`Service Fee: ${Utils.convertPrice(
          dummySummary.service_price,
        )}`}</p>
      </div>
      <div className="flex items-center justify-between py-2 max-w-xs">
        <p className="font-bold text-lg">{`Shopping Total:`}</p>
        <p className="font-bold text-lg">
          {Utils.convertPrice(dummySummary.total_shop_price)}
        </p>
      </div>
      <div className="flex items-center justify-between max-w-xs">
        <p className="text-sm text-gray-500 truncate">{`MyWallet (${Utils.convertPrice(
          dummyWallet.balance,
        )})`}</p>
        <p className="text-xs text-destructive lg:text-sm truncate">
          Balance is insufficient.
        </p>
      </div>
    </div>
  );
};

export default CheckoutPaymentOption;
