import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/Layout/Layout';
import CheckoutAddressOption from '@/components/CheckoutAddressOption.tsx/CheckoutAddressOption';
import { IProduct } from '@/interface/product';
import OrderCard from '@/components/OrderCard/OrderCard';
import CheckoutPaymentOption from '@/components/CheckoutPaymentOption/CheckoutPaymentOption';
import CheckoutLayout from '@/components/CheckoutLayout/CheckoutLayout';

const dummyArray: IProduct[] = [
  {
    image:
      'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/2/24/ed9ad62e-b13a-43ba-a021-ee51be422a3e.jpg',
    name: 'Outerwear Unisex Erigo Coach Jacket Idaina Kaeru Taslan Black',
    price: 150000,
    variant: 'S',
    discountedPrice: 135000,
    discountPercentage: 10,
    quantity: 5,
    stock: 15,
    isLiked: true,
  },
];

const CheckoutPage: NextPageWithLayout = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-white roboto-text">
        <div className="w-full md:w-[75vw] px-2 pt-5 pb-20 flex flex-col gap-2">
          <CheckoutAddressOption />
          <OrderCard items={dummyArray} />
          <CheckoutPaymentOption />
        </div>
      </section>
      <CheckoutLayout amount={150000} />
    </>
  );
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CheckoutPage;
