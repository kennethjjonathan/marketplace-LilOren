import React, { ReactElement } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { NextPageWithLayout } from '../../_app';
import RegisterSeller from '../../../../public/seller-portal.svg';
import { Button } from '@/components/ui/button';
import styles from './SellerOnboarding.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';

const START_REGISTERED =
  'To get started, register as a seller by providing the necessary information.';

const WELCOME_TO_LILOREN = 'Welcome to LilOren!';

const SellerOnboarding: NextPageWithLayout = () => {
  return (
    <>
      <div>
        <div className={styles.seller_portal_header}>
          <Image
            src={RegisterSeller}
            width={500}
            height={500}
            alt={'start-registered-as-seller'}
          />
          <div className="w-[300px] mt-8">
            <p className="font-ligt text-center">{START_REGISTERED}</p>
          </div>
        </div>
      </div>
      <div className={styles.button_wrapper}>
        <Button className="w-full" type="submit" variant={'default'}>
          {'Start Registration'}
        </Button>
      </div>
    </>
  );
};

const SellerOnboardingHeading = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>LilOren Seller Center</title>
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
      <div className="lg:hidden UserSettingsAddress__navbar w-[100%] min-w-auto flex items-center top-0 h-[52px] border-b-[1px] sticky bg-white">
        <BackButton
          icon={<ArrowLeft size={24} />}
          onClick={() => router.push('/')}
        />
        <div>
          <p className="user__address__heading block relative font-medium m-0 text-[16px]">
            {WELCOME_TO_LILOREN}
          </p>
        </div>
      </div>
    </>
  );
};

SellerOnboarding.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserSettingsLayout component={<SellerOnboardingHeading />}>
      {page}
    </UserSettingsLayout>
  );
};

export default SellerOnboarding;
