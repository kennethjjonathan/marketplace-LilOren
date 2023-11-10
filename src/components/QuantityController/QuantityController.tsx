import React, { Dispatch, SetStateAction } from 'react';
import { Minus, Plus } from 'lucide-react';
import { IProduct } from '@/interface/product';
import { CartClient } from '@/service/cart/CartClient';
import useDebounce from '@/hook/useDebounce';
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
  const handleAPI = useDebounce(putQuantityToDb, 1000);
  const handleUpdateQuantity = async (type: string) => {
    if (type === 'decrement') {
      setInputValue((prev) => prev - 1);
    } else {
      setInputValue((prev) => prev + 1);
    }
  };

  async function putQuantityToDb() {
    await CartClient.updateQuantityInCart(product.cart_id!, {
      quantity: inputValue,
    });
  }

  handleAPI();

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
