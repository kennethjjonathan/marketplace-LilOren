import React, { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/Layout/Layout';
import CheckoutAddressOption from '@/components/CheckoutAddressOption.tsx/CheckoutAddressOption';
import OrderCard from '@/components/OrderCard/OrderCard';
import CheckoutPaymentOption from '@/components/CheckoutPaymentOption/CheckoutPaymentOption';
import CheckoutLayout from '@/components/CheckoutLayout/CheckoutLayout';
import { IAddress } from '@/interface/checkoutPage';
import axiosInstance from '@/lib/axiosInstance';
import CONSTANTS from '@/constants/constants';

// const dummyData:

const CheckoutPage: NextPageWithLayout = () => {
  const [allAddress, setAllAddress] = useState<IAddress[] | undefined>();
  const [chosenAddress, setChosenAddress] = useState<IAddress | undefined>();

  async function getAddress() {
    try {
      const response = await axiosInstance(
        `${CONSTANTS.BASEURL}/profile/addresses`,
      );
      console.log(response.data.data);
      setAllAddress(response.data.data);
      setChosenAddress(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(allAddress);

  useEffect(() => {
    getAddress();
  }, []);
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-white pb-8 roboto-text">
        <div className="w-full md:w-[75vw] lg:px-2 lg:pt-5 lg:pb-16 flex flex-col">
          <CheckoutAddressOption
            chosenAddress={chosenAddress}
            setChosenAddress={setChosenAddress}
            allAddress={allAddress}
          />
          <div className="w-full">{}</div>
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
