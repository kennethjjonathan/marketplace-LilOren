import React, { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/Layout/Layout';
import CheckoutAddressOption from '@/components/CheckoutAddressOption.tsx/CheckoutAddressOption';
import OrderCard from '@/components/OrderCard/OrderCard';
import CheckoutPaymentOption from '@/components/CheckoutPaymentOption/CheckoutPaymentOption';
import {
  IAddress,
  ICheckoutSummary,
  IRequestOrderSummary,
  IRequestSummary,
  IResponseCheckouts,
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
    courier_dropdown: [
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
    courier_dropdown: [
      { label: 'JNE', value: 1 },
      { label: 'JNT', value: 2 },
      { label: 'Ninja', value: 3 },
    ],
  },
];

const CheckoutPage: NextPageWithLayout = () => {
  const [allAddress, setAllAddress] = useState<IAddress[] | undefined>();
  const [chosenAddress, setChosenAddress] = useState<IAddress | undefined>();
  const [checkouts, setCheckouts] = useState<ICheckout[]>();
  const [couriers, setCouriers] = useState<IRequestOrderSummary[]>();
  const [checkoutSummary, setCheckoutSummary] = useState<ICheckoutSummary>({
    orders: [],
    total_shop_price: 0,
    total_product: 0,
    total_delivery_cost: 0,
    service_price: 0,
    summary_price: 0,
  });

  function handleCourierChange(shop_id: number, shop_courier_id: number) {
    if (couriers) {
      for (let i = 0; i < couriers.length; i++) {
        if (couriers[i].shop_id === shop_id) {
          const newCourierArr: IRequestOrderSummary[] = [...couriers];
          const newCourierItem: IRequestOrderSummary = {
            shop_id: shop_id,
            shop_courier_id: shop_courier_id,
          };
          newCourierArr[i] = newCourierItem;
          setCouriers(newCourierArr);
          getSummary(chosenAddress!, newCourierArr);
          return;
        }
      }
    }
  }

  async function getSummary(
    address: IAddress,
    courierArray: IRequestOrderSummary[],
  ) {
    const newRequestSummary: IRequestSummary = {
      order_deliveries: courierArray,
      buyer_address_id: address.id,
    };
    try {
      const response = await axiosInstance.post(
        `${CONSTANTS.BASEURL}/checkouts/summary`,
        newRequestSummary,
      );
      console.log(response.data.data);
      setCheckoutSummary(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getInitialOrderList() {
    try {
      const response = await axiosInstance(`${CONSTANTS.BASEURL}/checkouts`);
      setCheckouts(response.data.data.checkouts);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getInitialAddress() {
    try {
      const response = await axiosInstance(
        `${CONSTANTS.BASEURL}/profile/addresses`,
      );
      setAllAddress(response.data.data);
      setChosenAddress(response.data.data[0]);
      return response.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }

  async function setInitialStates() {
    try {
      const checkoutReponse: IResponseCheckouts = await getInitialOrderList();
      const initialAddress = await getInitialAddress();
      const initialCouriers: IRequestOrderSummary[] = [];
      for (let i = 0; i < checkoutReponse.checkouts.length; i++) {
        const orderReq: IRequestOrderSummary = {
          shop_id: checkoutReponse.checkouts[i].shop_id,
          shop_courier_id: undefined,
        };
        initialCouriers.push(orderReq);
      }
      setCouriers(initialCouriers);
      await getSummary(initialAddress, initialCouriers);
    } catch (error) {
      console.error(error);
    }
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
          {checkouts &&
            checkouts.map((checkout, index) => (
              <OrderCard
                key={index}
                checkout={checkout}
                index={index}
                isMultiple={checkouts.length > 1}
                handleCouriersChange={handleCourierChange}
                checkoutSummary={checkoutSummary}
              />
            ))}
        </div>
        <div className="w-full flex justify-end">
          <CheckoutPaymentOption checkoutSummary={checkoutSummary} />
        </div>
      </div>
    </section>
  );
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const cookieList = cookies()
//   try {
//     const response = await fetchInstance(`${CONSTANTS.BASEURL}/checkouts`, {
//       credentials: 'include',
//     });
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }

//   return {
//     notFound: true,
//   };
// };

export default CheckoutPage;
