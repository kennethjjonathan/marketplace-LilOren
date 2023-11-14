import React, { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/Layout/Layout';
import CheckoutAddressOption from '@/components/CheckoutAddressOption.tsx/CheckoutAddressOption';
import OrderCard from '@/components/OrderCard/OrderCard';
import CheckoutPaymentOption from '@/components/CheckoutPaymentOption/CheckoutPaymentOption';
import CheckoutLayout from '@/components/CheckoutLayout/CheckoutLayout';
import {
  IAddress,
  IRequestOrderSummary,
  IRequestSummary,
} from '@/interface/checkoutPage';
import axiosInstance from '@/lib/axiosInstance';
import CONSTANTS from '@/constants/constants';
import { ICheckout } from '@/interface/checkoutPage';

const dummyData: ICheckout[] = [
  {
    shop_id: 1,
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
      {
        name: 'Fragrance 2',
        image_url:
          'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
        quantity: 1,
        total_weight: 1000,
        price: 200000,
      },
    ],
    couriers: [
      { label: 'JNE', value: 1 },
      { label: 'JNT', value: 2 },
      { label: 'Ninja', value: 3 },
    ],
  },
  {
    shop_id: 2,
    shop_name: 'Converse',
    shop_city: 'Tangerang Selatan',
    items: [
      {
        name: 'Shoes 1',
        image_url:
          'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
        quantity: 1,
        total_weight: 1000,
        price: 300000,
      },
      {
        name: 'Shoes 2',
        image_url:
          'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-5070654/dc_dc_trase_tx_m_shoe_adys300126-bgm_black-gum_full02_g0b376j9.jpg',
        quantity: 1,
        total_weight: 1000,
        price: 400000,
      },
    ],
    couriers: [
      { label: 'JNE', value: 1 },
      { label: 'JNT', value: 2 },
      { label: 'Ninja', value: 3 },
    ],
  },
];

const CheckoutPage: NextPageWithLayout = () => {
  const [allAddress, setAllAddress] = useState<IAddress[] | undefined>();
  const [chosenAddress, setChosenAddress] = useState<IAddress | undefined>();
  const [couriers, setCouriers] = useState<IRequestOrderSummary[]>();
  const [checkouts, setCheckouts] = useState<ICheckout[]>(dummyData);

  function handleCourierChange(shop_id: number, shop_courier_id: number) {
    console.log(shop_courier_id);
  }

  async function getAddress() {
    try {
      const response = await axiosInstance(
        `${CONSTANTS.BASEURL}/profile/addresses`,
      );
      console.log(response.data.data);
      setAllAddress(response.data.data);
      setChosenAddress(response.data.data[0]);
      return response.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }

  async function getSummary(address: IAddress) {
    const newRequestSummary: IRequestSummary = {
      order_deliveries: [],
      buyer_address_id: address.id,
    };
    try {
      const response = await axiosInstance.post(
        `${CONSTANTS.BASEURL}/checkouts/summary`,
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function setInitialStates() {
    try {
      const address = await getAddress();
      await getSummary(address);
    } catch (error) {
      console.error(error);
    }
    const initialCouriers: IRequestOrderSummary[] = [];
    for (let i = 0; i < checkouts.length; i++) {
      const orderReq: IRequestOrderSummary = {
        shop_id: checkouts[i].shop_id,
        shop_courier_id: undefined,
      };
      initialCouriers.push(orderReq);
    }
    setCouriers(initialCouriers);
  }

  useEffect(() => {
    setInitialStates();
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
              isMultiple={dummyData.length > 1}
              handleCouriersChange={handleCourierChange}
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
