import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import LikeButton from '@/components/LikeButton/LikeButton';
import TrashButton from '@/components/TrashButton/TrashButton';
import CartQuantityController from '@/components/CartQuantityController/CartQuantityController';
import { IProduct } from '@/interface/product';
import { useCart } from '@/store/cart/useCart';
import { CartClient } from '@/service/cart/CartClient';
import { ICartCheckedRequest } from '@/service/cart/CartService';
import { Utils } from '@/utils';

interface CartCardProductProps {
  product: IProduct;
  index: number;
}

const CartCardProduct = ({ product, index }: CartCardProductProps) => {
  const [quantity, setQuantity] = useState<number>(product.quantity!);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const fetchCart = useCart.use.fetchCart();
  const cartItems = useCart.use.cartItems();
  const setCart = useCart.use.setCartItems();
  const is_checked_carts = useCart.use.is_checked_carts();
  const setIsCheckedCarts = useCart.use.setCheckedCart();

  const handleCheckUncheck = (cart_id: number) => {
    const updatedCartItems = [...cartItems];
    const updatedCartProduct = updatedCartItems[index];
    const idx = updatedCartProduct.products.findIndex(
      (product) => product.cart_id === cart_id,
    );
    updatedCartItems[index].products[idx].is_checked =
      !updatedCartItems[index].products[idx].is_checked;

    const idx_checked_cart = is_checked_carts.findIndex(
      (_cart) => _cart.cart_id === cart_id,
    );
    const updated_is_checked_carts = [...is_checked_carts];
    updated_is_checked_carts[idx_checked_cart].is_checked =
      !updated_is_checked_carts[idx_checked_cart].is_checked;
    setIsCheckedCarts(updated_is_checked_carts);
    setCart(updatedCartItems);
    updateIsCheckedOfItems();
  };

  const updateIsCheckedOfItems = async () => {
    const req: ICartCheckedRequest = {
      is_checked_carts: is_checked_carts,
    };
    await CartClient.updateIsChecked(req);
  };

  useEffect(() => {
    fetchCart();
  }, [is_checked_carts]);
  return (
    <div className="w-full flex flex-col gap-1 border-t-[1px] py-5">
      <div className="flex items-start gap-2 w-full">
        <Checkbox
          checked={product.is_checked}
          onCheckedChange={(checked) => {
            return handleCheckUncheck(product.cart_id!);
          }}
          className="w-5 h-5"
        />
        <div className="relative aspect-square rounded-md overflow-hidden border-[1px] border-gray-100 w-[100px]">
          <Image
            src={product.image_url}
            alt={`${product.product_name}'s view`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1024px) 35vw, 20vw"
          />
          {product.discount_price !== 0 && (
            <div className="absolute bottom-0 left-0 bg-destructive text-primary-foreground text-[10px] md:text-[12px] font-semibold p-1 rounded-tr-lg">{`${product.discount}%`}</div>
          )}
        </div>
        <div className="flex flex-col items-start gap-0.5 w-full sm:gap-1">
          <p className=" text-ellipsis overflow-hidden line-clamp-1 font-light text-xs sm:text-base">
            {product.product_name}
          </p>
          {product.variant1_name && (
            <p className="text-gray-500 leading-none font-light text-xs sm:text-base">
              {`${product.variant1_name} ${
                product.variant2_name && '|' + product.variant2_name
              } `}
            </p>
          )}
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
        </div>
      </div>
      <div className="w-full flex flex-row gap-4 lg:gap-8 justify-end">
        <div className="flex flex-row gap-2 items-center">
          <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
          <div className="h-[75%] border-r-2 mr-1"></div>
          <TrashButton product={product} />
        </div>
        <div className="flex items-center gap-5">
          <CartQuantityController
            inputValue={quantity}
            setInputValue={setQuantity}
            maximum={product.remaining_quantity!}
            product={product}
          />
        </div>
      </div>
    </div>
  );
};

export default CartCardProduct;
