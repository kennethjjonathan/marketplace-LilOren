import React, { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout/Layout';
import CartLayout from '@/components/CartLayout/CartLayout';
import CartCard from '@/components/CartCard/CartCard';

const items = [
  {
    seller_name: 'Erigo Store',
    seller_id: 1,

    products: [
      {
        name: 'Jacquelle Magic Wash - Makeup Remover Pembersih Wajah - PINK',
        product_id: 23,
        base_price: 20000,
        discount_price: 10000,
        discount: 40,
        quantity: 2,
        remaining_quantity: 3,
        variant1_name: 'black',
        variant2_name: '16 GB',
        image:
          'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2021/7/27/5b3236fd-45aa-42c0-85d7-477dc0abfa8f.png?ect=4g',
      },
      {
        name: 'Televisi 2',
        product_id: 23,
        base_price: 20000,
        discount_price: 10000,
        discount: 40,
        quantity: 2,
        remaining_quantity: 3,
        variant1_name: 'black',
        variant2_name: '16 GB',
        image:
          'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2021/7/27/5b3236fd-45aa-42c0-85d7-477dc0abfa8f.png?ect=4g',
      },
    ],
  },
  {
    seller_name: 'Jacquelle Store',
    seller_id: 2,

    products: [
      {
        name: 'Jacquelle Magic Wash - Makeup Remover Pembersih Wajah - PINK',
        product_id: 23,
        base_price: 20000,
        discount_price: 10000,
        discount: 40,
        quantity: 2,
        remaining_quantity: 3,
        variant1_name: 'black',
        variant2_name: '16 GB',
        image:
          'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2021/7/27/5b3236fd-45aa-42c0-85d7-477dc0abfa8f.png?ect=4g',
      },
      {
        name: 'Jacquelle Magic Wash - Makeup Remover Pembersih Wajah - PINK',
        product_id: 23,
        base_price: 20000,
        discount_price: 0,
        discount: 0,
        quantity: 2,
        remaining_quantity: 3,
        variant1_name: 'black',
        variant2_name: '16 GB',
        image:
          'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2021/7/27/5b3236fd-45aa-42c0-85d7-477dc0abfa8f.png?ect=4g',
      },
    ],
  },
];

const CartPage: NextPageWithLayout = () => {
  const [cartItems, setCartItems] = useState(items);
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-white pb-8">
        <div className="w-full md:w-[75vw] lg:px-2 lg:pt-5 lg:pb-16 flex flex-col">
          {cartItems.map((item) => (
            <CartCard
              key={`key:${item.seller_name}`}
              shop={item.seller_name}
              shop_items={item.products}
            />
          ))}
        </div>
      </section>
      <CartLayout />
    </>
  );
};

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CartPage;
