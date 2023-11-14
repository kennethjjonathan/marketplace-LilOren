import SellerLayout from '@/components/SellerLayout/SellerLayout';
import React, { ReactElement, useState } from 'react';
import styles from './SellerPortalOrder.module.scss';
import Tabs from '@/components/Tabs/Tabs';
import SellerOrderCard from '@/components/SellerOrderCard/SellerOrderCard';
import Divider from '@/components/Divider/Divider';

const EMPTY_ORDER = 'There are no orders yet, here';
const EMPTY_ORDER_DESC =
  'Keep your enthusiasm, good fortune will not go away as long as you never give up.';
const data = [
  {
    id: 1,
    label: 'All Order',
  },
  {
    id: 2,
    label: 'New Order',
  },
  {
    id: 3,
    label: 'Ready to Ship',
  },
  {
    id: 4,
    label: 'In Delivery',
  },
  {
    id: 5,
    label: 'Arrived',
  },
  {
    id: 6,
    label: 'Completed',
  },
  {
    id: 7,
    label: 'Cancelled',
  },
];

const SellerPortalOrder = () => {
  const [orders, setOrders] = useState([]);
  return (
    <div className={`${styles.sellerPortalOrder}`}>
      <Tabs datas={data} />
      <div className={`${styles.page_order}`}>
        <section className="w-[85vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw]">
          <Divider />
          <SellerOrderCard />
        </section>
      </div>
    </div>
  );
};

SellerPortalOrder.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout header="Order List">{page}</SellerLayout>;
};

export default SellerPortalOrder;
