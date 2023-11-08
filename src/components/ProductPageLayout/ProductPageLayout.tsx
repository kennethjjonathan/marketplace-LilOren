import React, { Dispatch, SetStateAction } from 'react';
import { ShoppingCart } from 'lucide-react';
import QuantityController from '../QuantityController/QuantityController';
import { Button } from '../ui/button';

interface ProductPageLayoutProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const ProductPageLayout = ({
  quantity,
  setQuantity,
}: ProductPageLayoutProps) => {
  return (
    <div className="bg-primary-foreground w-full fixed z-30 bottom-0 left-0 flex justify-center">
      <div className="w-full md:w-[75vw] p-2 pb-3 flex items-center gap-2 lg:justify-between">
        <div className="hidden lg:flex flex-col items-start min-w-fit justify-center min-h-fit w-1/5">
          <p className="text-gray-500 text-sm">Total Price</p>
          <p className="font-semibold text-2xl">Rp 1.199.000</p>
        </div>
        <div className="w-full lg:w-3/5 flex items-center gap-2">
          <QuantityController
            inputValue={quantity}
            setInputValue={setQuantity}
            maximum={5}
          />
          <Button
            variant={'tertiary'}
            size={'customBlank'}
            className="px-1 py-2 w-full"
          >
            <ShoppingCart className="aspect-square w-5 lg:w-6" />
            <p className="ml-1 text-base lg:text-lg">Add to Cart</p>
          </Button>
          <Button
            variant={'default'}
            size={'customBlank'}
            className="px-1 py-2 w-full h-full text-base lg:text-lg"
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPageLayout;
