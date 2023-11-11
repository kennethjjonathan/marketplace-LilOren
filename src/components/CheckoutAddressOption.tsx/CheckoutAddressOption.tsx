import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

const CheckoutAddressOption = () => {
  return (
    <div className="w-full rounded-md shadow-md border-[1px]">
      <div className="flex items-center gap-2 p-2 border-b-[1px] border-gray-200 w-full">
        <MapPin className="text-primary w-6 h-6 sm:w-7 sm:h-7" />
        <p className="sm:text-lg">Your Shipping Address</p>
      </div>
      <div className="w-full p-2 flex justify-between items-center">
        <div className="w-10/12">
          <p className="font-semibold text-lg leading-tight sm:text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <p className="text-sm text-gray-500 sm:text-base">
            Kenneth J. Jonathan, 081298562868
          </p>
        </div>
        <ChevronRight className="h-8 w-8 sm:w-9 sm:h-9" />
      </div>
    </div>
  );
};

export default CheckoutAddressOption;
