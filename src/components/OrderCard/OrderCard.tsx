import React from 'react';
import { ShoppingBasket, Truck } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CheckoutProductListTab from '../CheckoutProductListTab/CheckoutProductListTab';
import { IProduct } from '@/interface/product';

interface OrderCardProps {
  items: IProduct[];
}

const OrderCard = ({ items }: OrderCardProps) => {
  return (
    <div className="w-full rounded-md shadow-md border-[1px]">
      <div className="flex items-center gap-2 p-2 border-b-[1px] border-gray-200 w-full">
        <ShoppingBasket className="text-primary w-6 h-6 sm:w-7 sm:h-7" />
        <p className="sm:text-lg">Order 1</p>
      </div>
      <div className="w-full px-2">
        {items.map((item, index) => (
          <CheckoutProductListTab key={index} item={item} />
        ))}
      </div>
      <div className="w-full p-2">
        <Select>
          <SelectTrigger>
            <SelectValue
              placeholder={
                <div className="flex items-center gap-2 w-full">
                  <p className="text-sm sm:text-lg">Shipping option</p>
                  <Truck className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jne" className="sm:text-lg">
              JNE
            </SelectItem>
            <SelectItem value="ninja" className="sm:text-lg">
              Ninja
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrderCard;
