import DotsLoading from '@/components/DotsLoading/DotsLoading';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { withBasePath } from '@/lib/nextUtils';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from './_app';

const Custom404: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleBack = () => {
    setLoading(true);
    router.push('/');
    setLoading(false);
  };

  return loading ? (
    <DotsLoading />
  ) : (
    <>
      <Head>
        <title>It looks like something is missing | LilOren</title>
        <meta
          data-rh="true"
          name="viewport"
          content="initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=no, width=device-width"
        />
        <meta data-rh="true" property="site_name" content="LilOren" />
        <meta
          data-rh="true"
          property="title"
          content="Jual Beli Online Aman dan Nyaman | LilOren"
        />
        <meta
          data-rh="true"
          name="description"
          content="Mal online terbesar Indonesia, tempat berkumpulnya toko / online shop terpercaya se Indonesia. Jual beli online semakin aman dan nyaman di LilOren."
        ></meta>
      </Head>
      <div className="flex flex-col gap-3 justify-start mt-4 items-center h-[100vh]">
        <Image
          className="w-[150px] pb-3"
          src={withBasePath('empty-wishlist.png')}
          alt="not-found"
        />
        <div className="font-light text-muted-foreground">
          {'It looks like something is missing!'}
        </div>
        <Button onClick={() => handleBack()}>{'Back to Main Page'}</Button>
      </div>
    </>
  );
};

export default Custom404;

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
