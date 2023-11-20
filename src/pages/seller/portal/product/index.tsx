import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import SellerLayout from '@/components/SellerLayout/SellerLayout';
import Table from '@/components/Table/Table';
import { Button } from '@/components/ui/button';
import styles from './SellerPortalProduct.module.scss';

const data = [
  {
    id: 1,
    label: 'All Products',
    status: 'All Products',
    href: '/seller/portal/product',
  },
];

const SellerPortalProduct = () => {
  const router = useRouter();
  return (
    <div className={`${styles.sellerPortalProduct}`}>
      <section
        className={`flex flex-col w-[80vw] sm:w-[90vw] md:w-[47vw] lg:w-[65vw] px-5 pb-5 bg-white`}
      >
        <div className="w-full flex">
          <div className="w-full flex right-0 py-3">
            <Button
              onClick={() => router.push('/seller/portal/product/create')}
              className="w-[200px]"
            >
              {'Add new product'}
            </Button>
          </div>
        </div>
        <Table />
      </section>
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
