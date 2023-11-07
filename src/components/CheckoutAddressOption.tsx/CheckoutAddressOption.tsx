import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

const CheckoutAddressOption = () => {
  return (
    <div className="w-full rounded-md shadow-xl border-[1px]">
      <div className="flex items-center gap-2 p-2 border-b-[1px] border-gray-200 w-full">
        <MapPin className="text-primary" size={30} />
        <p className="text-base">Your Shipping Address</p>
      </div>
      <div className="w-full p-2 flex justify-between items-center">
        <div className="w-10/12">
          <p className="font-semibold text-lg leading-tight">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <p className="text-sm text-gray-500">
            Kenneth J. Jonathan, 081298562868
          </p>
        </div>
        <div className="w-1/12">
          <ChevronRight className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddressOption;
