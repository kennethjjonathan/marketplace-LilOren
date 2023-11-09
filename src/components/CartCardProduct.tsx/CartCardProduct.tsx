import React, { useState } from 'react';
import Image from 'next/image';
import { IProduct } from '@/interface/product';
import { Checkbox } from '../ui/checkbox';
import QuantityController from '../QuantityController/QuantityController';
import LikeButton from '../LikeButton/LikeButton';
import TrashButton from '../TrashButton/TrashButton';
import { Utils } from '@/utils';

interface CartCardProductProps {
  product: IProduct;
}

const CartCardProduct = ({ product }: CartCardProductProps) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-col gap-1 border-t-[1px] py-5">
      <div className="flex items-start gap-2 w-full">
        <Checkbox className="w-5 h-5" />
        <div className="relative aspect-square rounded-md overflow-hidden border-[1px] border-gray-100 w-[100px] lg:w-[150px]">
          <Image
            src={product.image}
            alt={`${product.name}'s view`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1024px) 35vw, 20vw"
          />
          {product.discount_price !== 0 && (
            <div className="absolute bottom-0 left-0 bg-destructive text-primary-foreground text-sm font-semibold p-1 rounded-tr-lg">{`%${product.discount}`}</div>
          )}
        </div>
        <div className="flex flex-col items-start gap-0.5 w-full sm:gap-1">
          <p className="line-clamp-2 text-ellipsis leading-none font-light text-xs sm:text-base">
            {product.name}
          </p>
          {product.discount !== 0 ? (
            <div className="flex items-center gap-1">
              <p className="font-semibold sm:text-base md:text-lg lg:text-lg">
                {Utils.convertPrice(product.discount_price)}
              </p>
              <p className="text-gray-500 font-light text-xs line-through sm:text-sm">
                {Utils.convertPrice(product.base_price)}
              </p>
            </div>
          ) : (
            <p className="font-semibold sm:text-base lg:text-lg">
              {Utils.convertPrice(product.base_price)}
            </p>
          )}
          {product.variant && (
            <p className="text-gray-500 leading-none sm:leading-normal sm:text-lg xl:text-xl">
              {product.variant}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-row gap-4 justify-end">
        <div className="flex flex-row gap-2 items-center">
          <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
          <div className="h-[75%] border-r-2"></div>
          <TrashButton product={product} />
        </div>
        <div className="flex items-center gap-5">
          <QuantityController
            inputValue={quantity}
            setInputValue={setQuantity}
            maximum={product.stock!}
          />
        </div>
      </div>
    </div>
  );
};

export default CartCardProduct;
