import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Minus, Plus } from 'lucide-react';
import { IProduct } from '@/interface/product';
import { CartClient } from '@/service/cart/CartClient';
import useDebounce from '@/hook/useDebounce';
interface CartQuantityControllerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  inputValue: number;
  setInputValue: Dispatch<SetStateAction<number>>;
  maximum: number;
  product: IProduct;
}

function CartQuantityController({
  inputValue,
  setInputValue,
  maximum,
  product,
}: CartQuantityControllerProps) {
  const isMounted = useRef(false);
  const [countMounted, setCountMounted] = useState(0);
  const [qty, setQty] = useState(inputValue);
  const handleAPI = useDebounce(putQuantityToDb, 1000);
  const handleUpdateQuantity = async (type: string) => {
    if (type === 'decrement') {
      setInputValue((prev) => prev - 1);
      setQty(inputValue);
    } else {
      setInputValue((prev) => prev + 1);
      setQty(inputValue);
    }
  };

  async function putQuantityToDb() {
    await CartClient.updateQuantityInCart(product.cart_id!, {
      quantity: inputValue,
    });
  }

  useEffect(() => {
    if (isMounted.current) {
      handleAPI();
    } else {
      setCountMounted((prev) => prev + 1);
      if (countMounted >= 1) {
        isMounted.current = true;
      }
    }
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

export default CartQuantityController;
