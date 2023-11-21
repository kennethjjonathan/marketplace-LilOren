import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { ArrowLeft, KeyRound, Store } from 'lucide-react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextPageWithLayout } from '../_app';
import { Button } from '@/components/ui/button';
import AddAddressModal from '@/components/AddAddressModal/AddAddressModal';
import BackButton from '@/components/BackButton/BackButton';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';
import UserPresentation from '@/components/UserPresentation/UserPresentation';
import { useUser } from '@/store/user/useUser';
import { useSearchParams } from 'next/navigation';
import styles from './User.module.scss';
import AsyncButton from '@/components/AsyncButton/AsyncButton';

const User: NextPageWithLayout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const fetchUserDetails = useUser.use.fetchUserDetails();
  const user_details = useUser.use.user_details();
  const loading_fetch_user_details = useUser.use.loading_fetch_user_details();
  const [showSetAddressModal, setShowSetAddressModal] =
    useState<boolean>(false);
    const [loadingLogout, setLoadingLogout] = useState(false)

  const handleLogout = async () => {
    setLoadingLogout(true)
    await axios({
      method: 'POST',
      url: 'http://localhost/vm1/api/auth/logout',
      withCredentials: true,
    });
    setTimeout(()=>{
        router.push("/");
        setLoadingLogout(true)
    },200)
  };

  useEffect(() => {
    if (status === '' || status === null) {
      fetchUserDetails();
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [status]);

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
        <div className="lg:flex lg:justify-center lg:items-center w-[100vw] bg-white">
          <div className="bg-accent flex flex-col justify-start h-[100vh] lg:w-[75vw] lg:p-4 lg:bg-transparent lg:hidden">
            <UserPresentation />
            <div className="lilOren__user__setting pt-[17px] bg-white lg:bg-transparent lg:w-[350px] lg:hidden">
              <span id="account-setting-section" className="font-bold px-4">
                {'Account Settings'}
              </span>
              <ul className="lilOren__user__account__setting__list mt-[5px]">
                <UserSetting
                  title={'My Address'}
                  icon={<Store />}
                  description={'Atur alamat pengiriman belanjaan'}
                  onClick={() => router.push('/user/settings/address')}
                />
                <UserSetting
                  title={'Change Password'}
                  icon={<KeyRound />}
                  description={'Atur password akun Anda'}
                  onClick={() => router.push('/user/settings/password')}
                />
              </ul>
            </div>
            <div className=""></div>
            <div className="lilOren__user__logout w-full flex justify-center items-center pt-[17px] lg:hidden">
              {loadingLogout?
                <AsyncButton isLoading={true}>
                  {"Logout"}
                </AsyncButton>
              :
                <Button variant={'outline'} onClick={() => handleLogout()}>
                  {'Logout'}
                </Button>
              }
            </div>
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
