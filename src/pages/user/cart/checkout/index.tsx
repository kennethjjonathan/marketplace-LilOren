import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/Layout/Layout';
import CheckoutAddressOption from '@/components/CheckoutAddressOption.tsx/CheckoutAddressOption';
import { IProduct } from '@/interface/product';
import OrderCard from '@/components/OrderCard/OrderCard';
import CheckoutPaymentOption from '@/components/CheckoutPaymentOption/CheckoutPaymentOption';
import CheckoutLayout from '@/components/CheckoutLayout/CheckoutLayout';

const CheckoutPage: NextPageWithLayout = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-white roboto-text">
        <div className="w-full md:w-[75vw] px-2 pt-5 pb-20 flex flex-col gap-2">
          <CheckoutAddressOption />
          {/* <OrderCard items={dummyArray} /> */}
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
