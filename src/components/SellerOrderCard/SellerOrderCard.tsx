import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

interface SellerOrderCardProps {
  order_status: string;
}

const SellerOrderCard = ({ order_status }: SellerOrderCardProps) => {
  const handleEditOrder = (order_status: string, order_id: number) => {
    console.log('time to edit order');
  };

  const handleGetAction = (order_status: string) => {
    let action = '';
    switch (order_status) {
      case 'NEW':
        action = 'Process Order';
        break;
      case 'PROCESS':
        action = 'Process Order';
        break;
      case 'DELIVER':
        action = 'Process Order';
        break;
      case 'ARRIVE':
        action = 'Process Order';
        break;
      case 'RECEIVE':
        action = 'Process Order';
        break;
      case 'CANCEL':
        action = 'Process Order';
        break;
      default:
        action = 'Process Order';
        break;
    }

    return action;
  };

  return (
    <div className="w-[85vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw] p-2">
      {/* top content */}
      <div className="status-inv-number-buyer-ordertime flex flex-row mb-3">
        <div className="h-[20px] border-l-[6px] border-primary"></div>
        <p className="pl-2 font-bold text-[12px] lg:text-[16px]">New Order</p>
      </div>
      {/* product address courier */}
      <div className="product-address-courier flex mt-2 pb-2 lg:gap-8 items-start">
        {/* product */}
        <div className="product flex flex-row gap-4 lg:w-[20vw]">
          <Image
            src={
              'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/16/9a895898-56d6-4430-b338-bbd43107f091.png.webp?ect=4g'
            }
            width={100}
            height={100}
            alt="product"
            className={'w-[75px] h-[75px]'}
          />
          <div className="flex flex-col">
            {/* product name */}
            <p className="text-[12px] text-elipsis line-clamp-2">
              Apple iPhone 15 Garansi Resmi - 128GB 256GB 512GB -
              Black+Proteksi, 256GB
            </p>
            {/* product variant */}
            <div className="product-variant quantity flex justify-between mt-2">
              <p className="text-[12px] font-light">
                {'Black+Proteksi, 256GB'}
              </p>
              <p className="text-[12px] font-light">{'x2'}</p>
            </div>
            <p className="text-right text-[12px] font-medium mt-4">
              Rp40.000.000
            </p>
          </div>
        </div>
        {/* address */}
        <div className="address lg:flex hidden lg:flex-col lg:w-[250px]">
          <p className="font-bold text-[12px]">Address</p>
          <div className="address-details text-[12px]">
            <p className="receiver-name-phone">{'Endriyani (08129126917)'}</p>
            <p className="address">
              {
                'Jl Rawamangun Muka II Blok E 51 RT 006/ RW 012, Rawamangun, Pulogadung, Jakarta Timur '
              }
            </p>
            <p className="postal-code">{'13220'}</p>
          </div>
        </div>
        {/* courier */}
        <div className="courier lg:flex hidden lg:flex-col lg:w-[200px] h-full ">
          <p className="font-bold text-[12px]">Courier</p>
          <div className="courier-service text-[12px]">
            <p className="courier detail">{'JNE-Reguler'}</p>
          </div>
        </div>
      </div>

      <div className="border-b-[1px] lg:hidden"></div>
      <div className="see-more-product mb-3 mt-2 text-left lg:w-[200px]">
        <Button variant={'link'} className="p-0 text-[12px] h-[20px]">
          See more 1 product
        </Button>
      </div>
      {/* total items and total price */}
      <div className="bg-input flex flex-row total-items items-center px-2 py-[4px] justify-between rounded-sm lg:h-[40px]">
        <p className="text-[12px] font-medium lg:text-[14px]">
          Total <span className="font-light lg:text-[14px]">{'(3 items)'}</span>
        </p>
        <p className="text-[12px] font-medium lg:text-[16px]">
          {'Rp45.000.000'}
        </p>
      </div>
      <div className="w-full flex justify-end mt-4">
        <Button
          className="text-[12px] h-[30px] lg:h-[40px]"
          variant={'default'}
          onClick={() => handleEditOrder('NEW', 1)}
        >
          {handleGetAction('NEW')}
        </Button>
      </div>
    </div>
  );
};

export default SellerOrderCard;
