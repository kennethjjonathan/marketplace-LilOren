import AsyncButton from '@/components/AsyncButton/AsyncButton';
import BackButton from '@/components/BackButton/BackButton';
import UserPresentation from '@/components/UserPresentation/UserPresentation';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CONSTANTS from '@/constants/constants';
import axiosInstance from '@/lib/axiosInstance';
import imageUploadder from '@/lib/imageUploadder';
import { useUser } from '@/store/user/useUser';
import { Utils } from '@/utils';
import axios from 'axios';
import { ArrowLeft, Heart, KeyRound, Store } from 'lucide-react';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { ToastContent } from 'react-toastify';
import { NextPageWithLayout } from '../_app';
import styles from './User.module.scss';
import { withBasePath } from '@/lib/nextUtils';

const User: NextPageWithLayout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const fetchUserDetails = useUser.use.fetchUserDetails();
  const user_details = useUser.use.user_details();
  const loading_fetch_user_details = useUser.use.loading_fetch_user_details();
  const [showSetAddressModal, setShowSetAddressModal] =
    useState<boolean>(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

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

  const handleLogout = async () => {
    setLoadingLogout(true);
    await axios({
      method: 'POST',
      url: 'http://localhost/vm1/api/auth/logout',
      withCredentials: true,
    });
    setTimeout(() => {
      router.push('/');
      setLoadingLogout(true);
    }, 200);
  };

  useEffect(() => {
    if (status === '' || status === null) {
      fetchUserDetails();
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [fetchUserDetails, status]);

  const [isChangePassOpen, setIsChangePassOpen] = useState<boolean>(false);
  const [isChangeOpenLoading, setIsChangeOpenLoading] =
    useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isChangePassLoading, setIsChangePassLoading] =
    useState<boolean>(false);

  async function handleOpenChangePassword() {
    setIsChangeOpenLoading(true);
    try {
      await axiosInstance.post('/auth/change-password/request');
      setIsChangePassOpen(true);
    } catch (error) {
      Utils.handleGeneralError(error);
    } finally {
      setIsChangeOpenLoading(false);
    }
  }

  async function handleCloseChangePass() {
    setIsChangePassOpen(false);
    setOtp('');
    setNewPassword('');
  }

  async function changePass() {
    if (/^\s+$/.test(otp) || otp === '') {
      Utils.notify('OTP cannot be empty', 'info', 'colored');
      return;
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(newPassword)) {
      Utils.notify(
        'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and with a minimum of 8 characters',
        'info',
        'colored',
      );
      return;
    }
    setIsChangePassLoading(true);
    try {
      const reqBody = { verify_code: otp, password: newPassword };
      await axiosInstance.post('/auth/change-password', reqBody);
      Utils.notify('Succesfully changed password', 'success', 'colored');
      handleCloseChangePass();
    } catch (error) {
      Utils.handleGeneralError(error);
    } finally {
      setIsChangePassLoading(true);
    }
  }

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
      <div className="lg:flex lg:justify-center lg:items-center w-[100vw] bg-white">
        <div className="bg-accent flex flex-col justify-start h-[calc(100vh-52px)] lg:w-[75vw] lg:p-4 lg:bg-transparent lg:hidden">
          <UserPresentation />
          <div className="lilOren__user__setting pt-[17px] bg-white lg:bg-transparent lg:w-[350px] lg:hidden">
            <span id="account-setting-section" className="font-bold px-4">
              {'Account Settings'}
            </span>
            <ul className="lilOren__user__account__setting__list mt-[5px]">
              <UserSetting
                title={'My Address'}
                icon={<Store />}
                description={'Set the grocery delivery address'}
                onClick={() => router.push('/user/address?status=Address')}
              />
              <UserSetting
                title={'My Wishlist'}
                icon={<Heart />}
                description={''}
                onClick={() => router.push('/user/wishlist')}
              />
              <UserSetting
                title={'Reset Password'}
                icon={<KeyRound />}
                description={'Reset your password'}
                onClick={() => router.push('/forgot-password')}
              />
            </ul>
          </div>
          <div className="pt-[17px] flex justify-center items-center w-full">
            <AsyncButton
              onClick={handleOpenChangePassword}
              isLoading={isChangeOpenLoading}
              variant={'outline'}
            >
              Change Password
            </AsyncButton>
          </div>
          <div className="lilOren__user__logout w-full flex justify-center items-center pt-[17px] lg:hidden">
            {loadingLogout ? (
              <AsyncButton isLoading={true}>{'Logout'}</AsyncButton>
            ) : (
              <Button variant={'outline'} onClick={() => handleLogout()}>
                {'Logout'}
              </Button>
            )}
          </div>
        </div>
        {/* <div className>Photo</> */}
      </div>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${
            user_details.profile_picture_url
              ? user_details.profile_picture_url
              : withBasePath('/blank-profile.webp')
          }`}
          alt={'user__profpic'}
          className={'h-[200px] w-[200px]'}
          loading="lazy"
        />
        <label
          className="border-2 flex flex-col justify-center items-center h-[200px] w-[200px] gap-2 duration-500 before:ease-in-out after:ease-in-out hover:text-white s lg:h-[50px] lg:w-[200px] cursor-pointer top-0 mt-2 rounded-lg"
          htmlFor={`user-profile`}
        >
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
      </div>
      <AlertDialog open={isChangePassOpen} onOpenChange={setIsChangePassOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Password</AlertDialogTitle>
            <AlertDialogDescription>
              {
                'An OTP will be sent to your email (OTP is valifd for 5 minutes)'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="w-full space-y-3">
            <div className="w-full space-y-2">
              <Label htmlFor="otp-input">{'OTP'}</Label>
              <Input
                id="otp-input"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="new-password-input">New Password</Label>
              <Input
                id="new-password-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                {
                  'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and with a minimum of 8 characters'
                }
              </p>
            </div>
            <div className="w-full flex justify-end items-center gap-3">
              <Button onClick={handleCloseChangePass} variant={'outline'}>
                Cancel
              </Button>
              <AsyncButton
                onClick={changePass}
                variant={'default'}
                isLoading={isChangePassLoading}
              >
                Change Password
              </AsyncButton>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

User.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserSettingsLayout currentTab="Info" component={<UserHeading />}>
      {page}
    </UserSettingsLayout>
  );
};

export default User;

const UserHeading = () => {
  const router = useRouter();

  return (
    <div className="lg:hidden User__navbar w-[100%] min-w-auto flex items-center top-0 h-[52px] border-b-[1px] sticky bg-white">
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

interface UserSettingProps {
  onClick: () => void;
  title: string;
  description: string;
  icon: ReactNode;
}

const UserSetting = ({
  onClick,
  title,
  description,
  icon,
}: UserSettingProps) => {
  return (
    <li
      className={styles.list__item}
      onClick={() => onClick()}
      onKeyDown={() => onClick()}
    >
      {icon}
      <div className={styles.list__item__container}>
        <p className={styles.list__item__title}>{title}</p>
        <p className={styles.list__item__desc}>{description}</p>
      </div>
    </li>
  );
};
