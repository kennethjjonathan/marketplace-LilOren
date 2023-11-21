import Layout from '@/components/Layout/Layout';
import SellerPageHeading from '@/components/SellerPageHeading/SellerPageHeading';
import Tabs from '@/components/Tabs/Tabs';
import CONSTANTS from '@/constants/constants';
import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';

interface SellerPageProps {
  sellerPage: {};
}

const SellerPage = ({ sellerPage }: SellerPageProps) => {
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full bg-white p-2">
        <div className="flex flex-col justify-center w-full md:w-[75vw]">
          <SellerPageHeading />
        </div>
      </section>
    </>
  );
};

export default SellerPage;

SellerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let sellerPage = null;

  try {
    const response = await fetch(`${CONSTANTS.BASEURL}/${params!.sellerId}`);
    console.log(response);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    sellerPage = data.data;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      sellerPage: sellerPage,
    },
  };
};
