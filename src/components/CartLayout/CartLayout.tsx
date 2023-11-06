import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '../ui/button';

const CartLayout = () => {
  return (
    <section className="w-full fixed bottom-0 left-0 bg-primary-foreground">
      <div className="w-full md:w-[75vw] p-2 pb-3 flex items-center justify-between mx-auto gap-2">
        <div className="flex items-center gap-2 justify-between min-w-fit sm:gap-8">
          <div className="flex items-center gap-2 min-w-fit">
            <Checkbox
              id="check-all-product"
              className="sm:h-5 sm:w-5 xl:w-6 xl:h-6"
            />
            <label
              htmlFor="check-all-product"
              className="text-sm flex flex-col items-start sm:text-base sm:flex-row sm:gap-1 xl:text-lg"
            >
              <p>All</p>
              <p>Products</p>
            </label>
          </div>
          <div className="flex flex-col items-start min-w-fit">
            <p className="text-xs text-gray-500 sm:text-sm xl:text-base">
              Total
            </p>
            <p className="text-base font-semibold sm:text-xl xl:text-2xl">
              Rp 1.900.000
            </p>
          </div>
        </div>
        <Button
          variant={'tertiary'}
          size={'customBlank'}
          className="w-full h-full p-2 text-base sm:w-2/5 sm:text-lg xl:text-xl"
        >
          Check Out
        </Button>
      </div>
    </section>
  );
};

export default CartLayout;
