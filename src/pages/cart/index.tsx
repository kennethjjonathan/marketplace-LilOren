import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout/Layout';
import CartLayout from '@/components/CartLayout/CartLayout';
import CartCard from '@/components/CartCard/CartCard';
import { IProduct } from '@/interface/product';

const dummyArray: IProduct[] = [
  {
    image:
      'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/2/24/ed9ad62e-b13a-43ba-a021-ee51be422a3e.jpg',
    name: 'Outerwear Unisex Erigo Coach Jacket Idaina Kaeru Taslan Black - S',
    price: 150000,
    variant: 'S',
    discountedPrice: 135000,
    discountPercentage: 10,
    quantity: 5,
    maxQuantity: 15,
    isLiked: true,
  },
];

const CartPage: NextPageWithLayout = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-white roboto-text">
        <div className="w-full md:w-[75vw] px-2 pt-5 pb-16 flex flex-col">
          <CartCard shop="Erigo Official" items={dummyArray} />
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
