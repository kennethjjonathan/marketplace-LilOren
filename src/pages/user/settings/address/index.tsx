import React, { ReactElement, useState } from 'react';
import { ArrowLeft, Check, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';
import BackButton from '@/components/BackButton/BackButton';
import styles from './UserSettingsAddress.module.scss';
import { Button } from '@/components/ui/button';
import ButtonWithIcon from '@/components/ButtonWithIcon/ButtonWithIcon';
import Head from 'next/head';

interface IUserAddress {
  id: number;
  addressLabel: string;
  receiverName: string;
  phoneNumber: string;
  fullAddress: string;
}

const userAddresses: IUserAddress[] = [
  {
    id: 1,
    addressLabel: 'Rumah',
    receiverName: 'Endriyani Rahayu',
    phoneNumber: '081291268917 ',
    fullAddress: 'JL Rawamangun Muka II Blok E 51 RT 006/ RW 012',
  },
  {
    id: 2,
    addressLabel: 'Rumah',
    receiverName: 'Endradi Wulandari',
    phoneNumber: '081291268917 ',
    fullAddress: 'JL Rawamangun Muka II Blok E 51 RT 006/ RW 012',
  },
];

const UserSettingsAddress = () => {
  const [currentAddress, setCurrentAddress] = useState<IUserAddress>(
    userAddresses[0],
  );
  const [userSelectedAddress, setUserSelectedAddress] = useState<IUserAddress>(
    userAddresses[0],
  );
  const [loadingChangeMainAddress, setLoadingChangeMainAddress] =
    useState<boolean>(false);

  const handleMainAddress = (address: IUserAddress) => {
    setLoadingChangeMainAddress(true);
    console.log(address);
    setLoadingChangeMainAddress(false);
  };
  return (
    <div className="all-address">
      <div className="pb-[60px] m-[16px] flex flex-col gap-4">
        {userAddresses.map((address: IUserAddress, index) => (
          <div
            key={`key:${String(index)} ${address.addressLabel} ${
              address.receiverName
            }`}
            className="address-card-item flex gap-2 hover:cursor-pointer"
            onClick={() => setCurrentAddress(address)}
            onKeyDown={() => setCurrentAddress(address)}
          >
            <div className="address-card flex-grow">
              <section
                className={`${styles.card} ${
                  currentAddress?.id == address.id && styles.selected
                }`}
              >
                <div className={`info-container flex`}>
                  <div
                    className={`${styles.info_container} ${styles.info} flex-grow`}
                  >
                    <div className={`title ${styles.title}`}>
                      <p
                        className={`${styles.text_title} ${styles.heading} ${styles.text}`}
                      >
                        {address.addressLabel}
                      </p>
                    </div>
                    <p className={`${styles.receiver_name}`}>
                      {address.receiverName}
                    </p>
                    <p className={`${styles.full_address} ${styles.heading}`}>
                      {address.fullAddress}
                    </p>
                  </div>
                  {address.id === currentAddress.id && (
                    <div className={`icons`}>
                      <Check className={`text-primary`} />
                    </div>
                  )}
                </div>
                <div className={`action-button ${styles.action_buttons}`}>
                  <ButtonWithIcon
                    variant={'outline'}
                    className="py-0 px-2 w-full text-muted-foreground flex justify-center items-center"
                    href="/"
                  >
                    {'Edit Address'}
                  </ButtonWithIcon>
                  {address.id === userSelectedAddress.id && (
                    <Button
                      className="py-0 px-2 w-fit text-muted-foreground flex justify-center items-center"
                      variant={'outline'}
                      onClick={() => handleMainAddress(currentAddress)}
                    >
                      <MoreHorizontal />
                    </Button>
                  )}
                </div>
              </section>
            </div>
          </div>
        ))}
      </div>
      {loadingChangeMainAddress ? (
        <>LoadingButton</>
      ) : (
        <div className="h-[60px] bg-white w-full flex justify-center items-center text-ellipsis whitespace-nowrap overflow-hidden px-4 pt-4 pb-4 fixed shadow-[0_-1px_6px_0_rgba(141,150,170,0.4)] bottom-0">
          <Button className="w-full" type="button" variant={'default'}>
            {'Select Address'}
          </Button>
        </div>
      )}
    </div>
  );
};

const PATH_USER = '/user';
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
