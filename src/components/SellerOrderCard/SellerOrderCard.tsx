import AsyncButton from '@/components/AsyncButton/AsyncButton';
import SellerOrderAddress from '@/components/SellerOrder/SellerOrderAddress';
import SellerOrderCourier from '@/components/SellerOrder/SellerOrderCourier';
import SellerOrderProductInfo from '@/components/SellerOrder/SellerOrderProductInfo';
import SellerOrderDeliveryFormModal from '@/components/SellerOrderDeliveryFormModal/SellerOrderDeliveryFormModal';
import { Button } from '@/components/ui/button';
import { IOrderData } from '@/interface/sellerOrder';
import { SellerOrderClient } from '@/service/sellerOrder/SellerOrderClient';
import { useSeller } from '@/store/seller/useSeller';
import { Utils } from '@/utils';
import { useState } from 'react';
import { ToastContent } from 'react-toastify';

interface SellerOrderCardProps {
  order_data: IOrderData;
  index: number;
  total_products: number;
}

const SellerOrderCard = ({
  order_data,
  index,
  total_products,
}: SellerOrderCardProps) => {
  const [showEstDays, setShowEstDays] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const setSellerChangeStatus = useSeller.use.setSellerChangeStatus();

  const handleEditOrder = async (orderStatus: string, orderId: number) => {
    if (orderStatus === 'NEW') {
      setLoadingButton(true);
      const response = await SellerOrderClient.putOrderStatusToProcess(orderId);
      if (response?.error) {
        Utils.notify(
          'failed to process a new order' as ToastContent,
          'error',
          'colored',
        );
      } else {
        Utils.notify(
          'success process a new order' as ToastContent,
          'success',
          'colored',
        );
      }
      setLoadingButton(false);
      setSellerChangeStatus('PROCESS');
    } else {
      setShowEstDays(true);
    }
  };

  const handleGetAction = (order_status: string) => {
    let action = '';
    if (order_status === 'NEW') {
      action = 'Process Order';
    } else if (order_status === 'PROCESS') {
      action = 'Process To Ship';
    }
    return action;
  };

  const handleGetStatus = (order_status: string) => {
    let label = '';
    if (order_status === 'NEW') {
      label = 'New Order';
    } else if (order_status === 'PROCESS') {
      label = 'Ready To Ship';
    } else if (order_status === 'DELIVER') {
      label = 'In Delivery';
    } else if (order_status === 'ARRIVE') {
      label = 'Arrived';
    } else if (order_status === 'RECEIVE') {
      label = 'Completed';
    } else if (order_status === 'CANCEL') {
      label = 'Cancelled';
    }
    return label;
  };

  const handleGetStatusColor = (order_status: string) => {
    let color = '';
    if (order_status === 'NEW') {
      color = 'border-primary';
    } else if (order_status === 'PROCESS') {
      color = 'border-yellow-400';
    } else if (order_status === 'DELIVER') {
      color = 'border-blue-500';
    } else if (order_status === 'ARRIVE' || order_status === 'RECEIVE') {
      color = 'border-green-500';
    } else if (order_status === 'CANCEL') {
      color = 'border-red-500';
    }
    return color;
  };

  return (
    <div
      className={`w-[100vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw] p-2 bg-white rounded-b-lg mb-3 lg:mb-4 shadow-md ${
        index !== 0 && 'rounded-t-lg'
      }`}
    >
      {/* top content */}
      <div className="status-inv-number-buyer-ordertime flex flex-row mb-3">
        <div
          className={`h-[20px] border-l-[6px] ${handleGetStatusColor(
            order_data.status,
          )}`}
        ></div>
        <p className="pl-2 font-bold text-[12px] lg:text-[16px]">
          {handleGetStatus(order_data.status)}
        </p>
      </div>
      {/* product address courier */}
      <div className="product-address-courier flex mt-2 pb-2 lg:gap-8 items-start my-4">
        <SellerOrderProductInfo order_data={order_data} />
        <SellerOrderAddress order_data={order_data} />
        <SellerOrderCourier order_data={order_data} />
      </div>

      {/* total items and total price */}
      <div className="bg-input flex flex-row total-items items-center px-2 py-[4px] justify-between rounded-sm lg:h-[35px]">
        <p className="text-[12px] font-medium lg:text-[14px]">
          Total{' '}
          <span className="font-light lg:text-[14px]">{`(${total_products} ${
            total_products > 1 ? 'items' : 'item'
          })`}</span>
        </p>
        <p className="text-[12px] font-medium lg:text-[16px]">
          {Utils.convertPrice(order_data.total_price)}
        </p>
      </div>
      {handleGetAction(order_data.status) && (
        <div className="w-full flex justify-end mt-4">
          {loadingButton ? (
            <AsyncButton isLoading={true}>{'Processing'}</AsyncButton>
          ) : (
            <Button
              className={` text-[12px] h-[30px] lg:h-[40px] ${
                order_data.status === 'PROCESS' ? 'bg-yellow-500' : 'bg-primary'
              }`}
              variant={'default'}
              onClick={() => handleEditOrder(order_data.status, order_data.id)}
            >
              {handleGetAction(order_data.status)}
            </Button>
          )}
        </div>
      )}
      <SellerOrderDeliveryFormModal
        order_data={order_data}
        isVisible={showEstDays}
        onClose={() => setShowEstDays(false)}
        setShowEstDays={setShowEstDays}
      />
    </div>
  );
};

export default SellerOrderCard;
