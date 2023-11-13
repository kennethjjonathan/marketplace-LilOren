import React from 'react';
import { Truck } from 'lucide-react';
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
import { ICheckout } from '@/interface/checkoutPage';
import Divider from '../Divider/Divider';

interface OrderCardProps {
  checkout: ICheckout;
  index: number;
  isMultiple: boolean;
}

const OrderCard = ({ checkout, index, isMultiple }: OrderCardProps) => {
  return (
    <>
      <div className="w-full border-[1px] border-gray-100 px-2 pt-2 pb-5">
        <div className="pb-2 border-b-[1px] border-gray-200 w-full">
          {isMultiple && (
            <p className="font-semibold text-xs md:text-sm w-full text-center">{`Order ${
              index + 1
            }`}</p>
          )}
          <p className="font-semibold text-sm sm:text-base md:text-lg w-full text-left truncate">
            {checkout.shop_name}
          </p>
          <p className="text-xs sm:text-sm md:text-base w-full text-left text-gray-400 truncate">
            {checkout.shop_city}
          </p>
        </div>
        <div className="w-full flex flex-col gap-1">
          {checkout.items.map((item, index) => (
            <CheckoutProductListTab key={index} item={item} />
          ))}
        </div>
        <div className="w-full">
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
      <Divider />
    </>
  );
};

export default OrderCard;
