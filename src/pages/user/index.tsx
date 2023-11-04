import React, { Fragment, ReactElement, useState } from 'react';
import Image from 'next/image';
import { Pencil, PlusCircle, Store } from 'lucide-react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import AddAddressModal from '../../components/AddAddressModal/AddAddressModal';
import styles from './User.module.scss';

const User: NextPageWithLayout = () => {
  const [showSetAddressModal, setshowSetAddressModal] =
    useState<boolean>(false);
  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <Fragment>
      <div className="bg-accent flex flex-col justify-start h-[100vh]">
        <UserPresentation />
        <div className="lilOren__user__setting pt-[17px] bg-white">
          <span id="account-setting-section" className="font-bold px-4">
            {'Account Settings'}
          </span>
          <ul className="lilOren__user__account__setting__list mt-[5px]">
            <UserSetting setShow={() => setshowSetAddressModal(true)} />
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
        onClose={() => setshowSetAddressModal(false)}
      />
    </Fragment>
  );
};

User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default User;

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
  setShow: () => void;
}

const UserSetting = ({ setShow }: UserSettingProps) => {
  return (
    <li
      className={styles.list__item}
      onClick={() => setShow()}
      onKeyDown={() => setShow()}
    >
      {/* <Link
        href={'/user/settings'}
        className="flex flex-row relative py-[12px] px-[16px] items-center w-full"
      > */}
      <Store />
      <div className={styles.list__item__container}>
        <p className={styles.list__item__title}>My Address</p>
        <p className={styles.list__item__desc}>
          Atur alamat pengiriman belanjaan
        </p>
      </div>
      {/* </Link> */}
    </li>
  );
};
