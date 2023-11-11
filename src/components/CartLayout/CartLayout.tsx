import React, { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Utils } from '@/utils';
import { useCart } from '@/store/cart/useCart';

interface CartLayoutProps {
  total: number;
}

const CartLayout = ({ total }: CartLayoutProps) => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const is_checked_cart = useCart.use.is_checked_carts();
  const cartItems = useCart.use.cartItems();

  const checkAllCartItem = () => {
    const updated_is_checked_cart = [...is_checked_cart];
    updated_is_checked_cart.forEach((cart_by_seller) => {});
  };

  useEffect(() => {
    checkAllCartItem();
  }, []);
  return (
    <section className="w-full fixed bottom-0 left-0 bg-primary-foreground">
      <div className="w-full md:w-[75vw] p-2 pb-3 flex items-center justify-between mx-auto gap-2">
        <div className="flex items-center gap-2 justify-between w-full sm:gap-8">
          <div className="flex items-center gap-2 min-w-fit justify-between">
            {/* checkbox label */}
            <div className="flex flex-row gap-2 items-center">
              <Checkbox
                id="check-all-product"
                className="sm:h-5 sm:w-5 xl:w-6 xl:h-6"
                checked={isAllChecked}
                // checked=
              />
              <label
                htmlFor="check-all-product"
                className="text-sm flex flex-col items-start sm:text-base sm:flex-row sm:gap-1 xl:text-lg"
              >
                <p className="text-[12px] md:text-[14px] lg:text-[16px] text-muted-foreground">
                  All
                </p>
              </label>
            </div>
          </div>
          {/* total checkout button */}
          <div className="flex flex-row gap-2 lg:gap-4 items-center">
            <div className="text-right justify-end items-start">
              <p className="text-xs text-gray-500 sm:text-sm xl:text-base text-right">
                Total
              </p>
              <p
                className={`text-base  sm:text-xl xl:text-2xl text-right ${
                  total ? 'font-semibold' : 'font-light'
                }`}
              >
                {total ? Utils.convertPrice(total) : '-'}
              </p>
            </div>
            <Button
              variant={'default'}
              size={'customBlank'}
              className="w-[100px] lg:w-[200px] h-full p-2 text-sm sm:text-base lg:text-lg"
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartLayout;
