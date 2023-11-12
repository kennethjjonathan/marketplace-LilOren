import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { NextPageWithLayout } from '../../_app';
import Layout from '@/components/Layout/Layout';
import CartLayout from '@/components/CartLayout/CartLayout';
import CartCard from '@/components/CartCard/CartCard';
import { IProduct } from '@/interface/product';
import { ICheckedCart, useCart } from '@/store/cart/useCart';

export interface ICartItem {
  seller_name: string;
  seller_id: number;
  products: IProduct[];
}

export interface ICartPrice {
  total_base_price: number;
  total_discount_price: number;
  total_price: number;
}

export interface ICart {
  items: ICartItem[];
  prices: ICartPrice;
}

const CartPage: NextPageWithLayout = () => {
  const isMounted = useRef(false);
  const [countMounted, setCountMounted] = useState(0);
  const [total, setTotal] = useState(0);
  const fetchCart = useCart.use.fetchCart();
  const cartItems = useCart.use.cartItems();
  const setCheckedCart = useCart.use.setCheckedCart();

  const handleSetCheckedFirstCart = () => {
    let is_checked_cart: ICheckedCart[] = [];
    cartItems.items.forEach((cart_per_seller) => {
      cart_per_seller.products.forEach((cart) => {
        const obj: ICheckedCart = {
          cart_id: cart.cart_id!,
          is_checked: cart.is_checked!,
        };
        is_checked_cart.push(obj);
      });
    });
    setCheckedCart(is_checked_cart);
  };

  useEffect(() => {
    if (isMounted.current) {
      fetchCart();
      handleSetCheckedFirstCart();
      setTotal(cartItems.prices.total_price);
    } else {
      setCountMounted((prev) => prev + 1);
      if (countMounted >= 0) {
        isMounted.current = true;
      }
    }
  }, [cartItems]);
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-white pb-8">
        <div className="w-full md:w-[75vw] lg:px-2 lg:pt-5 lg:pb-16 flex flex-col">
          {cartItems.items.map((item, index) => (
            <CartCard
              key={`key:${item.seller_name}`}
              shop={item.seller_name!}
              shop_items={item.products}
              indexData={index}
            />
          ))}
        </div>
      </section>
      <CartLayout total={total} />
    </>
  );
};

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CartPage;
