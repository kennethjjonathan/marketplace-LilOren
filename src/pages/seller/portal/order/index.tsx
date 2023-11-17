import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Divider from '@/components/Divider/Divider';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import SellerOrderCard from '@/components/SellerOrderCard/SellerOrderCard';
import Tabs from '@/components/Tabs/Tabs';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import { useSeller } from '@/store/seller/useSeller';
import { ISellerOrdersParams } from '@/service/sellerOrder/SellerOrderService';
import styles from './SellerPortalOrder.module.scss';

const EMPTY_ORDER = 'There are no orders yet, here';
const EMPTY_ORDER_DESC =
  'Keep your enthusiasm, good fortune will not go away as long as you never give up.';
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

const SellerPortalOrder = () => {
  const router = useRouter();
  const { page, status } = router.query;
  const [currentStatus, setCurrentStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const fetchSellerOrders = useSeller.use.fetchSellerOrders();
  const loading_fetch_seller_orders =
    useSeller.use.loading_fetch_seller_orders();

  useEffect(() => {
    const params: ISellerOrdersParams = {
      page: page as unknown as number,
      status: status as string,
    };
    fetchSellerOrders(params);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentStatus, currentPage]);
  return (
    <div className={`${styles.sellerPortalOrder}`}>
      <Tabs
        datas={data}
        // currentTab={currentStatus}
        // setCurrentTab={setCurrentStatus}
      />
      {loading_fetch_seller_orders ? (
        <div className="w-[85vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw]">
          <DotsLoading />
        </div>
      ) : (
        <div className={`${styles.page_order}`}>
          <section className="w-[85vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw]">
            <Divider />
            <SellerOrderCard order_status={status as string} />
          </section>
        </div>
      )}
    </div>
  );
};

SellerPortalOrder.getLayout = function getLayout(page: ReactElement) {
  return (
    <SellerLayout tabData={data!} header="Order List">
      {page}
    </SellerLayout>
  );
};

export default SellerPortalOrder;
