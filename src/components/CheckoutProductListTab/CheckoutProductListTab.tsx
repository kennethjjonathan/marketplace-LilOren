import React from 'react';
import { IProduct } from '@/interface/product';
import Image from 'next/image';

interface CheckoutProductListTabProps {
  item: IProduct;
}

const CheckoutProductListTab = ({ item }: CheckoutProductListTabProps) => {
  return (
    <div className="w-full py-2">
      <p className="font-semibold sm:text-lg">Shop 1</p>
      <div className="flex mt-1 items-start gap-2">
        <div className="relative aspect-square rounded-md overflow-hidden h-24 sm:h-28">
          <Image
            src={item.image_url}
            alt={`${item.product_name}'s photo`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 30vw, 20vw"
          />
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <p className="text-gray-500 text-sm leading-tight sm:text-base">
            {item.product_name}
          </p>
          <p className="text-gray-500 text-xs leading-none sm:text-sm">{`Variant: ${item.variant1_name}`}</p>
          <p className="font-semibold text-base sm:text-lg">{`${item.quantity} x ${item.base_price}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductListTab;
