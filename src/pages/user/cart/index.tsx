import React, { ReactElement, useEffect, useState } from 'react';
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

const CartPage: NextPageWithLayout = () => {
  const [total, setTotal] = useState(0);
  const fetchCart = useCart.use.fetchCart();
  const cartItems = useCart.use.cartItems();
  const setCheckedCart = useCart.use.setCheckedCart();
  const loadingFetchCart = useCart.use.loadingFetchCart();

  const handleSetFirstTotal = (cartItems: ICartItem[]) => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const products_per_seller = cartItems[i].products;
      products_per_seller.forEach((product) => {
        const total_price_per_product =
          product.discount_price !== 0
            ? product.discount_price
            : product.base_price;
        total += total_price_per_product * product.quantity!;
      });
    }
    setTotal(total);
  };

  const handleSetCheckedFirstCart = () => {
    let is_checked_cart: ICheckedCart[] = [];
    cartItems.forEach((cart_per_seller) => {
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

  const handleIncrementTotal = (price: number, quantity: number) => {
    setTotal((prev) => prev + price * quantity);
  };

  const handleDecrementTotal = (price: number, quantity: number) => {
    setTotal((prev) => prev - price * quantity);
  };

  useEffect(() => {
    handleSetFirstTotal(cartItems);
    fetchCart();
    handleSetCheckedFirstCart();
    console.log(cartItems);
  }, []);
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-white pb-8">
        <div className="w-full md:w-[75vw] lg:px-2 lg:pt-5 lg:pb-16 flex flex-col">
          {cartItems.map((item, index) => (
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
