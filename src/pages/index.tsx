import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import PromotionCarousel from '@/components/PromotionCarousel/PromotionCarousel';

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <main>
        <PromotionCarousel />
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
