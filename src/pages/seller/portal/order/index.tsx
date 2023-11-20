import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import Divider from '@/components/Divider/Divider';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import SellerOrderCard from '@/components/SellerOrderCard/SellerOrderCard';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import { useSeller } from '@/store/seller/useSeller';
import styles from './SellerPortalOrder.module.scss';
import { NextPageWithLayout } from '@/pages/_app';
import axiosInstance from '@/lib/axiosInstance';

const data = [
  {
    id: 1,
    label: 'All Order',
    status: '',
    href: '/seller/portal/order?page=1',
  },
  {
    id: 2,
    label: 'New Order',
    status: 'NEW',
    href: '/seller/portal/order?status=NEW&page=1',
  },
  {
    id: 3,
    label: 'Ready to Ship',
    status: 'PROCESS',
    href: '/seller/portal/order?status=PROCESS&page=1',
  },
  {
    id: 4,
    label: 'In Delivery',
    status: 'DELIVER',
    href: '/seller/portal/order?status=DELIVER&page=1',
  },
  {
    id: 5,
    label: 'Arrived',
    status: 'ARRIVE',
    href: '/seller/portal/order?status=ARRIVE&page=1',
  },
  {
    id: 6,
    label: 'Completed',
    status: 'RECEIVE',
    href: '/seller/portal/order?status=RECEIVE&page=1',
  },
  {
    id: 7,
    label: 'Cancelled',
    status: 'CANCEL',
    href: '/seller/portal/order?status=CANCEL&page=1',
  },
];

const SellerPortalOrder: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const [currentPage, setCurrentPage] = useState(1);
  const fetchSellerOrders = useSeller.use.fetchSellerOrders();
  const seller_orders = useSeller.use.seller_orders();
  const loading_fetch_seller_orders =
    useSeller.use.loading_fetch_seller_orders();

  const handleChangeStatus = useCallback(async () => {
    fetchSellerOrders({
      status: status as string,
      page: 1,
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [status]);

  const handleChangePage = useCallback(() => {
    fetchSellerOrders({
      status: status as string,
      page: currentPage,
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  useEffect(() => {
    handleChangeStatus();
  }, [handleChangeStatus]);

  useEffect(() => {
    handleChangePage();
  }, [handleChangePage]);

  return (
    <div className={`${styles.sellerPortalOrder}`}>
      {loading_fetch_seller_orders ? (
        <div className="w-[85vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw]">
          <DotsLoading />
        </div>
      ) : seller_orders.order_data.length === 0 ? (
        <>Empty</>
      ) : (
        <div className={`${styles.page_order}`}>
          <section className="w-[85vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw]">
            <Divider />
            {seller_orders.order_data.map((order_data, index) => (
              <SellerOrderCard
                key={`key:${order_data.id.toString}-${order_data.status}`}
                order_data={order_data}
                total_products={order_data.products.length}
                index={index}
              />
            ))}
          </section>
        </div>
      )}
    </div>
  );
};

SellerPortalOrder.getLayout = function getLayout(page: ReactElement) {
  return (
    <SellerLayout tabData={data} header="Order List">
      {page}
    </SellerLayout>
  );
};

export default SellerPortalOrder;
