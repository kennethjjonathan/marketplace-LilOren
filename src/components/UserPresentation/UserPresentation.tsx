import React from 'react';
import styles from './UserPresentation.module.scss';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Pencil, PlusCircle } from 'lucide-react';

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
      <div className="flex ml-auto items-center lg:hidden">
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
      <Button className={`${styles.lilOren__user__edit__button}`}>
        <PlusCircle size={20} />
        <span className="font-bold ml-[10px]">{'Add Phone Number'}</span>
      </Button>
    </div>
  );
};

export default UserPresentation;
