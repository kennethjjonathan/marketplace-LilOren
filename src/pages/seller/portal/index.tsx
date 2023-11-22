import SellerLayout from '@/components/SellerLayout/SellerLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

const SellerHome: NextPageWithLayout = () => {
  return <div></div>;
};
SellerHome.getLayout = function getLayout(page: ReactElement) {
  return <SellerLayout header={'xeana'}>{page}</SellerLayout>;
};

export default SellerHome;
