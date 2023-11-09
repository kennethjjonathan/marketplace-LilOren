import React from 'react';
import { IProduct } from '@/interface/product';
import { Checkbox } from '../ui/checkbox';
import CartCardProduct from '../CartCardProduct.tsx/CartCardProduct';
import Divider from '../Divider/Divider';

interface CartCardProps {
  shop: string;
  shop_items: IProduct[];
}

const CartCard = ({ shop, shop_items }: CartCardProps) => {
  return (
    <div className="flex flex-col w-full border-[1px] border-gray-100">
      <div className="flex items-center gap-2 p-2 border-b-[1px] border-gray-200 w-full">
        <Checkbox
          id={`check-${shop}`}
          className="sm:w-5 sm:h-5 xl:w-6 xl:h-6"
        />
        <p className="font-semibold text-sm md:text-base line-clamp-1 overflow-hidden whitespace-nowrap text-elipsis">
          {shop}
        </p>
      </div>
      <div className="w-full flex flex-col gap-2 p-2 divide-x-2">
        {shop_items.map((items, index) => (
          <CartCardProduct key={`key-${items.name} ${index.toString()}`} product={items} />
        ))}
      </div>
      <Divider />
    </div>
  );
};

export default CartCard;
