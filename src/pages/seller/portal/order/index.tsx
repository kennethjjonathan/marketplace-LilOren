import SellerLayout from '@/components/SellerLayout/SellerLayout';
import React, { ReactElement, useState } from 'react';
import styles from './SellerPortalOrder.module.scss';
import { Store } from 'lucide-react';
import Tabs from '@/components/Tabs/Tabs';

const EMPTY_ORDER = 'There are no orders yet, here';
const EMPTY_ORDER_DESC =
  'Keep your enthusiasm, good fortune will not go away as long as you never give up.';

const SellerPortalOrder = () => {
  const [orders, setOrders] = useState([]);
  return (
    <div className={`${styles.sellerPortalOrder}`}>
      <Tabs />
      <div className={`${styles.page_order}`}>
        <section></section>
      </div>
    </div>
  );
};

SellerPortalOrder.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout header="Order List">{page}</SellerLayout>;
};

export default SellerPortalOrder;
