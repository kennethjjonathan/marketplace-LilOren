import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft, Check } from 'lucide-react';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';
import BackButton from '@/components/BackButton/BackButton';
import { Button } from '@/components/ui/button';
import SkeletonUserAddress from '@/components/SkeletonUserAddress/SkeletonUserAddress';
import { useUser } from '@/store/user/useUser';
import { IUserAddress } from '@/service/userAddress/userAddressService';
import UserAddressCard from '@/components/UserAddressCard/UserAddressCard';

const UserSettingsAddress = () => {
  const loading_fetch_user_addresses =
    useUser.use.loading_ferch_user_addresses();
  const fetchUserAddresses = useUser.use.fetchUserAddresses();
  const userAddresses = useUser.use.user_addresses();
  const user_default_address = useUser.use.user_default_address();
  const editUserDefaultAddress = useUser.use.editUserDefaultAddress();

  useEffect(() => {
    fetchUserAddresses();
  }, []);
  return (
    <>
      {loading_fetch_user_addresses ? (
        <>
          <SkeletonUserAddress />
          <SkeletonUserAddress />
        </>
      ) : (
        <div className="all-address">
          <div className="pb-[60px] m-[16px] flex flex-col gap-4">
            {userAddresses.map((address: IUserAddress, index) => (
              <UserAddressCard
                key={`key:${String(index)} ${address.id.toString()} ${
                  address.receiver_name
                }`}
                address={address}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const MY_ADDRESSES = 'My Addresses';
const ADD_ADDRESS = 'Add Address';
const PATH_USER_ADDRESS_CREATE = '/user/address/create';

const UserSettingsAddressHeading = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Address List | LilOren</title>
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
      <div className="lg:hidden UserSettingsAddress__navbar w-[100%] min-w-auto flex items-center top-0 h-[52px] border-b-[1px] sticky bg-white">
        <BackButton
          id="back-button"
          icon={<ArrowLeft size={24} />}
          onClick={() => router.back()}
        />
        <div>
          <p className="user__address__heading block relative font-medium m-0 text-[16px]">
            {MY_ADDRESSES}
          </p>
        </div>
        <button
          className="px-4 min-w-[fit] ml-auto inline-block text-[16px] text-primary font-medium"
          onClick={() => router.push(PATH_USER_ADDRESS_CREATE)}
        >
          {ADD_ADDRESS}
        </button>
      </div>
    </>
  );
};

UserSettingsAddress.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserSettingsLayout
      currentTab="My Addresses"
      component={<UserSettingsAddressHeading />}
    >
      {page}
    </UserSettingsLayout>
  );
};

export default UserSettingsAddress;
