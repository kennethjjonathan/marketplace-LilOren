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
            <p className="text-xs md:text-sm w-full text-left">{`Order ${
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
            <SelectTrigger className="max-w-sm">
              <SelectValue
                className="text-sm sm:text-base md:text-lg"
                placeholder={'Shipping option'}
              />
            </SelectTrigger>
            <SelectContent className="max-w-sm">
              <SelectItem
                value="jne"
                className="text-sm sm:text-base md:text-lg"
              >
                JNE
              </SelectItem>
              <SelectItem
                value="ninja"
                className="text-sm sm:text-base md:text-lg"
              >
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
