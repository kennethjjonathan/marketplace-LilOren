import React, { useEffect } from 'react';
import Image from 'next/image';
import { Pencil, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import { IUserDetails } from '@/interface/user';
import { useUser } from '@/store/user/useUser';
import styles from './UserPresentation.module.scss';
import { withBasePath } from '@/lib/nextUtils';

const UserPresentation = () => {
  const user_details = useUser.use.user_details();
  const fetchUserDetails = useUser.use.fetchUserDetails();
  const loading_fetch_user_details = useUser.use.loading_fetch_user_details();

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return loading_fetch_user_details ? (
    <DotsLoading />
  ) : (
    <div className={styles.liloren__user__presentation}>
      <Image
        src={`${
          user_details.profile_picture_url
            ? withBasePath(user_details.profile_picture_url)
            : withBasePath('/blank-profile.webp')
        }`}
        alt={'user__profpic'}
        width={500}
        height={500}
        className={'rounded-full h-[64px] w-[64px]'}
      />
      <UserInfo user_details={user_details} />
      <div className="flex ml-auto items-center lg:hidden">
        <Pencil className="text-muted-foreground" />
      </div>
    </div>
  );
};

interface UserInfoProps {
  user_details: IUserDetails;
}

const UserInfo = ({ user_details }: UserInfoProps) => {
  return (
    <div className={styles.lilOren__user__info}>
      <div className={styles.lilOren__user__name__container}>
        <span className={styles.lilOren__user__info__firstname}>
          {user_details.username}
        </span>
      </div>
      <div className="lilOren__user__phone__container"></div>
      <div className={styles.lilOren__user_email__container}>
        {user_details.email}
      </div>
      <Button className={`${styles.lilOren__user__edit__button}`}>
        <PlusCircle size={20} />
        <span className="font-bold ml-[10px]">{'Add Phone Number'}</span>
      </Button>
    </div>
  );
};

export default UserPresentation;
