import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeft } from 'lucide-react';
import { NextPageWithLayout } from '@/pages/_app';
import BackButton from '@/components/BackButton/BackButton';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';

const UserWishlist: NextPageWithLayout = () => {
  return <div>User Wishlist</div>;
};

const UserWishlistHeading = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My Wishlist | LilOren</title>
        <meta
          data-rh="true"
          name="viewport"
          content="initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=no, width=device-width"
        />
        <meta data-rh="true" property="site_name" content="LilOren" />
        <meta
          data-rh="true"
          name="description"
          content="Mal online terbesar Indonesia, tempat berkumpulnya toko / online shop terpercaya se Indonesia. Jual beli online semakin aman dan nyaman di LilOren."
        ></meta>
      </Head>
      <div className="lg:hidden UserWishlist__navbar w-[100%] min-w-auto flex items-center top-0 h-[52px] border-b-[1px] sticky bg-white">
        <BackButton
          id="back-button"
          icon={<ArrowLeft size={24} />}
          onClick={() => router.push('/user/wishlist?status=Wistlist')}
        />
        <div>
          <p className="user__wishlist__heading block relative font-medium m-0 text-[16px]">
            {'My Wishlist'}
          </p>
        </div>
      </div>
    </>
  );
};

UserWishlist.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserSettingsLayout
      currentTab="My Wishlist"
      component={<UserWishlistHeading />}
    >
      {page}
    </UserSettingsLayout>
  );
};

export default UserWishlist;
