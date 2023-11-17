import { NextPageWithLayout } from '@/pages/_app';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import axiosInstance from '@/lib/axiosInstance';
import { IOrderItem } from '@/interface/orderDetailPage';
import BuyerOrderDetailCard from '@/components/BuyerOrderDetailCard/BuyerOrderDetailCard';
import PaginationNav from '@/components/PaginationNav/PaginationNav';
import { useSearchParams } from 'next/navigation';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import OrderDetailLayout from '@/components/OrderDetailLayout/OrderDetailLayout';

const OrderDetailPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const [orderItems, setOrderItems] = useState<IOrderItem[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeStatus = useCallback(async () => {
    setIsLoading(true);
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
      <div className={`w-full md:w-[75vw] lg:px-2 pb-5 flex flex-col mx-auto`}>
        {isLoading ? (
          <>
            <DotsLoading />
          </>
        ) : (
          <>
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
  return (
    <Layout>
      <OrderDetailLayout>{page}</OrderDetailLayout>
    </Layout>
  );
};

export default OrderDetailPage;
