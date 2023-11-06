import React from 'react';
import { IProduct } from '@/interface/product';
import { Checkbox } from '../ui/checkbox';
import CartCardProduct from '../CartCardProduct.tsx/CartCardProduct';

interface CartCardProps {
  shop: string;
  items: IProduct[];
}

const CartCard = ({ shop, items }: CartCardProps) => {
  return (
    <div className="flex flex-col w-full rounded-md shadow-xl border-[1px] border-gray-100">
      <div className="flex items-center gap-2 p-2 border-b-[1px] border-gray-200 w-full">
        <Checkbox id={`check-${shop}`} />
        <p className="font-semibold">{shop}</p>
      </div>
      <div className="w-full flex flex-col gap-2 p-2 divide-x-2">
        {items.map((items, index) => (
          <CartCardProduct key={index} product={items} />
        ))}
      </div>
    </div>
  );
};

export default CartCard;
