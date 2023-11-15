import { IOrderProductItem } from '@/interface/orderDetailPage';
import Image from 'next/image';
import React from 'react';
import { Utils } from '@/utils';

interface BuyerOrderDetailCardItemProps {
  item: IOrderProductItem;
}

const BuyerOrderDetailCardItem = ({ item }: BuyerOrderDetailCardItemProps) => {
  return (
    <div className="flex items-start gap-2 py-2 justify-between">
      <div className="flex gap-2 items-start">
        <div className="relative aspect-square rounded-md overflow-hidden border-[1px] border-gray-100 w-[80px]">
          <Image
            src={item.thumbnail_url}
            alt={item.product_name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 30vw, 20vw"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm sm:text-base font-semibold line-clamp-2 text-ellipsis">
            {`${item.product_name}${
              item.variant1_name ? ` | ${item.variant1_name}` : ''
            }${item.variant2_name ? ` | ${item.variant2_name}` : ''}`}
          </p>
          <p className="text-gray-500 text-xs">{`${
            item.quantity
          } x ${Utils.convertPrice(item.sub_total_price)}`}</p>
        </div>
      </div>
      <div className="min-h-full flex flex-col items-center justify-center border-l-2 border-gray-100 pl-2 w-1/6">
        <p className="font-semibold text-xs text-gray-500 w-full text-left">
          Sub-Total:
        </p>
        <p className="text-base font-bold w-full text-left">
          {Utils.convertPrice(item.sub_total_price)}
        </p>
      </div>
    </div>
  );
};

export default BuyerOrderDetailCardItem;
