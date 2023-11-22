import { ISellerDetails } from '@/store/sellerPage/sellerPage';
import Image from 'next/image';
import React from 'react';

interface SellerPageHeadingProps {
  sellerPage: ISellerDetails;
}

const SellerPageHeading = ({ sellerPage }: SellerPageHeadingProps) => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Seller Info Name, Since When, Total Products */}
      <div className="flex flex-row items-center gap-3">
        {/* Image */}
        <Image
          src={'/seller-logo.png'}
          alt={'seller-profile'}
          width={200}
          height={200}
          className="rounded-full w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
        />
        {/* Name | since  */}
        <div className="flex flex-col">
          <p className="font-bold text-[16px] md:text-[18px]">
            {sellerPage.shop_name}
          </p>
          <p className="font-normal text-muted-foreground text-[14px] md:text-[16px]">
            {sellerPage.years}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerPageHeading;
