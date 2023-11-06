import React, { useState } from 'react';
import Image from 'next/image';
import { IProduct } from '@/interface/product';
import { Checkbox } from '../ui/checkbox';
import moneyFornatter from '@/lib/moneyFornatter';
import QuantityController from '../QuantityController/QuantityController';

interface CartCardProductProps {
  product: IProduct;
}

const CartCardProduct = ({ product }: CartCardProductProps) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex items-start gap-2 w-full">
        <Checkbox />
        <div className="relative aspect-square w-44 rounded-md overflow-hidden border-[1px] border-gray-100">
          <Image
            src={product.image}
            alt={`${product.name}'s view`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1024px) 35vw, 20vw"
          />
        </div>
        <div className="flex flex-col items-start gap-0.5">
          <p className="line-clamp-2 text-ellipsis leading-none font-light text-sm">
            {product.name}
          </p>
          {product.discountPercentage !== 0 ? (
            <div className="flex items-center gap-1">
              <p className="font-semibold">
                {moneyFornatter(product.discountedPrice!)}
              </p>
              <p className="text-gray-500 text-xs line-through">
                {moneyFornatter(product.price)}
              </p>
            </div>
          ) : (
            <p className="font-semibold">{moneyFornatter(product.price)}</p>
          )}
          {product.variant && (
            <p className="text-gray-500 leading-none">{product.variant}</p>
          )}
        </div>
      </div>
      <div className="w-full mt-1 flex justify-between">
        <div className="flex items-center gap-2">
          <QuantityController
            inputValue={quantity}
            setInputValue={setQuantity}
            maximum={product.stock}
          />
        </div>
      </div>
    </div>
  );
};

export default CartCardProduct;
