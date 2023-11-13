import React from 'react';
import { Wallet } from 'lucide-react';
import { ICheckoutSummary } from '@/interface/checkoutPage';
import { Utils } from '@/utils';
import Link from 'next/link';
import { Button } from '../ui/button';

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
      <div className="py-2 border-b-[1px] border-gray-200 w-full">
        <p className="font-semibold text-sm truncate sm:text-base lg:text-lg">
          Checkout Summary
        </p>
      </div>
      <div className="w-full py-2 flex flex-col gap-1 border-b-2 border-gray-300 text-sm sm:text-base">
        <p className="text-gray-500">{`Total Price (${
          dummySummary.total_product
        } product${
          dummySummary.total_product > 1 && 's'
        }): ${Utils.convertPrice(dummySummary.total_shop_price)}`}</p>
        <p className="text-gray-500">{`Shipping Fee: ${Utils.convertPrice(
          dummySummary.total_delivery_cost,
        )}`}</p>
        <p className="text-gray-500">{`Service Fee: ${Utils.convertPrice(
          dummySummary.service_price,
        )}`}</p>
      </div>
      <div className="flex items-center justify-between py-2 text-lg sm:text-xl lg:text-2xl max-w-2xl">
        <p className="font-bold">{`Shopping Total:`}</p>
        <p className="font-bold">
          {Utils.convertPrice(dummySummary.total_shop_price)}
        </p>
      </div>
      <p className="text-sm truncate sm:text-base lg:text-lg">{`MyWallet (${Utils.convertPrice(
        dummyWallet.balance,
      )})`}</p>
      <div className="flex items-center gap-1 mt-1 text-sm sm:text-base">
        <p className="text-destructive truncate">Balance is insufficient.</p>
        <Link href={'/'} className="truncate text-gray-500">
          Top-Up Wallet
        </Link>
      </div>
      <Button className="p-2 text-sm sm:text-base lg:text-lg w-full h-fit mt-3">
        Pay
      </Button>
    </div>
  );
};

export default CheckoutPaymentOption;
