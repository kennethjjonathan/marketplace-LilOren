import { NextPageWithLayout } from '@/pages/_app';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import Tabs from '@/components/Tabs/Tabs';
import Divider from '@/components/Divider/Divider';
import axiosInstance from '@/lib/axiosInstance';
import CONSTANTS from '@/constants/constants';
import { IOrderItem } from '@/interface/orderDetailPage';
import BuyerOrderDetailCard from '@/components/BuyerOrderDetailCard/BuyerOrderDetailCard';
import PaginationNav from '@/components/PaginationNav/PaginationNav';
import { useSearchParams } from 'next/navigation';

const dummyData = [
  {
    id: 1,
    label: 'All',
    href: '/user/order-detail?page=1',
  },
  {
    id: 2,
    label: 'Waiting for seller',
    href: '/user/order-detail?status=PROCESS&page=1',
  },
  {
    id: 3,
    label: 'Packaging',
    href: '/user/order-detail?status=PROCESS&page=1',
  },
  {
    id: 4,
    label: 'On Delivery',
    href: '/user/order-detail?status=PROCESS&page=1',
  },
  {
    id: 5,
    label: 'Arrived',
    href: '/user/order-detail?status=PROCESS&page=1',
  },
  {
    id: 6,
    label: 'Completed',
    href: '/user/order-detail?status=PROCESS&page=1',
  },
  {
    id: 7,
    label: 'Cancelled',
    href: '/user/order-detail?status=PROCESS&page=1',
  },
];

const OrderDetailPage: NextPageWithLayout = () => {
  const statusParams = useSearchParams();
  const status = statusParams.get('status');
  const [orderItems, setOrderItems] = useState<IOrderItem[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log(status);

  async function getItems() {
    try {
      const response = await axiosInstance(`/orders`);
      setOrderItems(response.data.data.order);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getItems();
  }, []);
  return (
    <section className="w-full bg-white">
      <div className="w-full md:w-[75vw] lg:px-2 lg:pt-5 pb-5 flex flex-col mx-auto">
        <Tabs datas={dummyData} isBuyerOrder />
        <Divider />
        <div className="w-full pb-2">
          {orderItems &&
            orderItems.map((orderItem, index) => (
              <BuyerOrderDetailCard key={index} orderItem={orderItem} />
            ))}
        </div>
        <div className="w-full flex items-center justify-center mt-3">
          <PaginationNav
            totalPage={20}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
};

OrderDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default OrderDetailPage;
