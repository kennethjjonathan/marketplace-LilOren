import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { Pencil, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import { IUserDetails } from '@/interface/user';
import { useUser } from '@/store/user/useUser';
import styles from './UserPresentation.module.scss';
import imageUploadder from '@/lib/imageUploadder';
import axiosInstance from '@/lib/axiosInstance';
import CONSTANTS from '@/constants/constants';
import { Utils } from '@/utils';
import { ToastContent } from 'react-toastify';

const UserPresentation = () => {
  const user_details = useUser.use.user_details();
  const fetchUserDetails = useUser.use.fetchUserDetails();
  const loading_fetch_user_details = useUser.use.loading_fetch_user_details();

  const [userTempImg, setTempUserImg] = useState<File>();
  const [userImg, setUserImg] = useState<string>('');
  const [loadingUploadImage, setLoadingUploadImage] = useState<boolean>(false);
  const handleAddPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoadingUploadImage(true);
    if (e.target.files !== null) {
      const selectedFiles = e.target.files;
      setTempUserImg(selectedFiles[0]);
      const response = await imageUploadder(selectedFiles[0]);
      try {
        const responseUpload = await axiosInstance({
          method: 'PUT',
          url: `${CONSTANTS.BASEURL}/profile/picture`,
          data: {
            image_url: response,
          },
        });
        if (responseUpload.status === 200) {
          setUserImg(response);
          Utils.notify(
            'success upload picture' as ToastContent,
            'success',
            'light',
          );
        }
      } catch (error) {
        Utils.notify('failed upload picture' as ToastContent, 'error', 'light');
      }
    }
    fetchUserDetails();
    console.log(user_details);

    setLoadingUploadImage(false);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return loading_fetch_user_details ? (
    <DotsLoading />
  ) : (
    <div className={styles.liloren__user__presentation}>
      <img
        src={`${
          user_details.profile_picture_url
            ? user_details.profile_picture_url
            : '/blank-profile.webp'
        }`}
        alt={'user__profpic'}
        className={styles.img}
      />
      <label className={`${styles.label}`} htmlFor={`user-profile`}>
        <p className="w-full text-center text-[14px] text-muted-foreground font-semibold">
          {'Chooose Photo'}
        </p>
      </label>
      <input
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => {
          handleAddPhoto(e);
          e.target.value = '';
        }}
        type="file"
        id={`user-profile`}
        hidden
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
