import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { IProduct } from '@/interface/product';
import { CartClient } from '@/service/cart/CartClient';
import { Utils } from '@/utils';

interface QuantityControllerProps extends React.HTMLAttributes<HTMLDivElement> {
  inputValue: number;
  setInputValue: Dispatch<SetStateAction<number>>;
  maximum: number;
  product: IProduct;
}

function QuantityController({
  inputValue,
  setInputValue,
  maximum,
  product,
}: QuantityControllerProps) {
  const [qty, setQty] = useState(inputValue);
  const handleUpdateQuantity = async (type: string) => {
    if (type === 'decrement') {
      setInputValue((prev) => prev - 1);
    } else {
      setInputValue((prev) => prev + 1);
    }
    setQty(inputValue);
  };

  const putQuantityToDb = async () => {
    await CartClient.updateQuantityInCart(product.cart_id!, {
      quantity: inputValue,
    });
  };

  useEffect(() => {
    const wait = setTimeout(() => {
      putQuantityToDb();
    }, 1000);

    return () => clearTimeout(wait);
  }, [qty]);

  return (
    <div className="p-1 bg-white border-[1px] flex items-center gap-4 w-fit lg:gap-5 rounded-md">
      <button
        onClick={() => handleUpdateQuantity('decrement')}
        disabled={inputValue === 1}
        className="text-primary w-5 aspect-square disabled:text-[#777777] disabled:cursor-not-allowed"
      >
        <Minus className="w-[19px]" />
      </button>
      <p className="text-sm font-semibold lg:text-base">{inputValue}</p>
      <button
        onClick={() => handleUpdateQuantity('increment')}
        disabled={inputValue === maximum}
        className="text-primary w-5 aspect-square disabled:text-[#777777] disabled:cursor-not-allowed"
      >
        <Plus className="w-[19px]" />
      </button>
    </div>
  );
}

export default QuantityController;
