import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import QuantityController from '../QuantityController/QuantityController';
import { Button } from '../ui/button';
import { IProductVariant } from '@/interface/productPage';
import { Utils } from '@/utils';

interface ProductPageLayoutProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  variant: IProductVariant | undefined;
}

const ProductPageLayout = ({
  quantity,
  setQuantity,
  variant,
}: ProductPageLayoutProps) => {
  const [isMaxValid, setIsMaxValid] = useState<boolean>(true);
  function handleVariantChange() {
    setIsMaxValid(true);
    if (variant === undefined) {
      setQuantity(1);
    } else if (variant !== undefined && variant.stock < quantity) {
      setQuantity(variant.stock);
    } else if (variant !== undefined && quantity < 1) {
      setQuantity(1);
    }
  }

  function handleMaximumValid(sign: 'minus' | 'plus') {
    if (variant !== undefined && quantity < variant.stock && sign === 'plus') {
      setQuantity((prev) => prev + 1);
      return;
    }
    if (
      variant !== undefined &&
      quantity === variant.stock &&
      sign === 'plus'
    ) {
      setIsMaxValid(false);
      return;
    }
    if (sign === 'minus' && variant !== undefined && quantity > 1) {
      setQuantity((prev) => prev - 1);
      setIsMaxValid(true);
      return;
    }
  }
  useEffect(() => handleVariantChange(), [variant]);
  return (
    <div className="bg-primary-foreground w-full fixed z-30 bottom-0 left-0 flex justify-center">
      <div className="w-full md:w-[75vw] p-2 pb-3 flex items-center gap-2 lg:justify-between">
        <div className="hidden lg:flex flex-col items-start min-w-fit justify-center min-h-fit w-1/5">
          {variant === undefined ? (
            <p className="font-semibold text-2xl">
              Please choose a combination
            </p>
          ) : (
            <>
              <p className="text-gray-500 text-sm">Total Price</p>
              <p className="font-semibold text-2xl truncate max-w-[2/5]">
                {variant.discount !== 0
                  ? Utils.convertPrice(variant.discounted_price * quantity)
                  : Utils.convertPrice(variant.price * quantity)}
              </p>
            </>
          )}
        </div>
        <div className="w-full lg:w-3/5 flex items-end gap-2">
          <div className="w-fit flex flex-col items-center gap-1">
            {variant !== undefined && !isMaxValid ? (
              <p className="text-xs sm:text-sm lg:text-base text-destructive">{`Limit: ${variant.stock}!`}</p>
            ) : variant !== undefined && isMaxValid ? (
              <p className="text-xs sm:text-sm lg:text-base">{`Stock: ${variant.stock}`}</p>
            ) : null}
            <QuantityController
              inputValue={quantity}
              setInputValue={setQuantity}
              maximum={variant === undefined ? 0 : variant.stock}
              handleMaximumValid={handleMaximumValid}
            />
          </div>

          <Button
            variant={'tertiary'}
            size={'customBlank'}
            className="px-1 py-2 w-full h-11 xl:h-12"
          >
            <ShoppingCart className="aspect-square w-5 lg:w-6" />
            <p className="ml-1 text-base lg:text-lg">Add to Cart</p>
          </Button>
          <Button
            variant={'default'}
            size={'customBlank'}
            className="px-1 py-2 w-full h-11 text-base lg:text-lg xl:h-12"
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPageLayout;
