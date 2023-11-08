import SellerLayout from '@/components/SellerLayout/SellerLayout';
import React, { ReactElement } from 'react';
import styles from './SellerPortalProduct.module.scss';
import Table from '@/components/Table/Table';
import { Button } from '@/components/ui/button';

const data = [
  {
    id: 1,
    label: 'All Products',
    href: '/seller/portal/product',
  },
];

const SellerPortalProduct = () => {
  return (
    <div className={`${styles.sellerPortalProduct}`}>
      <div className={`${styles.page_product}`}>
        <section
          className={`flex flex-col w-[80vw] sm:w-[45vw] md:w-[47vw] lg:w-[65vw] px-5 pb-5 bg-white`}
        >
          <div className="w-full right-0 py-3">
            <Button className="w-full md:w-[200px]">{'Add new product'}</Button>
          </div>
          <>
            <Table />
          </>
        </section>
      </div>
    </div>
  );
};

SellerPortalProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <SellerLayout tabData={data} header="Product List">
      {page}
    </SellerLayout>
  );
};

export default SellerPortalProduct;
