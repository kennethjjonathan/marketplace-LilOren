import React, { Fragment, ReactElement, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Pencil, PlusCircle, Store } from 'lucide-react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';
import { Button } from '@/components/ui/button';
import AddAddressModal from '../../components/AddAddressModal/AddAddressModal';
import Navigation from '@/components/Navigation/Navigation';
import BackButton from '@/components/BackButton/BackButton';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';
import styles from './User.module.scss';
import Head from 'next/head';

const User: NextPageWithLayout = () => {
  const router = useRouter();
  const [showSetAddressModal, setShowSetAddressModal] =
    useState<boolean>(false);
  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <>
      <Head>
        <title>Jual Beli Online Aman dan Nyaman | LilOren</title>
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
      <Fragment>
        <div className="bg-accent flex flex-col justify-start h-[100vh]">
          <UserPresentation />
          <div className="lilOren__user__setting pt-[17px] bg-white">
            <span id="account-setting-section" className="font-bold px-4">
              {'Account Settings'}
            </span>
            <ul className="lilOren__user__account__setting__list mt-[5px]">
              <UserSetting
                onClick={() => router.push('/user/settings/address')}
              />
            </ul>
          </div>
          <div className="lilOren__user__logout w-full flex justify-center items-center pt-[17px]">
            <Button variant={'outline'} onClick={() => handleLogout()}>
              {'Logout'}
            </Button>
          </div>
        </div>
        <AddAddressModal
          isVisible={showSetAddressModal}
          onClose={() => setShowSetAddressModal(false)}
        />
      </Fragment>
    </>
  );
};

User.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserSettingsLayout component={<UserHeading />}>{page}</UserSettingsLayout>
  );
};

export default User;

const UserHeading = () => {
  const router = useRouter();

  return (
    <div className="lg:hidden UserSettingsAddress__navbar w-[100%] min-w-auto flex items-center top-0 h-[52px] border-b-[1px] sticky bg-white">
      <BackButton
        icon={<ArrowLeft size={24} />}
        onClick={() => router.push('/')}
      />
      <div>
        <p className="user__address__heading block relative font-medium m-0 text-[16px]">
          {'My Profile'}
        </p>
      </div>
    </div>
  );
};

const UserPresentation = () => {
  return (
    <div className={styles.liloren__user__presentation}>
      <Image
        src={
          'https://images.tokopedia.net/img/cache/300/tPxBYm/2023/1/20/17d1d6b7-50c0-4c06-b16e-3fd60feb70a8.jpg'
        }
        alt={'user__profpic'}
        width={500}
        height={500}
        className={'rounded-full h-[64px] w-[64px]'}
      />
      <UserInfo />
      <div className="flex ml-auto items-center">
        <Pencil className="text-muted-foreground" />
      </div>
    </div>
  );
};

const UserInfo = () => {
  return (
    <div className={styles.lilOren__user__info}>
      <div className={styles.lilOren__user__name__container}>
        <span className={styles.lilOren__user__info__firstname}>
          {'Endriyani'}
        </span>
      </div>
      <div className="lilOren__user__phone__container"></div>
      <div className={styles.lilOren__user_email__container}>
        {'endriyanira@gmail.com'}
      </div>
      <Button className={styles.lilOren__user__edit__button}>
        <PlusCircle size={20} />
        <span className="font-bold ml-[10px]">{'Add Phone Number'}</span>
      </Button>
    </div>
  );
};

interface UserSettingProps {
  onClick: () => void;
}

const UserSetting = ({ onClick }: UserSettingProps) => {
  return (
    <li
      className={styles.list__item}
      onClick={() => onClick()}
      onKeyDown={() => onClick()}
    >
      <Store />
      <div className={styles.list__item__container}>
        <p className={styles.list__item__title}>My Address</p>
        <p className={styles.list__item__desc}>
          Atur alamat pengiriman belanjaan
        </p>
      </div>
    </li>
  );
};
