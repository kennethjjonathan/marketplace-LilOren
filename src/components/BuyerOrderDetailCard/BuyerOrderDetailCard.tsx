import { IOrderItem } from '@/interface/orderDetailPage';
import React, { useState } from 'react';
import Divider from '../Divider/Divider';
import BuyerOrderDetailCardItem from '../BuyerOrderDetailCardItem/BuyerOrderDetailCardItem';
import { Utils } from '@/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';

interface BuyerOrderDetailCardProps {
  orderItem: IOrderItem;
}

const BuyerOrderDetailCard = ({ orderItem }: BuyerOrderDetailCardProps) => {
  const [isAddDetailOpen, setIsAddDetailOpen] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col w-full border-[1px] border-gray-100">
        <div className="p-2 border-gray-200 w-full border-b-[1px] flex flex-col gap-1">
          <p className="border-l-[5px] border-primary p-0 pl-1 pt-0.5 text-xs font-bold text-left lg:text-sm 2xl:text-base">
            {orderItem.status}
          </p>
          <div className="flex items-center gap-2 justify-between w-fit">
            <p className="text-sm md:text-base truncate text-gray-500">
              18 Okt 2023
            </p>
            <div className="bg-gray-300 aspect-square w-1 rounded-full md:w-1.5" />
            <Popover open={isAddDetailOpen} onOpenChange={setIsAddDetailOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={'link'}
                  size={'customBlank'}
                  onClick={() => setIsAddDetailOpen(true)}
                  className="text-sm md:text-base font-normal"
                >
                  Address Detail
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="w-full flex flex-col gap-2">
                  <div>
                    <p className="text-xs font-semibold leading-none lg:text-sm xl:text-lg">
                      Receiver:
                    </p>
                    <p className="text-sm leading-tight lg:text-base xl:text-xl">
                      {orderItem.receiver_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-none lg:text-sm xl:text-lg">
                      Address:
                    </p>
                    <p className="text-sm leading-tight line-clamp-2 text-ellipsis lg:text-base xl:text-xl">
                      {orderItem.address_detail}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-none lg:text-sm xl:text-lg">
                      Phone:
                    </p>
                    <p className="text-sm leading-tight lg:text-base xl:text-xl">
                      {orderItem.receiver_phone_number}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-none lg:text-sm xl:text-lg">
                      Courier:
                    </p>
                    <p className="text-sm leading-tight line-clamp-2 text-ellipsis lg:text-base xl:text-xl">
                      {orderItem.courier_name}
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <p className="font-semibold text-base md:text-lg truncate p-2 pb-0 lg:text-xl">
          Shop Name
        </p>
        <div className="w-full px-2 divide-y-[1px] divide-gray-100">
          {orderItem.products.map((item, index) => (
            <BuyerOrderDetailCardItem key={index} item={item} />
          ))}
        </div>
        <div className="w-full p-2 bg-primary-foreground lg:flex lg:justify-end">
          <div className="w-fit lg:w-1/6">
            <p className="font-semibold text-xs text-gray-500 lg:text-base">
              Total:
            </p>
            <p className="text-base font-bold lg:text-xl truncate">
              {Utils.convertPrice(orderItem.total_price)}
            </p>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default BuyerOrderDetailCard;
