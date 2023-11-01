import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <main>Main Page</main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
