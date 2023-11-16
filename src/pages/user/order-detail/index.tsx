import { NextPageWithLayout } from '@/pages/_app';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import Tabs from '@/components/Tabs/Tabs';
import Divider from '@/components/Divider/Divider';
import axiosInstance from '@/lib/axiosInstance';
import { IOrderItem } from '@/interface/orderDetailPage';
import BuyerOrderDetailCard from '@/components/BuyerOrderDetailCard/BuyerOrderDetailCard';
import PaginationNav from '@/components/PaginationNav/PaginationNav';
import { useSearchParams } from 'next/navigation';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
const data = [
  {
    id: 1,
    label: 'All Order',
    status: '',
    href: '/user/order-detail?page=1',
  },
  {
    id: 2,
    label: 'Waiting for Confirmation',
    status: 'NEW',
    href: '/user/order-detail?status=NEW&page=1',
  },
  {
    id: 3,
    label: 'On Process',
    status: 'PROCESS',
    href: '/user/order-detail?status=PROCESS&page=1',
  },
  {
    id: 4,
    label: 'On Delivery',
    status: 'DELIVER',
    href: '/user/order-detail?status=DELIVER&page=1',
  },
  {
    id: 5,
    label: 'Arrived',
    status: 'ARRIVE',
    href: '/user/order-detail?status=ARRIVE&page=1',
  },
  {
    id: 6,
    label: 'Received',
    status: 'RECEIVE',
    href: '/user/order-detail?status=RECEIVE&page=1',
  },
  {
    id: 7,
    label: 'Cancelled',
    status: 'CANCEL',
    href: '/user/order-detail?status=CANCEL&page=1',
  },
];

const OrderDetailPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const [orderItems, setOrderItems] = useState<IOrderItem[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentTab, setCurrentTab] = useState<string>(
    status !== null ? status : '',
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeStatus = useCallback(async () => {
    setIsLoading(true);
    status === null ? setCurrentTab('') : setCurrentTab(status);
    console.log('test');
    try {
      const response = await axiosInstance(
        `/orders?${
          status === '' || status === null
            ? 'page=1'
            : `page=1&status=${status}`
        }`,
      );
      console.log(response.data);
      setOrderItems(response.data.data.order);
      setTotalPage(response.data.data.pagination.total_page);
      setCurrentPage(response.data.data.pagination.current_page);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  const handleChangePage = useCallback(async () => {
    setIsLoading(true);
    console.log('halo');
    try {
      const response = await axiosInstance(
        `/orders?${
          status === '' || status === null
            ? `page=${currentPage}`
            : `page=${currentPage}&status=${status}`
        }`,
      );
      setOrderItems(response.data.data.order);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    handleChangePage();
  }, [handleChangePage]);

  useEffect(() => {
    handleChangeStatus();
  }, [handleChangeStatus]);
  return (
    <section className="w-full bg-white">
      <div
        className={`w-full md:w-[75vw] lg:px-2 lg:pt-5 pb-5 flex flex-col mx-auto`}
      >
        {isLoading ? (
          <>
            <DotsLoading />
          </>
        ) : (
          <>
            <Tabs
              datas={data}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <Divider />
            <div className="w-full pb-2">
              {orderItems &&
                orderItems.map((orderItem, index) => (
                  <BuyerOrderDetailCard key={index} orderItem={orderItem} />
                ))}
            </div>
            <div className="w-full flex items-center justify-center mt-3">
              <PaginationNav
                totalPage={totalPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

OrderDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default OrderDetailPage;
