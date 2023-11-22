import { IOrderItem } from '@/interface/orderDetailPage';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Divider from '../Divider/Divider';
import BuyerOrderDetailCardItem from '../BuyerOrderDetailCardItem/BuyerOrderDetailCardItem';
import { Utils } from '@/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import axiosInstance from '@/lib/axiosInstance';

interface BuyerOrderDetailCardProps {
  orderItem: IOrderItem;
  setUpdateToggle: Dispatch<SetStateAction<boolean>>;
}

const BuyerOrderDetailCard = ({
  orderItem,
  setUpdateToggle,
}: BuyerOrderDetailCardProps) => {
  const [isAddDetailOpen, setIsAddDetailOpen] = useState<boolean>(false);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  function parseStatus(inputString: string): string {
    switch (inputString) {
      case 'NEW':
        return 'Waiting for Confirmation';
      case 'PROCESS':
        return 'On Process';
      case 'DELIVER':
        return 'On Delivery';
      case 'ARRIVE':
        return 'Arrived';
      case 'RECEIVE':
        return 'Received';
      case 'CANCEL':
        return 'Cancelled';
      default:
        return '';
    }
  }

  async function handleSpecialAction() {
    if (orderItem.status !== 'NEW' && orderItem.status !== 'ARRIVE') {
      return;
    }
    let specEndPoint: string = '';
    if (orderItem.status === 'NEW') {
      specEndPoint = 'cancel';
    } else {
      specEndPoint = 'receive';
    }

    setIsActionLoading(true);
    try {
      await axiosInstance.put(`/orders/${orderItem.id}/${specEndPoint}`);
      Utils.notify('Order successfully updated', 'success', 'colored');
      setUpdateToggle((prev) => !prev);
    } catch (error) {
      Utils.handleGeneralError(error);
      console.error(error);
    } finally {
      setIsActionLoading(false);
    }
  }
  return (
    <>
      <div className="flex flex-col w-full border-[1px] border-gray-100">
        <div className="p-2 border-gray-200 w-full border-b-[1px] flex flex-col gap-1">
          <p className="border-l-[5px] border-primary p-0 pl-1 pt-0.5 text-xs font-bold text-left lg:text-sm 2xl:text-base">
            {parseStatus(orderItem.status)}
          </p>
          <div className="flex items-center gap-2 justify-between w-fit max-w-full">
            <p className="text-sm md:text-base truncate text-gray-500">
              {`Estimated arrival: ${Utils.getDate(orderItem.eta)}`}
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
                  Delivery Detail
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
                  <div>
                    <p className="text-xs font-semibold leading-none lg:text-sm xl:text-lg">
                      Delivery Fee:
                    </p>
                    <p className="text-sm leading-tight line-clamp-2 text-ellipsis lg:text-base xl:text-xl">
                      {Utils.convertPrice(orderItem.delivery_cost)}
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <p className="font-semibold text-base md:text-lg truncate p-2 pb-0 lg:text-xl">
          {orderItem.shop_name}
        </p>
        <div className="w-full px-2 divide-y-[1px] divide-gray-100">
          {orderItem.products.map((item, index) => (
            <BuyerOrderDetailCardItem key={index} item={item} />
          ))}
        </div>
        {(orderItem.status === 'NEW' || orderItem.status === 'ARRIVE') && (
          <div className="w-full p-2 flex items-center justify-end">
            {orderItem.status === 'NEW' ? (
              <Button
                variant={'destructive'}
                onClick={handleSpecialAction}
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <div className="border-4 border-destructive-foreground border-t-transparent rounded-full animate-spin aspect-square h-4" />
                ) : (
                  <p>Cancel Order</p>
                )}
              </Button>
            ) : (
              <Button onClick={handleSpecialAction} disabled={isActionLoading}>
                {isActionLoading ? (
                  <div className="border-4 border-primary-foreground-foreground border-t-transparent rounded-full animate-spin aspect-square h-4" />
                ) : (
                  <p>Confirm Receive</p>
                )}
              </Button>
            )}
          </div>
        )}
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
