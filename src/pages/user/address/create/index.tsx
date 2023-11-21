import React, { ReactElement, useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, ToastContent } from 'react-toastify';
import { Utils } from '@/utils';
import BackButton from '@/components/BackButton/BackButton';
import UserSettingsLayout from '@/components/UserSettingsLayout/UserSettingsLayout';
import DotsLoading from '@/components/DotsLoading/DotsLoading';
import { UserAddressClient } from '@/service/userAddress/userAddressClient';
import { DropdownClient } from '@/service/dropdown/DropdownClient';
import { IDropdownData } from '@/service/dropdown/DropdownService';
import { IAddAddressData } from '@/interface/user';
import AddAddressForm from '@/components/AddAddressForm/AddAddressForm';

const RECEIVER_NAME = 'Receiver Name';
const PHONE_NUMBER = 'Phone Number';
const PROVINCE_NAME = 'Province';
const CITY_NAME = 'City';
const SUB_DISTRICT_NAME = 'Sub District';
const SUB_FROM_SUB_DISTRICT_NAME = 'Sub from Sub District';
const ADDRESS_DETAILS = 'Address Details';
const PATH_USER_SETTINGS_ADDRESS = '/user/settings/address?status=Address';

const UserAddressCreate = () => {
  const [provinces, setProvinces] = useState<IDropdownData[]>([]);
  const [cities, setCities] = useState<IDropdownData[]>([]);
  const [loadingFetchProvince, setLoadingFetchProvince] =
    useState<boolean>(false);
  const [loadingFetchCity, setLoadingFetchCity] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const router = useRouter();

  const [addAddressData, setAddAddressData] = useState<IAddAddressData>({
    receiver_name: '',
    receiver_phone_number: '',
    province_id: 0,
    city_id: 0,
    sub_district: '',
    sub_sub_district: '',
    postal_code: '',
    address: '',
  });

  const [isDataValid, setIsDataValid] = useState({
    receiver_name: true,
    receiver_phone_number: true,
    province_id: true,
    city_id: true,
    sub_district: true,
    sub_sub_district: true,
    postal_code: true,
    address: true,
  });

  const fetchProvince = async () => {
    try {
      const response = await DropdownClient.getProvinces();
      const provinces: IDropdownData[] = response.data;
      setProvinces(provinces);
      setLoadingFetchProvince(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Utils.notify(error.message, 'error', 'light');
        setLoadingFetchProvince(false);
      }
    }
  };

  const handleChangeProvince = async (e: string) => {
    setLoadingFetchCity(true);
    setAddAddressData({ ...addAddressData, ['province_id']: parseInt(e) });
    const response = await DropdownClient.getCityByProvinceId(parseInt(e));
    const cities = response.data;
    setCities(cities);
    setLoadingFetchCity(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
  ) => {
    setAddAddressData({ ...addAddressData, [key]: e.target.value });
  };

  const handleChangeCity = (e: string) => {
    setAddAddressData({ ...addAddressData, ['city_id']: parseInt(e) });
  };

  const handleNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key < '0' || e.key > '9') {
      if (e.key !== 'Backspace') {
        e.preventDefault();
      }
    }
  };

  const validateData = (
    key: keyof typeof addAddressData,
    pattern: RegExp,
  ): boolean => {
    const dataRegex = pattern;
    if (!dataRegex.test(addAddressData[key].toString())) {
      setIsDataValid({ ...isDataValid, [key]: false });
      return false;
    }
    setIsDataValid({ ...isDataValid, [key]: true });
    return true;
  };

  return (
    <div className="h-[90vh]">
      <ToastContainer />
      {loadingFetchProvince ? <DotsLoading /> : <AddAddressForm />}
    </div>
  );
};

const UserAddressCreateHeading = () => {
  const router = useRouter();
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
      <div className="lg:hidden UserSettingsAddressCreate__navbar w-[100%] min-w-auto flex items-center top-0 h-[52px] border-b-[1px] sticky bg-white">
        <BackButton
          icon={<ArrowLeft size={24} />}
          onClick={() => router.push('/user/settings/address')}
        />
        <div>
          <p className="user__address__heading block relative font-medium m-0 text-[16px]">
            {ADDRESS_DETAILS}
          </p>
        </div>
      </div>
    </>
  );
};

UserAddressCreate.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserSettingsLayout
      component={<UserAddressCreateHeading />}
      currentTab={'My Bio'}
    >
      {page}
    </UserSettingsLayout>
  );
};

export default UserAddressCreate;
