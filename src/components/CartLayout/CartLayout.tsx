import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '../ui/button';

const CartLayout = () => {
  return (
    <section className="w-full fixed bottom-0 left-0 bg-primary-foreground">
      <div className="w-full md:w-[75vw] p-2 pb-3 flex items-center justify-between mx-auto gap-2">
        <div className="flex items-center gap-2 w-fit">
          <Checkbox id="check-all-product" />
          <label
            htmlFor="check-all-product"
            className="text-sm flex flex-col items-start"
          >
            <p>All</p>
            <p>Products</p>
          </label>
        </div>
        <div className="flex flex-col items-start min-w-fit">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-base font-semibold">Rp 1.900.000</p>
        </div>
        <Button
          variant={'tertiary'}
          size={'customBlank'}
          className="w-full h-full p-2 text-base"
        >
          Check Out
        </Button>
      </div>
    </section>
  );
};

export default CartLayout;
