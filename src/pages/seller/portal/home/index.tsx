import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import SellerLayout from '@/components/SellerLayout/SellerLayout';

const SellerHome: NextPageWithLayout = () => {
  return <div></div>;
};
SellerHome.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout header={'xeana'}>{page}</SellerLayout>;
};

export default SellerHome;
