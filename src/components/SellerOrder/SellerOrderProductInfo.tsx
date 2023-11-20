import React from 'react';
import Image from 'next/image';
import { IOrderData } from '@/interface/sellerOrder';
import { Utils } from '@/utils';

interface SellerOrderProductInfoProps {
  order_data: IOrderData;
}

const SellerOrderProductInfo = ({
  order_data,
}: SellerOrderProductInfoProps) => {
  return (
    <div className="product flex flex-row gap-4 lg:w-[25vw] w-full md:justify-start">
      <Image
        src={order_data.products[0].thumbnail_url}
        width={100}
        height={100}
        alt="product"
        className={'w-[75px] h-[75px]'}
      />
      <div className="flex flex-col">
        {/* product name */}
        <p className="text-[12px] text-elipsis line-clamp-2 w-full">
          {`${order_data.products[0].product_name}`}
        </p>
        {/* product variant */}
        <div className="product-variant quantity flex flex-row  gap-3 justify-between mt-2">
          <p className="text-[12px] font-light">
            {`${order_data.products[0].variant_name}`}
          </p>
          <p className="text-[12px] font-light">{`x${order_data.products[0].quantity}`}</p>
        </div>
        <p className="text-right text-[12px] font-medium mt-4">
          {Utils.convertPrice(order_data.products[0].sub_total_price)}
        </p>
      </div>
    </div>
  );
};

export default SellerOrderProductInfo;
