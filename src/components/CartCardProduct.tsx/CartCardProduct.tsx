import React, { useState } from 'react';
import Image from 'next/image';
import { IProduct } from '@/interface/product';
import { Checkbox } from '../ui/checkbox';
import moneyFornatter from '@/lib/moneyFornatter';
import QuantityController from '../QuantityController/QuantityController';
import LikeButton from '../LikeButton/LikeButton';
import TrashButton from '../TrashButton/TrashButton';

interface CartCardProductProps {
  product: IProduct;
}

const CartCardProduct = ({ product }: CartCardProductProps) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex items-start gap-2 w-full">
        <Checkbox className="sm:w-5 sm:h-5 xl:w-6 xl:h-6" />
        <div className="relative aspect-square w-44 rounded-md overflow-hidden border-[1px] border-gray-100">
          <Image
            src={product.image}
            alt={`${product.name}'s view`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1024px) 35vw, 20vw"
          />
          {product.discountPercentage !== 0 && (
            <div className="absolute p-[2px] bottom-0 left-0 bg-destructive text-primary-foreground text-sm font-semibold sm:text-base xl:text-lg">{`%${product.discountPercentage}`}</div>
          )}
        </div>
        <div className="flex flex-col items-start gap-0.5 w-full sm:gap-1">
          <p className="line-clamp-2 text-ellipsis leading-none font-light text-sm sm:text-lg xl:text-xl">
            {product.name}
          </p>
          {product.discountPercentage !== 0 ? (
            <div className="flex items-center gap-1">
              <p className="font-semibold sm:text-xl xl:text-2xl">
                {moneyFornatter(product.discountedPrice!)}
              </p>
              <p className="text-gray-500 text-xs line-through sm:text-base xl:text-lg">
                {moneyFornatter(product.price)}
              </p>
            </div>
          ) : (
            <p className="font-semibold sm:text-xl xl:text-2xl">
              {moneyFornatter(product.price)}
            </p>
          )}
          {product.variant && (
            <p className="text-gray-500 leading-none sm:leading-normal sm:text-lg xl:text-xl">
              {product.variant}
            </p>
          )}
        </div>
      </div>
      <div className="w-full mt-1 flex justify-between pl-6 sm:pl-7 xl:pl-8">
        <div className="flex items-center gap-5">
          <QuantityController
            inputValue={quantity}
            setInputValue={setQuantity}
            maximum={product.stock}
          />
          <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
        </div>
        <TrashButton product={product} />
      </div>
    </div>
  );
};

export default CartCardProduct;
