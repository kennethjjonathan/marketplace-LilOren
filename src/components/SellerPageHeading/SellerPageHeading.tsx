import Image from 'next/image';
import React from 'react';

const SellerPageHeading = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full border-[1px] border-red-200">
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
          <p className="font-bold text-[18px]">{'Hyouka'}</p>
          <p className="font-normal text-muted-foreground">Since: 2013</p>
        </div>
      </div>
    </div>
  );
};

export default SellerPageHeading;
