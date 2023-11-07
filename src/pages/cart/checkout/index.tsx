import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/Layout/Layout';
import CheckoutAddressOption from '@/components/CheckoutAddressOption.tsx/CheckoutAddressOption';

const CheckoutPage: NextPageWithLayout = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full bg-white roboto-text">
      <div className="w-full md:w-[75vw] px-2 pt-5 pb-16 flex flex-col gap-2">
        <CheckoutAddressOption />
        
      </div>
    </section>
  );
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CheckoutPage;
