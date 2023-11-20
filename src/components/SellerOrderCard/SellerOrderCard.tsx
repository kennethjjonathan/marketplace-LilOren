import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IOrderData } from '@/interface/sellerOrder';
import { Utils } from '@/utils';
import { SellerOrderClient } from '@/service/sellerOrder/SellerOrderClient';
import Modal from '../Modal/Modal';
import { InputWithLabel } from '../InputWithLabel/InputWithLabel';
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
  const [deliveryEstDays, setDeliveryEstDays] = useState<string>('1');
  const [isDeliveryEstDaysValid, setIsDeliveryEstDaysValid] =
    useState<boolean>(true);
  const handleEditOrder = async (orderStatus: string, orderId: number) => {
    if (orderStatus === 'NEW') {
      await SellerOrderClient.putOrderStatusToProcess(orderId);
    } else {
      setShowEstDays(true);
    }
  };

  const handleSubmitToDelivery = async (e: React.SyntheticEvent) => {
    setShowEstDays(false);
    e.preventDefault();
    console.log('submit');
    const response = await SellerOrderClient.putOrderStatusToDeliver(
      {
        est_days: parseInt(deliveryEstDays),
      },
      order_data.id,
    );
    if (response?.error) {
      Utils.notify('Failed process delivery' as ToastContent, 'error', 'light');
    } else {
      Utils.notify(
        'Success process order to delivery' as ToastContent,
        'success',
        'colored',
      );
    }
  };

  const validateData = (pattern: RegExp): boolean => {
    const dataRegex = pattern;
    if (!dataRegex.test(deliveryEstDays.toString())) {
      setIsDeliveryEstDaysValid(false);
      return false;
    }
    setIsDeliveryEstDaysValid(true);
    return true;
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
      <div className="product-address-courier flex mt-2 pb-2 lg:gap-8 items-start">
        {/* product */}
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
        {/* address */}
        <div className="address lg:flex hidden lg:flex-col lg:w-[250px]">
          <p className="font-bold text-[12px]">Address</p>
          <div className="address-details text-[12px]">
            <p className="receiver-name-phone">{`${order_data.receiver_name} (${order_data.receiver_phone_number})`}</p>
            <p className="address">{order_data.address_detail}</p>
            <p className="postal-code">{'13220'}</p>
          </div>
        </div>
        {/* courier */}
        <div className="courier lg:flex hidden lg:flex-col lg:w-[200px] h-full ">
          <p className="font-bold text-[12px]">Courier</p>
          <div className="courier-service text-[12px]">
            <p className="courier detail">{`${order_data.courier_name} - Reguler`}</p>
          </div>
        </div>
      </div>

      <div className="border-b-[1px] lg:hidden"></div>
      {total_products > 1 && (
        <div className="see-more-product mb-3 mt-2 text-left lg:w-[200px]">
          <Button variant={'link'} className="p-0 text-[12px] h-[20px]">
            {` See more ${total_products - 1} product`}
          </Button>
        </div>
      )}
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
          <Button
            className={` text-[12px] h-[30px] lg:h-[40px] ${
              order_data.status === 'PROCESS' ? 'bg-yellow-500' : 'bg-primary'
            }`}
            variant={'default'}
            onClick={() => handleEditOrder(order_data.status, order_data.id)}
          >
            {handleGetAction(order_data.status)}
          </Button>
        </div>
      )}
      <Modal
        title="Delivery Estimate Days"
        isVisible={showEstDays}
        onClose={() => setShowEstDays(false)}
        position="center"
      >
        <div className="bg-white w-[100vw] md:w-[50vw] rounded-xl p-3 h-[20vh] relative">
          <form
            onSubmit={handleSubmitToDelivery}
            className="flex flex-col gap-4"
          >
            <InputWithLabel
              type="number"
              label={'Estimated Delivery (1/2/3 days)'}
              id="delivery-est-days"
              labelStyling="font-light"
              value={deliveryEstDays}
              min={1}
              max={3}
              onChange={(e) => setDeliveryEstDays(e.target.value)}
              isValid={isDeliveryEstDaysValid}
              onBlur={() => validateData(/^[1-3]{1}$/)}
              onKeyDown={(e) =>
                ['ArrowUp', 'ArrowDown', 'e', 'E', '+', '-', '.'].includes(
                  e.key,
                ) && e.preventDefault()
              }
              validation="Input only number 1 / 2 / 3"
              required
            />
            {deliveryEstDays && (
              <div className="absolute top-[40px] md:top-[52px] right-6">
                <p className="text-muted-foreground">
                  {parseInt(deliveryEstDays) > 1 ? 'Days' : 'Day'}
                </p>
              </div>
            )}
            <div className="w-full flex justify-end pt-3 absolute bottom-4 right-4">
              <Button
                type="submit"
                disabled={deliveryEstDays === '' || deliveryEstDays.length > 1}
                className="h-[30px] lg:h-[40px]"
              >
                {'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SellerOrderCard;
