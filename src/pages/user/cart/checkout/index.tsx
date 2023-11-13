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
import { ICheckout } from '@/interface/checkoutPage';

const dummyData: ICheckout[] = [
  {
    shop_id: 0,
    shop_name: 'Zataru',
    shop_city: 'Kab. Tangerang',
    items: [
      {
        name: 'Fragrance 1',
        image_url:
          'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
        quantity: 1,
        total_weight: 500,
        price: 150000,
      },
    ],
  },
];

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

  async function getOrderList() {
    try {
      const response = await axiosInstance(`${CONSTANTS.BASEURL}/checkouts`, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAddress();
    getOrderList();
  }, []);
  return (
    <section className="flex flex-col justify-center items-center w-full bg-white pb-5">
      <div className="w-full md:w-[75vw] lg:px-2 lg:pt-5 flex flex-col">
        <CheckoutAddressOption
          chosenAddress={chosenAddress}
          setChosenAddress={setChosenAddress}
          allAddress={allAddress}
        />
        <div className="w-full">
          {dummyData.map((checkout, index) => (
            <OrderCard
              key={index}
              checkout={checkout}
              index={index}
              isMultiple={true}
            />
          ))}
        </div>
        <div className="w-full flex justify-end">
          <CheckoutPaymentOption />
        </div>
      </div>
    </section>
  );
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CheckoutPage;
