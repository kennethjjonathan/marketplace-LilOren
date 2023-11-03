import React, { ReactElement } from 'react';
import Image from 'next/image';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout/Layout';
import ButtonWithIcon from '@/components/ButtonWithIcon/ButtonWithIcon';
import { Pencil, PlusCircle, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

const User: NextPageWithLayout = () => {
  return (
    <div className="bg-accent">
      <div className="liloren__user__presentation flex flex-row p-4">
        <Image
          src={
            'https://images.tokopedia.net/img/cache/300/tPxBYm/2023/1/20/17d1d6b7-50c0-4c06-b16e-3fd60feb70a8.jpg'
          }
          alt={'user__profpic'}
          width={500}
          height={500}
          className={'rounded-full h-[64px] w-[64px]'}
        />
        <div className="lilOren__user__info ml-4 flex flex-col justify-center overflow-hidden">
          <div className="lilOren__user__name__container flex items-center">
            <span className="font-bold text-[16px] max-w-[100%] overflow-ellipsis overflow-hidden whitespace-nowrap">
              {'Endriyani'}
            </span>
          </div>
          <div className="lilOren__user__phone__container"></div>
          <div className="lilOren__email__phone__container text-[0.857143rem]text-muted font-light text-[14px]">
            {'endriyanira@gmail.com'}
          </div>
          <Button className="text-[12px] flex px-4 py-0 overflow-ellipsis whitespace-nowrap outline-none items-center justify-center overflow-hidden relative mt-[8px]">
            <PlusCircle size={20} />
            <span className="font-bold ml-[10px]">{'Add Phone Number'}</span>
          </Button>
        </div>
        <div className="flex ml-auto items-center">
          <Pencil className="text-muted-foreground" />
        </div>
      </div>
      <div className="lilOren__user__setting pt-[17px] bg-white">
        <span id="account-setting-section" className="font-bold px-4">
          {'Account Settings'}
        </span>
        <ul className="lilOren__user__account__setting__list mt-[5px]">
          <UserSetting />
        </ul>
      </div>
    </div>
  );
};

User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default User;

const UserSetting = () => {
  return (
    <li className="list__item flex relative py-[12px] px-[16px] items-center w-full">
      <Store />
      <div className="list__item__container flex flex-col flex-shrink flex-grow-1 text-ellipsis overflow-hidden ml-5">
        <p className="list__item__title whitespace-nowrap overflow-hidden text-ellipsis block relative font-bold text-[14px] m-0">
          My Address
        </p>
        <p className="list__item__desc text-[0.857143rem] max-h-[44px] block relative font-normal mt-[2px]">
          Atur alamat pengiriman belanjaan
        </p>
      </div>
    </li>
  );
};
